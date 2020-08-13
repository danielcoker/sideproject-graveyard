<template>
  <div>
    <Header />

    <Hero />

    <main></main>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Hero from '@/components/Hero.vue';

export default {
  name: 'Home',
  components: {
    Header,
    Hero,
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
