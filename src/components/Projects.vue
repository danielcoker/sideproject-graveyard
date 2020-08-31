<template>
  <section
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="10"
    class="w-full md:w-2/3 m-auto flex flex-col space-y-5"
  >
    <h3 class="font-bold text-xl">{{ resultCount ? `${resultCount} projects found` : '' }}</h3>

    <article
      v-for="(project, index) in projects"
      :key="index"
      class="bg-white rounded shadow py-5 px-5"
    >
      <router-link :to="{ name: 'ViewProject', params: { projectId: project.id } }">
        <h2 class="font-semibold text-xl">{{ project.title }}</h2>
      </router-link>
      <p class="mt-1">
        {{
          stripHTMLTags(project.description).length > 300
            ? `${stripHTMLTags(project.description).substring(0, 300)}...`
            : stripHTMLTags(project.description)
        }}
      </p>
      <ul class="flex flex-row flex-wrap mt-2">
        <li v-for="(tag, index) in project.tags" :key="index">
          <a href="#" class="bg-light rounded px-3 py-1 mr-2 mt-2 inline-block lowercase">
            {{ tag }}
          </a>
        </li>
      </ul>
      <hr class="my-3" />
      <div class="flex space-x-2 items-center">
        <a :href="`https://github.com/${project.user.username}`" class="flex space-x-2">
          <p class="h-6 w-6">
            <img
              :src="project.user.photoURL ? project.user.photoURL : defaultProfileImage"
              :alt="`${project.user.displayName}'s profile picture`"
              class="h-full w-full mr-2 object-cover rounded-full"
            />
          </p>
          <p>{{ project.user.displayName }}</p>
        </a>
        <p class="font-mono text-xs mt-1">
          <span class="mr-1 font-bold">&middot;</span>
          <timeago :datetime="project.createdAt.toDate()"></timeago>
        </p>
      </div>
      <div class="mt-8">
        <router-link
          :to="{ name: 'EditProject', params: { projectId: project.id } }"
          class="my-2 lg:my-0 btn bg-green-600"
        >
          Edit
        </router-link>

        <a
          href="#"
          @click.prevent="deleteProject(project.id)"
          class="my-2 lg:my-0 mx-2 btn bg-red-600"
        >
          Delete
        </a>
      </div>
    </article>

    <div class="flex justify-center">
      <Spinner :loading="busy" />
    </div>
  </section>
</template>

<script>
import { stripTags } from 'underscore.string';
import Spinner from './Spinner.vue';

export default {
  name: 'Projects',
  components: {
    Spinner,
  },
  props: {
    resultCount: {
      type: String,
      required: false,
    },
    projects: {
      type: Array,
      required: true,
    },
    busy: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      defaultProfileImage:
        'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg',
      userLoggedIn: false,
    };
  },
  methods: {
    stripHTMLTags(htmlText) {
      return stripTags(htmlText);
    },
    loadMore() {
      this.$emit('loadmore');
    },
    deleteProject(projectId) {
      console.log(projectId);
    },
  },
  mounted() {
    const user = window.localStorage.getItem('userId');
    const token = window.localStorage.getItem('token');

    if (user && token) {
      this.userLoggedIn = true;
    }
  },
};
</script>
