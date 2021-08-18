<template>
  <div class="modal-content">
    <h4>Ваш заказ</h4>

    <template v-if="positionsOrder.length">
      <table>
        <thead>
        <tr>
          <th>Название</th>
          <th>Количество</th>
          <th>Цена</th>
          <th></th>
        </tr>
        </thead>

        <tbody>
        <tr
            v-for="pos in positionsOrder"
            :key="pos.id"
        >
          <td>{{ pos.name }}</td>
          <td>{{ pos.quantity }}</td>
          <td>{{ pos.cost }} ₽</td>
          <td>
            <span class="material-icons delete" @click="remove(pos.id)">delete</span>
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>Общая стоимость: <strong>{{ allPrice }} ₽</strong></td>
          <td></td>
        </tr>
        </tbody>
      </table>
      <div class="modal-footer">
        <button class="modal-close waves-effect waves-green btn-flat" :disabled="loading">Отмена</button>
        <button class="waves-effect waves-green btn-flat" :disabled="loading" @click="addOrder">Подтвердить</button>
      </div>
    </template>

    <div v-else>
      <h6>Вы пока ничего не заказали</h6>
      <div class="modal-footer">
        <button class="modal-close waves-effect waves-green btn-flat">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed, ref} from 'vue';
import {useStore} from 'vuex';
import {IPosition} from '../../types/Order';

export default defineComponent({
  name: 'OrderTable',
  emits: ['addOrder'],
  setup(_, {emit}) {
    // data
    const store = useStore();
    const loading = ref(false);

    // computed
    const positionsOrder = computed(() => store.getters['order/getList']);
    const allPrice = computed(() => store.getters['order/allPrise']);

    // methods
    const remove = (id: string) => {
      store.commit('order/remove', id);
    };

    const addOrder = async () => {
      try {
        loading.value = true;
        const orders: IPosition[] = positionsOrder.value;
        await store.dispatch('order/create', orders);
        store.commit('order/clear');

        emit('addOrder');
      } catch (error) {
      } finally {
        loading.value = false;
      }
    };

    // hooks
    // template
    return {
      positionsOrder,
      allPrice,
      remove,
      addOrder,
      loading,
    };
  },
});
</script>

<style scoped>
.material-icons {
  cursor: pointer;
}
</style>