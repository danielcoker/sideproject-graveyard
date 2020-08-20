<template>
  <div>
    <Header />

    <section class="py-24">
      <div class="w-2/3 m-auto text-center">
        <router-link :to="{ name: 'Home' }" class="hover:underline mx-1">Home</router-link>
        /
        <router-link :to="{ name: 'Dashboard' }" class="hover:underline mx-1">
          Dashboard
        </router-link>
        /
        <h1 class="font-bold mt-1 text-xl lg:text-2xl leading-none">Add Project</h1>
      </div>
    </section>

    <main class="w-11/12 ml-auto mr-auto mb-10">
      <section class="w-full md:w-6/12 m-auto">
        <form action="">
          <div class="mb-4">
            <label class="block text-gray-700 tracking-wide text-sm font-bold mb-2">
              Project Title
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 focus:outline-none"
              id="username"
              type="text"
              placeholder="Project Title"
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 tracking-wide text-sm font-bold mb-2">
              Project Description
            </label>
            <textarea
              class="shadow appearance-none border rounded w-full py-2 px-3 focus:outline-none"
              rows="10"
              placeholder="Project Description"
              v-model="input"
            ></textarea>
          </div>

          <div class="mb-4 compiled-markdown" v-html="compiledMarkdown"></div>

          <div class="mb-4">
            <label class="block text-gray-700 tracking-wide text-sm font-bold mb-2">
              GitHub Repository
            </label>
            <v-select class="vs-select-style" :options="['Nodejs', 'Python']" />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 tracking-wide text-sm font-bold mb-2">
              Tags
            </label>
            <v-select
              class="vs-select-style"
              taggable
              multiple
              push-tags
              :options="['Nodejs', 'Python']"
            />
          </div>

          <button type="submit" class="mt-3 btn">Add Project</button>
        </form>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script>
import firebase from 'firebase';
import marked from 'marked';
import { Octokit } from '@octokit/rest';
import { createAppAuth } from '@octokit/auth-app';
// eslint-disable-next-line import/no-extraneous-dependencies
// import { createTokenAuth } from '@octokit/auth-token';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import 'vue-select/dist/vue-select.css';
import '../assets/css/markdown.css';

const authUser = JSON.parse(localStorage.getItem('user'));

export default {
  name: 'AddProject',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      input: '',
    };
  },
  computed: {
    compiledMarkdown() {
      return marked(this.input, { sanitize: true });
    },
  },

  mounted() {
    firebase.auth().onAuthStateChanged(async () => {
      // if (authUser.uid === user.uid) {
      //   const repos = await octokit.repos.listForAuthenticatedUser();
      //   console.log(repos);
      // }

      // const auth = createTokenAuth(authUser.stsTokenManager.accessToken);
      // const authentication = await auth();

      // const octokit = new Octokit({
      //   type: 'token',
      //   auth: authentication.token,
      //   userAgent: 'Side Project Graveyard',
      // });

      // const { data } = await octokit.request('/user');

      // console.log(data);

      const appOctokit = new Octokit({
        authStrategy: createAppAuth,
        auth: {
          id: '',
          privateKey: authUser.stsTokenManager.apiKey,
        },
      });

      const { appData } = await appOctokit.request('/users');

      console.log(appData);

      // console.log(await octokit.repos.listForAuthenticatedUser());
    });
  },
};
</script>

<style>
.vs-select-style .vs__search::placeholder,
.vs-select-style .vs__dropdown-toggle,
.vs-select-style .vs__dropdown-menu {
  background: #ffffff;
  border: none;
  color: #333333;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.vs-select-style .vs__dropdown-option--highlight {
  background: #333333;
  color: #fafafa;
}
</style>
