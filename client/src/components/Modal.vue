<template>
  <!-- Кнопка вызова модального окна -->
  <button type="button" class="waves-effect waves-light btn" :disabled="disableBut" @click="open" v-if="!butImage">
    {{ titleBut }}
  </button>

  <button class="btn waves-effect waves-light" :disabled="disableBut" @click="open" v-if="butImage">
    <i class="material-icons">{{ butImage }}</i>
  </button>

  <!-- Модальное окно -->
  <Teleport to="body">
    <div class="modal" ref="modal">
      <slot/>
    </div>
  </Teleport>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

let instancesModal: any = null;

export default defineComponent({
  name: 'Modal',
  emits: ['closeModal'],
  props: {
    titleBut: {
      type: String,
      default: 'Кнопка',
    },
    butImage: {
      type: String,
      default: '',
    },
    disableBut: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {emit}) {
    // data
    const modal = ref(null);

    // computed
    // methods
    const open = () => {
      instancesModal = M.Modal.init(modal.value, {
        onCloseEnd() {
          emit('closeModal');
          if (instancesModal && instancesModal.destroy) {
            instancesModal.destroy();
          }
        },
      });

      instancesModal.open();
    };

    const close = () => instancesModal.close();

    // hooks
    // template
    return {
      open,
      close,
      modal,
    };
  },
});
</script>

<style scoped>

</style>