<template>
  <header :class="{ scrolled: !view.atTopOfPage }" class="fixed w-full z-10 bg-light">
    <nav class="w-11/12 m-auto flex items-center justify-between flex-wrap py-6">
      <div class="flex items-center mr-6">
        <router-link :to="{ name: 'Home' }">
          <img class="h-8 lg:h-10" src="../assets/code.svg" alt="Code SVG Image" />
        </router-link>
      </div>

      <div class="block lg:hidden">
        <button
          id="nav-toggle"
          @click="toggleNavContent"
          class="flex items-center focus:outline-none"
        >
          <img class="h-5 w-5" src="../assets/hamburger.svg" alt="Menu" />
        </button>
      </div>

      <div id="nav-content" class="w-full hidden flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="flex flex-col ml-auto items-center font-semibold lg:mt-0 lg:flex-row">
          <router-link
            :to="{ name: 'Home' }"
            class="my-2 flex lg:my-0 mx-2 pr-2 border-r border-dark"
          >
            Search
          </router-link>

          <router-link :to="{ name: 'Home' }" class="my-2 flex lg:my-0 mx-2 btn">
            Sign up
          </router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      hidden: true,
      view: {
        atTopOfPage: true,
      },
    };
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    toggleNavContent() {
      document.getElementById('nav-content').classList.toggle('hidden');
    },
    handleScroll() {
      if (window.pageYOffset > 50) {
        if (this.view.atTopOfPage) this.view.atTopOfPage = false;
      } else if (!this.view.atTopOfPage) this.view.atTopOfPage = true;
    },
  },
};
</script>
