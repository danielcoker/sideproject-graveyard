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
      <section class="w-full md:w-2/3 m-auto">
        <img src="../assets/no_data.svg" class="w-64 m-auto" alt="No data" />

        <router-link
          :to="{ name: 'AddProject' }"
          class="my-10 flex justify-center w-6/12 m-auto btn py-4"
        >
          <p>Add Project</p>
        </router-link>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Search',
  components: {
    Header,
    Footer,
  },
};
</script>
