<template>
  <tr>
    <td>{{ order.name }}</td>
    <td>{{ order.quantity }}</td>
    <td>{{ order.cost }} ₽</td>
  </tr>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'OrderHistoryItem',
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  setup() {
    // data
    // computed
    // methods
    // hooks
    // watch
    // template
    return {};
  },
});
</script>

<style scoped>

</style>