<template>
  <div>
    <Header />

    <section class="pt-24 lg:pt-24 pb-24">
      <div class="w-2/3 m-auto text-center">
        <router-link :to="{ name: 'Home' }" class="hover:underline mx-1">Home</router-link> /
        <h1 class="font-bold mt-1 text-xl lg:text-2xl leading-none">Search Results</h1>
        <form action="" class="mt-5 lg:w-2/3 m-auto">
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 focus:outline-none"
            id="username"
            type="text"
            placeholder="Search title, tags, languages"
          />
          <button type="submit" class="mt-3 btn">Search</button>
        </form>
      </div>
    </section>

    <main class="w-11/12 ml-auto mr-auto mb-10">
      <Projects result-count="43" />
    </main>

    <Footer />
  </div>
</template>

<script>
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
};
</script>
