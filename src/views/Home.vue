<template>
  <div>
    <Header />

    <Hero />

    <main class="w-11/12 ml-auto mr-auto mt-10 mb-10">
      <Projects />
    </main>

    <Footer />
  </div>
</template>

<script>
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
      hidden: true,
    };
  },
  methods: {
    toggleNavContent() {
      document.getElementById('nav-content').classList.toggle('hidden');
    },
  },
};
</script>
