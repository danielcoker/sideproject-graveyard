<template>
  <div>
    <Header />

    <section class="py-24">
      <div class="w-2/3 m-auto text-center">
        <router-link :to="{ name: 'Home' }" class="hover:underline mx-1">Home</router-link> /
        <h1 class="font-bold mt-1 text-xl lg:text-2xl leading-none">Dashboard</h1>
      </div>
    </section>

    <main class="w-11/12 ml-auto mr-auto mb-10">
      <Projects :projects="projects" :busy="busy" @loadmore="loadMore" />

      <section v-if="projectEmpty && !busy" class="w-full md:w-2/3 m-auto">
        <div>
          <img src="../assets/no_data.svg" class="w-64 m-auto" alt="No data" />

          <router-link
            :to="{ name: 'AddProject' }"
            class="my-10 flex justify-center w-6/12 m-auto btn py-4"
          >
            <p>Add Project</p>
          </router-link>
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
import Projects from '@/components/Projects.vue';

export default {
  name: 'Search',
  components: {
    Header,
    Footer,
    Projects,
  },
  data() {
    return {
      projects: [],
      lastVisible: null,
      busy: true,
      projectEmpty: false,
    };
  },
  methods: {
    loadMore() {
      const vm = this;

      firebase.auth().onAuthStateChanged((user) => {
        if (vm.lastVisible) {
          vm.busy = true;

          const nextProjects = firebase
            .firestore()
            .collection('projects')
            .orderBy('createdAt', 'desc')
            .where('user', '==', user.uid)
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
      });
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
              id: userDoc.id,
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
  },
  mounted() {
    const vm = this;

    firebase.auth().onAuthStateChanged((user) => {
      const projects = firebase
        .firestore()
        .collection('projects')
        .orderBy('createdAt', 'desc')
        .where('user', '==', user.uid)
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

        if (!vm.projects.length) {
          vm.projectEmpty = true;
        } else {
          vm.projectEmpty = false;
        }

        vm.busy = false;
      });
    });
  },
};
</script>
