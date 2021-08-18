<template>
  <form @submit.prevent="filterHandler" class="filterHandler">
    <div class="row">
      <div class="input-field col s2">
        <input id="numOrder" type="number" v-model.number="numOrder">
        <label for="numOrder">Номер заказа</label>
      </div>

      <div class="input-field col s2">
        <input id="start" type="text" ref="datepickerStart">
        <label for="start">Начало</label>
      </div>

      <div class="input-field col s2">
        <input id="end" type="text" ref="datepickerEnd">
        <label for="end">Конец</label>
      </div>
    </div>

    <button class="btn waves-effect waves-light" type="submit" :disabled="!isValid">
      Применить фильтр
    </button>
  </form>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted, onUnmounted} from 'vue';
import {useStore} from 'vuex';
import {useDataFormat} from '../../use/Hisrory/dataFormat';
import {IFilter} from '../../types/Order';

let datepickerInstanceStart: any = null;
let datepickerInstanceEnd: any = null;

export default defineComponent({
  name: 'FilterHistory',
  emits: ['applyFilter'],
  setup(_, {emit}) {
    // data
    const store = useStore();
    const numOrder = ref('');
    const datepickerStart = ref<any>(null);
    const datepickerEnd = ref<any>(null);
    const isValid = ref(true);

    // computed
    // methods
    const filterHandler = () => {
      const filter: Partial<IFilter> = {};

      if (numOrder.value) {
        filter.order = +numOrder.value;
      }

      if (datepickerStart.value.value) {
        filter.start = datepickerStart.value.value;
      }

      if (datepickerEnd.value.value) {
        filter.end = datepickerEnd.value.value;
      }

      emit('applyFilter', filter);
    };

    // Валидация выбранных дат
    const validateDate = () => {
      const start = datepickerStart.value.value;
      const end = datepickerEnd.value.value;

      if (!start || !end) {
        return isValid.value = true;
      }

      // isValid.value = start < end;

      if (start < end) {
        isValid.value = true;
      } else {
        isValid.value = false;
        store.commit('message/setMessage', {type: 'error', message: 'Конечная дата должна быть больше начальной'});
      }
    };

    // watch
    // hooks
    onMounted(() => {
      datepickerInstanceStart = M.Datepicker.init(datepickerStart.value, Object.assign({}, useDataFormat, {
        onClose() {
          validateDate();
        },
      }));
      datepickerInstanceEnd = M.Datepicker.init(datepickerEnd.value, Object.assign({}, useDataFormat, {
        onClose() {
          validateDate();
        },
      }));
    });

    onUnmounted(() => {
      if (datepickerInstanceStart && datepickerInstanceStart.destroy) {
        datepickerInstanceStart.destroy();
      }

      if (datepickerInstanceEnd && datepickerInstanceEnd.destroy) {
        datepickerInstanceEnd.destroy();
      }
    });

    // watch
    // template
    return {
      numOrder,
      datepickerStart,
      datepickerEnd,
      isValid,
      filterHandler,
    };
  },
});
</script>

<style scoped>
.filterHandler {
  margin-bottom: 30px;
}
</style>