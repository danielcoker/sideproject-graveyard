<template>
  <div>
    <Header />

    <main class="pt-64 pb-48 w-11/12 ml-auto mr-auto mb-10 lg:py-64">
      <section class="w-full md:w-1/3 m-auto">
        <a
          class="my-2 flex justify-center space-x-5 lg:my-0 mx-2 btn py-4"
          href="#"
          v-if="!signInLoading"
          @click.prevent="signInWithGitHub"
        >
          <img src="../assets/github.svg" alt="GitHub" />
          <p>Sign in with GitHub</p>
        </a>

        <div class="flex justify-center">
          <Spinner :loading="signInLoading" />
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script>
import firebase from 'firebase';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Spinner from '@/components/Spinner.vue';

export default {
  name: 'Details',
  components: {
    Header,
    Footer,
    Spinner,
  },
  data() {
    return {
      signInLoading: false,
    };
  },
  methods: {
    signInWithGitHub() {
      const provider = new firebase.auth.GithubAuthProvider();
      provider.addScope('repo');

      firebase.auth().signInWithRedirect(provider);

      window.localStorage.setItem('SignInWithRedirect', true);
    },
  },
  created() {
    const SignInWithRedirect = window.localStorage.getItem('SignInWithRedirect');

    if (SignInWithRedirect) {
      this.signInLoading = true;

      firebase
        .auth()
        .getRedirectResult()
        .then((result) => {
          if (result.credential) {
            const token = result.credential.accessToken;
            const { user } = result;

            firebase
              .firestore()
              .collection('users')
              .doc(user.uid)
              .set({
                displayName: user.displayName,
                photoURL: user.photoURL,
              })
              .then(() => {
                window.localStorage.removeItem('SignInWithRedirect');
                window.localStorage.setItem('token', token);
                window.localStorage.setItem('userId', user.uid);

                this.$router.push({ name: 'Dashboard' });
              });
          }
        })
        .catch(() => {
          window.localStorage.removeItem('SignInWithRedirect');
          this.$router.push({ name: 'SignIn' });
        });
    }
  },
};
</script>
