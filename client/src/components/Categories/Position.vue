<template>
  <div class="collection-header collection_flex">
    <h4>Позиции</h4>
    <Modal
        ref="modal"
        title-but="Добавить позицию"
        @closeModal="closeModal"
    >
      <AddPositionForm
          :title="titleModal"
          :category-id="categoryId"
          :position="positionData"
          @addPosition="addPosition"
          @editPosition="editPosition"
      />
    </Modal>
  </div>

  <hr>

  <Preloader v-if="preloader"/>

  <template v-else>
    <ul class="collection with-header" v-if="positions.length">
      <li class="collection-item"
          v-for="position in positions"
          :key="position.id"
          @click="positionEdit(position)"
      >
        <div>
          {{ position.name }} <strong>{{ position.cost }}</strong> руб.
          <button class="secondary-content" @click.stop="deletePositionHandler(position)">
            <i class="material-icons">delete</i>
          </button>
        </div>
      </li>
    </ul>

    <div class="center" v-else>
      <h6>В категории пока позиций нет</h6>
    </div>
  </template>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted} from 'vue';
import {useStore} from 'vuex';
import Modal from '../Modal.vue';
import Preloader from '../Preloader.vue';
import AddPositionForm from './AddPositionForm.vue';

export default defineComponent({
  name: 'Position',
  props: {
    categoryId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    // data
    const preloader = ref(true);
    const modal = ref({close: Function});
    const store = useStore();
    const positions = ref<{}[]>([]);
    const titleModal = ref('Добавить позицию');
    const positionData = ref<object | null>(null);

    // computed
    // methods
    // Добавляем позицию при создании
    const addPosition = (pos: object): void => {
      positions.value.push(pos);
      modal.value.close();
    };

    // Редактирование позиции
    const positionEdit = (position: object): void => {
      titleModal.value = 'Редактирование позиции';
      positionData.value = position;
      modal.value.open();
    };

    const editPosition = (position: object | null): void => {
      if (position) {
        const idx = positions.value.findIndex(el => el.id === position.id);
        positions.value[idx] = position;
      }
      modal.value.close();
    };

    // Удаление позиции
    const deletePositionHandler = async (position: object): void => {
      try {
        if (confirm(`Удалить позицию: ${position.name}?`)) {
          await store.dispatch('position/remove', position.id);

          const idx = positions.value.findIndex(el => el.id === position.id);
          positions.value.splice(idx, 1);
        }
      } catch (error) {
      }
    };

    // Срабатывает после закрытия модального окна
    const closeModal = () => {
      titleModal.value = 'Добавить позицию';
      positionData.value = null;
    };

    // hooks
    onMounted(async () => {
      try {
        const positionData = await store.dispatch('position/getPositions', props.categoryId);
        positions.value = positionData;
      } catch (error) {
      } finally {
        preloader.value = false;
      }
    });

    // template
    return {
      preloader,
      positions,
      modal,
      addPosition,
      titleModal,
      positionData,
      positionEdit,
      editPosition,
      closeModal,
      deletePositionHandler,
    };
  },
  components: {AddPositionForm, Preloader, Modal},
});
</script>

<style scoped lang="scss">
.collection_flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>