<template>
  <Breadcrumb
      :breadcrumb-data="breadcrumb"
  />

  <Preloader v-if="preloader"/>

  <template v-else>
    <button class="waves-effect waves-light btn" @click="deleteCategory" v-if="category">
      <i class="material-icons">delete</i>
    </button>

    <Form
        :category="category"
    />

    <Position
        v-if="category"
        :category-id="category?.id"
    />
  </template>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted, nextTick} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import Breadcrumb from '../components/Breadcrumb.vue';
import Form from '../components/Categories/Form.vue';
import Position from '../components/Categories/Position.vue';
import Preloader from '../components/Preloader.vue';

export default defineComponent({
  name: 'Category',
  props: {
    id: {
      type: String,
    },
  },
  setup(props) {
    // data
    const store = useStore();
    const router = useRouter();
    const category = ref();
    const preloader = ref(true);

    const breadcrumb = ref([
      {href: '/categories', title: 'Категория'},
      {href: '', title: props.id ? 'Редактировать категорию' : 'Добавить категорию'},
    ]);

    // computed
    // methods
    const deleteCategory = async () => {
      if (confirm(`Удалить категорию ${category.value.name}`)) {
        try {
          await store.dispatch('categories/deleteCat', props.id);
          router.push({name: 'Categories'});
        } catch (error) {
        }
      }
    };

    // hooks
    onMounted(async () => {
      if (props.id) {
        try {
          const cats = await store.dispatch('categories/getById', props.id);
          preloader.value = false;
          await nextTick();
          category.value = cats;
        }
        catch (error) {}
      } else {
        preloader.value = false;
      }
    });

    // template
    return {
      breadcrumb,
      preloader,
      category,
      deleteCategory,
    };
  },
  components: {Preloader, Position, Form, Breadcrumb},
});
</script>

<style scoped>

</style>