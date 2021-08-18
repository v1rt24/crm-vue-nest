<template>
  <nav class="wrapperBreadcrumb">
    <div class="nav-wrapper">
      <div class="col s12">
        <router-link
            v-for="(b, idx) in breadcrumbData"
            :key="idx"
            :to="b.href" class="breadcrumb">
          {{ b.title }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'Breadcrumb',
  emits: ['btnHandler'],
  props: {
    breadcrumbData: {
      type: Array,
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
});
</script>

<style scoped>
.wrapperBreadcrumb {
  padding: 0 30px;
  margin-bottom: 50px;
}

.btn-right {
  float: right;
  transform: translateY(14px);
  margin-left: auto;
}
</style>