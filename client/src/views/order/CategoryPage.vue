<template>
  <Preloader v-if="preloader"/>

  <table v-else-if="!preloader && catPositions.length">
    <thead>
    <tr>
      <th>Название</th>
      <th>Стоимость</th>
      <th>Количество</th>
      <th>Действия</th>
    </tr>
    </thead>

    <tbody>
    <OrderPosition
        v-for="pos in catPositions"
        :key="pos.id"
        :position="pos"
    />
    </tbody>
  </table>

  <h6 v-else>
    В данной категории пока нет позиций. Добавьте
    <router-link :to="{name: 'Category', params: {id}}">позицию</router-link>
  </h6>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted} from 'vue';
import {useStore} from 'vuex';
import Preloader from '../../components/Preloader.vue';
import OrderPosition from '../../components/Order/OrderPosition.vue';

export default defineComponent({
  name: 'CategoryPage',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    // data
    const store = useStore();
    const preloader = ref(true);
    const catPositions = ref([]);

    // computed
    // methods
    // hooks
    onMounted(async () => {
      try {
        catPositions.value = await store.dispatch('order/positionLists', props.id);
      } catch (error) {
      } finally {
        preloader.value = false;
      }
    });

    // template
    return {
      preloader,
      catPositions,
    };
  },
  components: {OrderPosition, Preloader},
});
</script>

<style scoped>
.delete {
  cursor: pointer;
}
</style>