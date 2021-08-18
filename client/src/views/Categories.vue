<template>
  <div class="categoryTop">
    <h4>Категории</h4>
    <router-link :to="{name: 'AddCategory'}" class="waves-effect waves-light btn">Добавить категорию</router-link>
  </div>

  <Preloader v-if="preloader"/>

  <div class="collection" v-if="categories.length">
    <router-link
        v-for="cat in categories"
        :key="cat.id"
        :to="{name: 'Category', params: {id: cat.id}}"
        class="collection-item">
      {{ cat.name }}
    </router-link>
  </div>

  <p v-else>Категорий пока нет</p>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted} from 'vue';
import {useStore} from 'vuex';
import Preloader from '../components/Preloader.vue';

export default defineComponent({
  name: 'Categories',
  components: {Preloader},
  setup() {
    // data
    const store = useStore();
    const categories = ref([]);
    const preloader = ref(true);

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
});
</script>

<style scoped>
.categoryTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
</style>