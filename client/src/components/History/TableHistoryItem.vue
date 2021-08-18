<template>
  <tr>
    <td>{{ order.id }}</td>
    <td>{{ dateFormat(order.createdAt) }}</td>
    <td>{{ dateFormat(order.createdAt, 'time') }}</td>
    <td>{{ sum }} ₽</td>
    <td>
      <Modal
          but-image="open_in_new"
      >
        <OrderHistory
            :num-order="order.id"
            :orders="order.orderProducts"
            :sum="sum"
        />
      </Modal>
    </td>
  </tr>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue';
import Modal from '../Modal.vue';
import OrderHistory from './OrderHistory.vue';

import dateFormat from '../../filters/date.filter';

export default defineComponent({
  name: 'TableHistoryItem',
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // data
    // computed
    const sum = computed(() => {
      return props.order.orderProducts.reduce((acc, item) => acc += item.cost * item.quantity, 0);
    });

    // methods
    // hooks
    // template
    return {
      dateFormat,
      sum,
    };
  },
  components: {Modal, OrderHistory},
});
</script>

<style scoped>

</style>