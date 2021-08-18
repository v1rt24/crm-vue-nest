<template>
  <h1 class="center">Вход</h1>

  <div class="row">
    <form class="col s6 offset-s3" @submit.prevent="loginHandler">
      <div class="row">
        <div class="input-field col s12">
          <input
              id="email"
              type="email"
              v-model.trim="email"
              :class="{invalid: v$.email.$error}"
          >
          <label for="email">Почта</label>
          <span
              v-if="v$.email.$dirty && v$.email.required.$invalid"
              class="helper-text"
          >
            Введите почту
          </span>

          <span
              v-if="v$.email.$dirty && v$.email.email.$invalid"
              class="helper-text"
          >
            Некорректная почта
          </span>
        </div>

        <div class="input-field col s12">
          <input
              id="password"
              type="password"
              v-model.trim="password"
              :class="{invalid: v$.password.$error}"
          >
          <label for="password">Пароль</label>
          <span
              v-if="v$.password.$dirty && v$.password.required.$invalid"
              class="helper-text"
          >
            Введите пароль
          </span>
        </div>
      </div>

      <button class="btn waves-effect waves-light" type="submit" :disabled="loading">
        Войти
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, reactive, toRefs, ref} from 'vue';
import {useVuelidate} from '@vuelidate/core';
import {required, email} from '@vuelidate/validators';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

export default defineComponent({
  name: 'Login',
  setup() {
    // data
    const store = useStore();
    const router = useRouter();
    const loading = ref(false);

    // Форма
    const formData = reactive({
      email: 'w@w.ww',
      password: '111111',
    });

    const rules = computed(() => ({
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    }));

    const v$ = useVuelidate(rules, formData);
    // /Форма

    // computed
    // methods
    const loginHandler = async () => {
      v$.value.$touch();
      if (v$.value.$error) return;

      try {
        loading.value = true;
        await store.dispatch('auth/login', {...formData});
        router.push({name: 'Overview'});
      } catch (error) {
      } finally {
        loading.value = false;
      }
    };

    // hooks
    // template
    return {
      ...toRefs(formData),
      v$,
      loginHandler,
      loading,
    };
  },
});
</script>

<style scoped>

</style>