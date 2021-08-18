<template>
  <Header/>
  <div class="container">
    <router-view/>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import {useStore} from 'vuex';
import Header from '../components/auth/Header.vue';
import {useMessage} from '../use/message.use';
import {CodeMessages} from '../utils/codeMessages';

export default defineComponent({
  name: 'Auth',
  components: {Header},
  setup() {
    // data
    const route = useRoute();
    const store = useStore();

    // computed
    // methods
    // hooks
    onMounted(() => {
      const param = route.query?.message;

      if (CodeMessages(param)) {
        store.commit('message/setMessage', {message: CodeMessages(param)});
      }
    });

    // template
    return {
      ...useMessage(),
    };
  },
});
</script>

<style scoped>

</style>