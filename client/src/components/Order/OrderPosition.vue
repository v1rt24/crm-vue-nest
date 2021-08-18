<template>
  <tr>
    <td>{{ position.name }}</td>
    <td>{{ position.cost }} ₽</td>
    <td>
      <div class="row">
        <div class="input-field col s6">
          <input type="number" min="1" v-model.number="quantity">
        </div>
      </div>
    </td>
    <td>
      <button class="btn-small" @click="addToOrder" :disabled="!addBut">
        Добавить
      </button>
    </td>
  </tr>
</template>

<script lang="ts">
import {defineComponent, ref, computed, getCurrentInstance} from 'vue';
import {useStore} from 'vuex';

import {IPosition} from '../../types/Order';

export default defineComponent({
  name: 'OrderPosition',
  props: {
    position: {
      type: Object,
      required: true,
    },
  },
  setup(props, {emit}) {
    // data
    const store = useStore();
    const quantity = ref(1);
    const instanceProperties = getCurrentInstance()!.appContext.config.globalProperties;

    // computed
    const addBut = computed(() => {
      return quantity.value > 0;
    });

    // methods
    const addToOrder = () => {
      if (addBut.value) {
        const position: IPosition = {
          category_id: props.position.category_id,
          cost: props.position.cost,
          name: props.position.name,
          quantity: quantity.value,
          id: props.position.id,
          user_id: props.position.user_id,
        };

        store.commit('order/add', position);
        instanceProperties.$successMessage(`Добавлено x: ${quantity.value}`);
      }
    };

    // hooks
    // template
    return {
      quantity,
      addBut,
      addToOrder,
    };
  },
});
</script>

<style scoped>

</style>