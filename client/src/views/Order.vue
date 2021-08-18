<template>
  <Breadcrumb
      :breadcrumb-data="breadcrumb"
  />

  <Modal
      :disable-but="!isOrderPosition"
      ref="modal"
      title-but="Завершить"
  >
    <OrderTable
        @addOrder="modal?.close()"
    />
  </Modal>

  <router-view/>
</template>

<script lang="ts">
import {defineComponent, ref, computed} from 'vue';
import {useStore} from 'vuex';
import {useRoute} from 'vue-router';
import Modal from '../components/Modal.vue';
import OrderTable from '../components/Order/OrderTable.vue';
import Breadcrumb from '../components/Breadcrumb.vue';
import {IOrder} from '../types/Order';

export default defineComponent({
  name: 'Order',
  setup() {
    // data
    const route = useRoute();
    const store = useStore();
    const modal = ref(null);

    // computed
    const breadcrumb = computed(() => {
      let bre: IOrder[];

      if (route.params.id) {
        bre = [
          {href: '/order', title: 'Заказ'},
          {href: '', title: 'Добавить заказ'},
        ];
      } else {
        bre = [
          {href: '/order', title: 'Заказ'},
        ];
      }

      return bre;
    });

    const isOrderPosition = computed(() => !!store.getters['order/getList'].length);

    // methods
    // hooks

    // template
    return {
      breadcrumb,
      modal,
      isOrderPosition,
    };
  },
  components: {Breadcrumb, OrderTable, Modal},
});
</script>

<style scoped>

</style>