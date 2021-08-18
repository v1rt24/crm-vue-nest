<template>
  <component :is="layout"/>
</template>

<script lang="ts">
import {defineComponent, computed, resolveDynamicComponent} from 'vue';
import {useRoute} from 'vue-router';

import Main from './layouts/Main.vue';
import Auth from './layouts/Auth.vue';

export default defineComponent({
  name: 'App',
  setup() {
    // data
    const route = useRoute();

    // computed
    const layout = computed(() => {
      const component = route.meta?.layout;

      if (component) {
        return resolveDynamicComponent(component);
      }
    });

    // methods
    // hooks
    // template
    return {
      layout,
    };
  },
  components: {Main, Auth},
});
</script>

<style scoped>

</style>