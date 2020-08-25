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
              v-model="project.title"
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
              v-model="project.description"
            ></textarea>
          </div>

          <div class="mb-4 compiled-markdown" v-html="compiledMarkdown"></div>

          <div class="mb-4">
            <label class="block text-gray-700 tracking-wide text-sm font-bold mb-2">
              GitHub Repository
            </label>
            <v-select
              class="vs-select-style"
              v-if="repos && repos.length"
              :options="repos"
              @input="updateRepo"
            />
            <p v-else class="text-sm">Fetching repos...</p>
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
              :options="tags"
              @search="fetchTags"
              @input="updateTags"
              @close="updateOptionsList"
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
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import 'vue-select/dist/vue-select.css';
import '../assets/css/markdown.css';

export default {
  name: 'AddProject',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      token: window.localStorage.getItem('token'),
      octokit: undefined,
      repos: [],
      tags: [],
      project: {
        title: null,
        description: '',
        repo: null,
        tags: null,
      },
    };
  },
  computed: {
    compiledMarkdown() {
      return marked(this.project.description, { sanitize: true });
    },
  },
  methods: {
    updateRepo(repo) {
      this.project.repo = repo;
    },
    fetchTags(search) {
      this.octokit.search
        .topics({ q: search })
        .then((topics) => {
          this.tags = topics.data.items.map((topic) => topic.name);
        })
        .catch(() => {});
    },
    updateTags(tags) {
      this.project.tags = tags;
    },
    updateOptionsList() {
      if (this.project.tags !== null) {
        this.tags = this.project.tags;
      }
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged(async () => {
      this.octokit = new Octokit({
        auth: this.token,
      });

      const userRepos = await this.octokit.repos.listForAuthenticatedUser();

      this.repos = userRepos.data.map((userRepo) => userRepo.full_name);
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
