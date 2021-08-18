<template>
  <nav>
    <div class="nav-wrapper">
<!--      <a href="#" class="brand-logo">Logo</a>-->
      <router-link to="/" class="brand-logo">Логотип</router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <router-link :to="{name: 'Register'}" custom v-slot="{ navigate, href, isExactActive }">
          <li :class="[isExactActive && 'active']">
            <a :href="href" @click="navigate">Регистрация</a>
          </li>
        </router-link>

        <router-link :to="{name: 'Login'}" custom v-slot="{ navigate, href, isExactActive }">
          <li :class="[isExactActive && 'active']">
            <a :href="href" @click="navigate">Логин</a>
          </li>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'Header',
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
.nav-wrapper {
  padding: 0 30px;
}
</style>