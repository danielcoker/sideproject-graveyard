<template>
  <div>
    <Header />

    <section class="pt-24 lg:pt-24 pb-24">
      <div class="w-2/3 m-auto text-center">
        <router-link :to="{ name: 'Home' }" class="hover:underline mx-1">Home</router-link> /
        <router-link :to="{ name: 'Home' }" class="hover:underline mx-1">Projects</router-link> /
        <h1 class="font-bold mt-1 text-xl lg:text-2xl leading-none">Project Title</h1>

        <div class="flex mt-5 space-x-2 justify-center items-center">
          <a href="#" class="flex space-x-2">
            <p class="h-6 w-6">
              <img
                src="https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"
                alt="Profile Picture"
                class="h-full w-full mr-2 object-cover rounded-full"
              />
            </p>
            <p>Daniel Coker</p>
          </a>
          <p class="font-mono text-xs mt-1">
            <span class="mr-1 font-bold">&middot;</span> 5 months ago
          </p>
        </div>

        <a href="#" class="inline-block mt-2 hover:underline">
          <p>
            <img src="../assets/branching.svg" class="hidden lg:inline mr-1 h-3" alt="GitHub" />
            https://github.com/danielcoker/sideproject-graveyard
          </p>
        </a>
      </div>
    </section>

    <main class="w-11/12 ml-auto mr-auto mb-10">
      <section class="w-full md:w-2/3 m-auto bg-white rounded shadow py-5 px-5">
        <h3 class="font-semibold text-lg">Description</h3>

        <p class="mt-5">The detailed Description fo the project.</p>

        <ul class="flex flex-row flex-wrap mt-5">
          <li>
            <a href="#" class="bg-light rounded px-3 py-1 mr-2 mt-2 inline-block lowercase"
              >python</a
            >
          </li>
          <li>
            <a href="#" class="bg-light rounded px-3 py-1 mr-2 mt-2 inline-block lowercase"
              >nodejs</a
            >
          </li>
          <li>
            <a href="#" class="bg-light rounded px-3 py-1 mr-2 mt-2 inline-block lowercase">api</a>
          </li>
          <li>
            <a href="#" class="bg-light rounded px-3 py-1 mr-2 mt-2 inline-block lowercase"
              >dynamo</a
            >
          </li>
          <li>
            <a href="#" class="bg-light rounded px-3 py-1 mr-2 mt-2 inline-block lowercase"
              >mapper</a
            >
          </li>
          <li>
            <a href="#" class="bg-light rounded px-3 py-1 mr-2 mt-2 inline-block lowercase"
              >heroku</a
            >
          </li>
        </ul>
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
