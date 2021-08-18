<template>
  <div class="modal-content">
    <h4>Заказ № {{ numOrder }}</h4>

    <table>
      <thead>
      <tr>
        <th>Название</th>
        <th>Количество</th>
        <th>Цена</th>
      </tr>
      </thead>

      <tbody>
      <OrderHistoryItem
          v-for="item in orders"
          :key="item.id"
          :order="item"
      />
      </tbody>
    </table>

    <div class="sum">
      <h5>Общая стоимость: <strong>{{ sum }} ₽</strong></h5>
    </div>
  </div>

  <div class="modal-footer">
    <button class="modal-close waves-effect waves-green btn-flat">Закрыть</button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import OrderHistoryItem from './OrderHistoryItem.vue';

export default defineComponent({
  name: 'OrderHistory',
  props: {
    numOrder: {
      type: Number,
      required: true,
    },
    orders: {
      type: Array,
      required: true,
    },
    sum: {
      type: Number,
      required: true,
    },
  },
  setup() {
    // data
    // computed
    // methods
    // hooks
    // template
    return {};
  },
  components: {OrderHistoryItem},
});
</script>

<style scoped>
.sum {
  text-align: right;
  margin: 20px 0;
}
</style>