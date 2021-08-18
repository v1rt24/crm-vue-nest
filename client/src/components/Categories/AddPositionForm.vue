<template>
  <div class="modal-content">
    <h4>{{ title }}</h4>

    <div class="row">
      <form class="col s12" @submit.prevent="addPosition">
        <div class="row">
          <div class="input-field col s12">
            <input id="name" type="text" v-model.trim="name" :class="{invalid: v$.name.$error}">
            <label for="name">Название</label>
            <span class="helper-text" v-if="v$.name.required.$invalid && v$.name.$dirty">Заполните поле</span>
          </div>

          <div class="input-field col s12">
            <input id="cost" type="number" v-model="cost" :class="{invalid: v$.cost.$error}">
            <label for="cost">Цена</label>
            <span class="helper-text" v-if="v$.cost.required.$invalid && v$.cost.$dirty">Заполните поле</span>
            <span
                v-if="v$.cost.minValue.$invalid && v$.cost.$dirty"
                class="helper-text"
            >Минимальное значение {{ v$.cost.minValue.$params.min }}</span>
          </div>

          <button class="btn waves-effect waves-light" type="submit" :disabled="loading">
            Сохранить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, toRefs, computed, watch, nextTick} from 'vue';
import {useStore} from 'vuex';
import useVuelidate from '@vuelidate/core';
import {required, minValue} from '@vuelidate/validators';

export default defineComponent({
  name: 'AddPositionForm',
  props: {
    title: {
      type: String,
      default: 'Добавить позицию',
    },
    categoryId: {
      type: Number,
      required: true,
    },
    position: {
      type: Object,
    },
  },
  emits: ['addPosition', 'editPosition'],
  setup(props, {emit}) {
    // data
    const store = useStore();
    const loading = ref(false);

    // Форма
    const formData = reactive({
      name: '',
      cost: '',
    });

    const rules = computed(() => ({
      name: {
        required,
      },
      cost: {
        required,
        minValue: minValue(1),
      },
    }));

    const v$ = useVuelidate(rules, formData);
    // /Форма

    // computed
    // methods
    const addPosition = async () => {
      v$.value.$touch();
      if (v$.value.$error) return;

      try {
        loading.value = true;

        if (props.position) {
          // Редактируем запись
          let res = null;
          const {name, cost} = props.position;

          if (JSON.stringify({name, cost}) !== JSON.stringify({...formData})) {
            res = await store.dispatch('position/update', {...formData, id: props.position.id});
          }

          emit('editPosition', res);
        } else {
          // Создаём запись
          const res = await store.dispatch('position/addPosition', {...formData, category_id: props.categoryId});
          formData.name = formData.cost = '';
          v$.value.$reset();

          emit('addPosition', res);
        }
      } catch (error) {
      } finally {
        loading.value = false;
      }
    };

    // hooks
    // watch
    watch(
        () => props.position,
        value => {
          if (value) {
            formData.name = value.name;
            formData.cost = value.cost;
            nextTick(() => {
              M.updateTextFields();
            });
          } else {
            formData.name = '';
            formData.cost = '';
            v$.value.$reset();
          }
        },
    );

    // template
    return {
      ...toRefs(formData),
      v$,
      loading,
      addPosition,
    };
  },
});
</script>

<style scoped>

</style>