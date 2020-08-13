<template>
  <section class="background-pattern pt-40 lg:pt-48 pb-24">
    <div class="w-2/3 m-auto text-center">
      <h1 class="font-bold text-4xl lg:text-6xl leading-none">Side Project Graveyard</h1>
      <p class="inline-block mt-2">A public graveyard of unfinished side projects.</p>
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
</template>

<script>
export default {
  name: 'Hero',
};
</script>
