<template>
  <div>
    <Header />

    <section class="pt-24 pb-10">
      <div class="flex justify-center" :class="{ 'my-20': pageLoading }">
        <Spinner :loading="pageLoading" />
      </div>
      <div v-if="!pageLoading" class="w-2/3 m-auto text-center">
        <router-link :to="{ name: 'Home' }" class="hover:underline mx-1">Home</router-link> /
        <router-link :to="{ name: 'Home' }" class="hover:underline mx-1">Projects</router-link> /
        <h1 class="font-bold mt-1 text-xl lg:text-2xl leading-none">{{ project.title }}</h1>

        <div class="flex mt-5 space-x-2 justify-center items-center">
          <a :href="`https://github.com/${user.username}`" class="flex space-x-2">
            <p class="h-6 w-6">
              <img
                :src="user.photoURL"
                alt="Profile Picture"
                class="h-full w-full mr-2 object-cover rounded-full"
              />
            </p>
            <p>{{ user.displayName }}</p>
          </a>
          <p class="font-mono text-xs mt-1">
            <span class="mr-1 font-bold">&middot;</span>
            <timeago :datetime="project.createdAt.toDate()"></timeago>
          </p>
        </div>

        <a :href="project.repoURL" class="inline-block mt-2 w-10/12 hover:underline">
          <p class="truncate">
            <img src="../assets/branching.svg" class="inline mr-1 h-3" alt="GitHub" />
            {{ project.repoURL }}
          </p>
        </a>
      </div>
    </section>

    <main v-if="!pageLoading" class="w-11/12 ml-auto mr-auto mb-10">
      <section class="w-full md:w-2/3 m-auto bg-white rounded shadow py-5 px-5">
        <div class="ml-0 compiled-markdown" v-html="project.description"></div>

        <ul class="flex flex-row flex-wrap">
          <li v-for="(tag, index) in project.tags" :key="index">
            <a href="#" class="bg-light rounded px-3 py-1 mr-2 mt-2 inline-block lowercase">
              {{ tag }}
            </a>
          </li>
        </ul>

        <div class="mt-8" v-if="userLoggedIn && project.user === loggedInUser">
          <router-link
            :to="{ name: 'EditProject', params: { projectId: project.id } }"
            class="my-2 lg:my-0 btn bg-green-600"
          >
            Edit
          </router-link>

          <button
            class="my-2 lg:my-0 mx-2 btn bg-red-600"
            @click.prevent="deleteProject(project.id)"
            :disabled="isDeletingProject"
          >
            Delete
          </button>
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
import '../assets/css/markdown.css';

export default {
  name: 'ViewProject',
  components: {
    Header,
    Footer,
    Spinner,
  },
  data() {
    return {
      pageLoading: true,
      user: {
        displayName: null,
        photoURL: null,
      },
      project: {
        title: null,
        description: null,
        repo: null,
        tags: null,
        repoURL: null,
      },
      isDeletingProject: false,
      userLoggedIn: false,
      loggedInUser: null,
    };
  },
  methods: {
    deleteProject(projectId) {
      const vm = this;

      vm.isDeletingProject = true;

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase
            .firestore()
            .collection('projects')
            .doc(projectId)
            .delete()
            .then(() => {
              vm.$router.push({ name: 'Home' });
            });
        }
      });
    },
  },
  mounted() {
    const vm = this;

    const user = window.localStorage.getItem('userId');
    const token = window.localStorage.getItem('token');

    if (user && token) {
      vm.userLoggedIn = true;
      vm.loggedInUser = user;
    }

    const projectRef = firebase
      .firestore()
      .collection('projects')
      .doc(vm.$route.params.projectId);

    projectRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          vm.project = { ...doc.data(), id: doc.id };
          vm.project.repoURL = `https://github.com/${vm.project.repo}`;

          const userRef = firebase
            .firestore()
            .collection('users')
            .doc(vm.project.user);

          userRef
            .get()
            .then((userDoc) => {
              if (userDoc.exists) {
                vm.user = {
                  id: userDoc.id,
                  displayName: userDoc.data().displayName,
                  photoURL: userDoc.data().photoURL,
                };

                [vm.user.username] = vm.project.repo.split('/');
              }
            })
            .catch(() => {});
        } else {
          // eslint-disable-next-line no-console
          console.log('No such project.');
        }
      })
      .catch(() => {
        // Error
      })
      .finally(() => {
        vm.pageLoading = false;
      });
  },
};
</script>

<style lang="scss" scoped>
button:disabled,
button[disabled] {
  background-color: #cccccc;
  color: #666666;
}
</style>
