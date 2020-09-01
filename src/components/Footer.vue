<template>
  <footer class="bg-dark text-light py-20">
    <div class="px-5 md:px-0 md:w-2/3 lg:w-1/3 m-auto text-center">
      <h1 class="font-semibold text-2xl">Side Project Graveyard</h1>

      <p class="mt-5">
        A public graveyard for unfinished side projects. People looking to code but don't have ideas
        can pick the unfinished side projects. They can finish the projects and collaborate, or not,
        with the original author. A win-win for everyone.
      </p>

      <p class="mt-5">
        <a href="https://twitter.com/catalinmpit/status/1293192892677271552" class="underline">
          Idea
        </a>
        by <a href="https://twitter.com/catalinmpit" class="underline">Catalin Pit</a>
      </p>

      <p class="mt-10 text-sm">
        Made with &#10084; by Daniel Coker
      </p>

      <div class="flex justify-center space-x-5 mt-5">
        <a href="https://github.com/danielcoker/sideproject-graveyard">
          <img src="../assets/github.svg" alt="GitHub" />
        </a>
        <a href="https://twitter.com/danielcoker_">
          <img src="../assets/twitter.svg" alt="Twitter" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>
