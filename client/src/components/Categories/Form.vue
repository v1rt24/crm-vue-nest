<template>
  <div class="row">
    <div class="col s6">
      <form @submit.prevent="categorySubmit">
        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model.trim="name"
              :class="{invalid: v$.name.$error}"
          >
          <label for="name">Название категории</label>
          <span
              v-if="v$.name.$dirty && v$.name.required.$invalid"
              class="helper-text"
          >Введите название</span>

          <span
              v-if="v$.name.$dirty && v$.name.minLength.$invalid"
              class="helper-text"
          >Введите не менее {{ v$.name.minLength.$params.min }} символов. Вы ввели {{ name.length }}</span>
        </div>

        <div class="file-field input-field">
          <div class="btn">
            <span>Загрузить изображение</span>
            <input type="file" accept="image/*" @change="loadImg">
          </div>
          <div class="file-path-wrapper">
            <input class="file-path" type="text" ref="filePath">
          </div>
        </div>

        <button class="btn waves-effect waves-light" type="submit" :disabled="loading">
          Сохранить изменения
        </button>
      </form>
    </div>

    <div class="col s6 center loadImgView" v-if="imageView">
      <img :src="imageView" alt="просмотр загруженного изображения">
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed, ref, reactive, toRefs, watch, nextTick} from 'vue';
import {useStore} from 'vuex';
import {useVuelidate} from '@vuelidate/core';
import {minLength, required} from '@vuelidate/validators';

export default defineComponent({
  name: 'Form',
  props: {
    category: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup(props) {
    // data
    const store = useStore();
    const loading = ref(false);

    const formData = reactive({
      name: '',
      imageSrc: null as any,
    });

    const imageView = ref<string | ArrayBuffer | null>(null);
    const filePath = ref();

    // Форма
    const rules = computed(() => ({
      name: {
        required,
        minLength: minLength(3),
      },
    }));

    const v$ = useVuelidate(rules, formData);
    // /Форма

    // computed
    // methods
    const categorySubmit = async () => {
      v$.value.$touch();
      if (v$.value.$error) return;

      try {
        loading.value = true;

        if (props.category.id) {
          await store.dispatch('categories/update', {...formData, id: props.category.id});
        } else {
          await store.dispatch('categories/create', {...formData});

          // Очистка данных
          formData.name = '';
          formData.imageSrc = null;
          imageView.value = null;
          filePath.value.value = null;
          v$.value.$reset();
        }
      } catch (error) {
      } finally {
        loading.value = false;
      }
    };

    // Формирование изображения
    const loadImg = (fileData: any) => {
      const file: File = fileData.target.files[0];
      formData.imageSrc = file;

      // Вывод на страницу для просмотра загружаемого изображения
      const reader = new FileReader();
      reader.onload = () => {
        imageView.value = reader.result;
      };
      reader.readAsDataURL(file);
    };
    // /Формирование изображения

    // hooks

    // Выводим категорию для редактирования
    watch(
        () => props.category,
        cat => {
          if (cat) {
            formData.name = cat.name;

            if (cat.imageSrc) {
              imageView.value = `${import.meta.env.VITE_URL_SERVER}/${cat.imageSrc}`;
            }
            nextTick(() => {
              M.updateTextFields();
            });
          }
        },
    );

    // template
    return {
      ...toRefs(formData),
      v$,
      loadImg,
      imageView,
      loading,
      filePath,
      categorySubmit,
    };
  },
});
</script>

<style scoped>
.loadImgView img {
  max-width: 300px;
}
</style>