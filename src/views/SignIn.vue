<template>
  <div>
    <Header />

    <main class="pt-64 pb-48 w-11/12 ml-auto mr-auto mb-10 lg:py-64">
      <section class="w-full md:w-1/3 m-auto">
        <router-link
          :to="{ name: 'Home' }"
          class="my-2 flex justify-center space-x-5 lg:my-0 mx-2 btn py-4"
        >
          <img src="../assets/github.svg" alt="GitHub" />
          <p>Sign in with GitHub</p>
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
  name: 'Details',
  components: {
    Header,
    Footer,
  },
};
</script>
