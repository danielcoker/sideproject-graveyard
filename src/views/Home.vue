<template>
  <div>
    <Header />

    <Hero />

    <main class="w-11/12 ml-auto mr-auto mt-10 mb-10">
      <Projects :projects="projects" :busy="busy" @loadmore="loadMore" />
    </main>

    <Footer />
  </div>
</template>

<script>
import firebase from 'firebase';
import Header from '@/components/Header.vue';
import Hero from '@/components/Hero.vue';
import Projects from '@/components/Projects.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Home',
  components: {
    Header,
    Hero,
    Projects,
    Footer,
  },
  data() {
    return {
      projects: [],
      lastVisible: null,
      busy: true,
    };
  },
  methods: {
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
    loadMore() {
      const vm = this;

      if (vm.lastVisible) {
        vm.busy = true;

        const nextProjects = firebase
          .firestore()
          .collection('projects')
          .orderBy('createdAt', 'desc')
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
  },
  mounted() {
    const vm = this;

    const projects = firebase
      .firestore()
      .collection('projects')
      .orderBy('createdAt', 'desc')
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
};
</script>
