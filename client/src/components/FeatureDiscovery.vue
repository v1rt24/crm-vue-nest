<template>
  <div class="positionInfo">
    <a id="menu" class="waves-effect waves-light btn btn-floating grey lighten-1">
      <i class="material-icons">info_outline</i>
    </a>
  </div>

  <div class="tap-target" data-target="menu" ref="tapTarget">
    <div class="tap-target-content">
      <h5>Зачем нужна эта страница?</h5>
      <p>
        Страница "Обзор" покажет динамику продаж за предыдущий день.
        Сравнение со средними значениями поможет вам понять, как идут дела у Вашего бизнеса.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, onUnmounted, ref} from 'vue';

let instancesTapTarget: any = null;

export default defineComponent({
  name: 'FeatureDiscovery',
  setup() {
    // data
    const tapTarget = ref(null);

    // computed
    // methods
    const open = () => {
      instancesTapTarget.open();
    };

    // hooks
    onMounted(() => {
      instancesTapTarget = M.TapTarget.init(tapTarget.value);
    });

    onUnmounted(() => {
      if (instancesTapTarget && instancesTapTarget.destroy) {
        instancesTapTarget.destroy();
      }
    });

    // watch
    // template
    return {
      tapTarget,
      open,
    };
  },
});
</script>

<style scoped>
.tap-target {
  background-color: #e3e3e3;
}

.positionInfo {
  position: fixed;
  left: 50px;
  bottom: 50px;
}
</style>