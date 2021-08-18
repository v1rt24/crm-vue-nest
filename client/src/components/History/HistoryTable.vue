<template>
  <table>
    <thead>
    <tr>
      <th>№</th>
      <th>Дата</th>
      <th>Время</th>
      <th>Сумма</th>
      <th></th>
    </tr>
    </thead>

    <tbody>
    <TableHistoryItem
        v-for="item in orders"
        :key="item"
        :order="item"
    />
    </tbody>
  </table>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import TableHistoryItem from './TableHistoryItem.vue';

export default defineComponent({
  name: 'HistoryTable',
  props: {
    orders: {
      type: Array,
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
  components: {TableHistoryItem},
});
</script>

<style scoped>

</style>