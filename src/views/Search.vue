<template>
  <div>
    <Header />

    <section class="py-24">
      <div class="w-2/3 m-auto text-center">
        <router-link :to="{ name: 'Home' }" class="hover:underline mx-1">Home</router-link> /
        <h1 class="font-bold mt-1 text-xl lg:text-2xl leading-none">Search Results</h1>
        <form @submit.prevent="search" class="mt-5 lg:w-2/3 m-auto">
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 focus:outline-none"
            type="search"
            v-model="query"
            @input="appendToQueryUrl"
            placeholder="Search keywords"
          />
          <button type="submit" class="mt-3 btn">Search</button>
        </form>
      </div>
    </section>

    <main class="w-11/12 ml-auto mr-auto mb-10">
      <Projects :projects="projects" :busy="busy" @loadmore="loadMore" />
    </main>

    <Footer />
  </div>
</template>

<script>
import firebase from 'firebase';
import Header from '@/components/Header.vue';
import Projects from '@/components/Projects.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Search',
  components: {
    Header,
    Projects,
    Footer,
  },
  data() {
    return {
      projects: [],
      lastVisible: null,
      busy: true,
      query: this.$route.query.q,
    };
  },
  methods: {
    appendToQueryUrl() {
      this.$router.push({ query: { q: this.query } });
    },
    search() {
      if (this.query) {
        this.busy = true;
        this.getFirstQueryResults();
      }
    },
    loadMore() {
      const vm = this;

      if (vm.lastVisible) {
        vm.busy = true;

        const nextProjects = firebase
          .firestore()
          .collection('projects')
          .orderBy('createdAt', 'desc')
          .where('tags', 'array-contains', vm.query.toLowerCase())
          .startAfter(vm.lastVisible)
          .limit(10);

        nextProjects.get().then((documentSnapshots) => {
          let currentProjects = documentSnapshots.docs.map((document) => ({
            ...document.data(),
            id: document.id,
          }));

          currentProjects = currentProjects.map((project) => {
            vm.getUser(project);

            return project;
          });

          vm.projects = [...vm.projects, ...currentProjects];
          vm.lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

          vm.busy = false;
        });
      }
    },
    getUser(project) {
      const userRef = firebase
        .firestore()
        .collection('users')
        .doc(project.user);

      userRef
        .get()
        .then((userDoc) => {
          if (userDoc.exists) {
            const user = {
              displayName: userDoc.data().displayName,
              photoURL: userDoc.data().photoURL,
            };

            // eslint-disable-next-line no-param-reassign
            project.user = user;

            // eslint-disable-next-line no-param-reassign
            [project.user.username] = project.repo.split('/');
          }
        })
        .catch(() => {});
    },
    getFirstQueryResults() {
      const vm = this;

      const projects = firebase
        .firestore()
        .collection('projects')
        .orderBy('createdAt', 'desc')
        .where('tags', 'array-contains', vm.query.toLowerCase())
        .limit(10);

      projects.get().then((documentSnapshots) => {
        const currentProjects = documentSnapshots.docs.map((document) => ({
          ...document.data(),
          id: document.id,
        }));

        vm.projects = [...currentProjects];
        vm.lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

        vm.projects = vm.projects.map((project) => {
          vm.getUser(project);

          return project;
        });

        vm.busy = false;
      });
    },
  },
  mounted() {
    if (this.query) {
      this.getFirstQueryResults();
    } else {
      this.busy = false;
    }
  },
};
</script>
