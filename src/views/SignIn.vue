<template>
  <div>
    <Header />

    <main class="pt-64 pb-48 w-11/12 ml-auto mr-auto mb-10 lg:py-64">
      <section class="w-full md:w-1/3 m-auto">
        <a
          class="my-2 flex justify-center space-x-5 lg:my-0 mx-2 btn py-4"
          href="#"
          @click.prevent="signInWithGitHub"
        >
          <img src="../assets/github.svg" alt="GitHub" />
          <p>Sign in with GitHub</p>
        </a>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script>
import firebase from 'firebase';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Details',
  components: {
    Header,
    Footer,
  },
  methods: {
    signInWithGitHub() {
      const provider = new firebase.auth.GithubAuthProvider();
      provider.addScope('repo');

      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          const token = result.credential.accessToken;
          const { user } = result;

          window.localStorage.setItem('token', token);
          window.localStorage.setItem('userId', user.uid);

          this.$router.push({ name: 'Dashboard' });
        })
        .catch(() => {
          // Error
        });
    },
  },
};
</script>
