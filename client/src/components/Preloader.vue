<template>
  <div class="wrapperPreloader">
    <div class="preloader-wrapper big active">
      <div :class="['spinner-layer', colorPreloader]">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue';

export default defineComponent({
  name: 'Preloader',
  setup() {
    // data
    // computed
    const colorPreloader = computed(() => {
      const color = ['spinner-blue-only', 'spinner-red-only', 'spinner-yellow-only', 'spinner-green-only'];
      return color[(Math.random() * (color.length - 1)).toFixed(0)];
    });

    // methods
    // hooks
    // template
    return {
      colorPreloader,
    };
  },
});
</script>

<style scoped>
.wrapperPreloader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>