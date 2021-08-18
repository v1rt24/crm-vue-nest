<template>
  <Preloader v-if="preloader"/>

  <div class="row" v-else-if="!preloader && categories.length">
    <OrderItem
        v-for="cat in categories"
        :key="cat.id"
        :category="cat"
    />
  </div>

  <h6 class="center" v-else>
    Категорий пока нет. Добавить
    <router-link :to="{name: 'AddCategory'}">категорию</router-link>
  </h6>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted} from 'vue';
import {useStore} from 'vuex';
import OrderItem from '../../components/Order/OrderItem.vue';
import Preloader from '../../components/Preloader.vue';

export default defineComponent({
  name: 'OrderCategories',
  setup() {
    // data
    const store = useStore();
    const preloader = ref(true);
    const categories = ref([]);

    // computed
    // methods
    // hooks
    onMounted(async () => {
      try {
        categories.value = await store.dispatch('categories/categoriesAll');
      } catch (error) {
      } finally {
        preloader.value = false;
      }
    });

    // template
    return {
      preloader,
      categories,
    };
  },
  components: {Preloader, OrderItem},
});
</script>

<style scoped>

</style>