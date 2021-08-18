<template>
  <ul id="slide-out" class="sidenav sidenav-fixed">
    <router-link
        v-for="m in menus"
        :key="m.id"
        :to="{name: m.href}"
        v-slot="{href, navigate, isExactActive}"
    >
      <li :class="[isExactActive && 'active']"><a :href="href">{{ m.title }}</a></li>
    </router-link>

    <li><a href="logout" @click.prevent="logout">Выйти</a></li>
  </ul>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

export default defineComponent({
  name: 'Sidebar',
  setup() {
    // data
    const store = useStore();
    const router = useRouter();

    const menus = ref([
      {id: 1, title: 'Обзор', href: 'Overview'},
      {id: 2, title: 'Аналитика', href: 'Analytics'},
      {id: 3, title: 'История', href: 'History'},
      {id: 4, title: 'Добавить заказ', href: 'OrderItems'},
      {id: 5, title: 'Ассортимент', href: 'Categories'},
    ]);

    // computed
    // methods
    const logout = () => {
      store.commit('auth/logout');
      router.push({name: 'Login'});
    };

    // hooks
    // template
    return {
      menus,
      logout,
    };
  },
});
</script>

<style scoped lang="scss">
</style>