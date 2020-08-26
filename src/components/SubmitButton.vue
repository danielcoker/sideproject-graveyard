<template>
  <button
    class="flex items-center h-auto content-center bg-primary text-center
            justify-center mt-3 btn"
    type="submit"
    :disabled="loading"
  >
    <p v-if="!loading">{{ value }}</p>
    <Spinner :loading="loading" :color="'#FAFAFA'" />
  </button>
</template>

<script>
import Spinner from '@/components/Spinner.vue';

export default {
  name: 'SubmitButton',
  props: ['value', 'loading'],
  components: {
    Spinner,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
button:disabled,
button[disabled] {
  background-color: #cccccc;
  color: #666666;
}
</style>
