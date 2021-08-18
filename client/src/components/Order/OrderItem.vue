<template>
  <div class="col s12 m4">
    <div class="card">
      <router-link :to="{name: 'OrderCategoryPage', params: {id: category.id}}">
        <div class="card-image">
          <img :src="image">
        </div>
        <div class="card-content">
          <span class="card-title">{{category.name}}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue';

export default defineComponent({
  name: 'OrderItem',
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // data
    // computed
    const image = computed(() => {
      return `${import.meta.env.VITE_URL_SERVER}/${props.category.imageSrc}`;
    });

    // methods
    // hooks
    // template
    return {
      image
    };
  },
});
</script>

<style scoped lang="scss">
.card {
  text-align: center;

  & a {
    color: black;
  }
}

.card .card-image img {
  width: auto;
  height: 100px;
  margin: 0 auto;
}
</style>