<template>
  <h4>Аналитика</h4>

  <div>
    <p>Средний чек <strong>{{ analytics.average }} ₽</strong></p>
  </div>

  <div>
    <h5>Выручка</h5>
    <canvas></canvas>
  </div>

  <div>
    <h5>Заказы</h5>
    <canvas></canvas>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted} from 'vue';
import {useStore} from 'vuex';

export default defineComponent({
  name: 'Analytics',
  setup() {
    // data
    const store = useStore();
    const analytics = ref([]);

    // computed
    // methods
    // hooks
    onMounted(async () => {
      analytics.value = await store.dispatch('analytics/getAnalytics');
    });

    // watch
    // template
    return {
      analytics
    };
  },
});
</script>

<style scoped>

</style>