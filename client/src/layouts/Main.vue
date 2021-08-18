<template>
  <div class="myRow">
    <div class="myRow__left">
      <Sidebar/>
    </div>

    <main class="myRow__right">
      <router-view/>
    </main>

    <div class="fixed-action-btn" ref="floating">
      <a class="btn-floating btn-large red">
        <i class="large material-icons">add</i>
      </a>
      <ul>
        <li>
          <router-link :to="{name: 'Order'}" class="btn-floating green">
            <i class="material-icons">assignment</i>
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'AddCategory'}" class="btn-floating blue">
            <i class="material-icons">list</i>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted} from 'vue';
import {useMessage} from '../use/message.use';
import Sidebar from '../components/Sidebar.vue';

let floatingInstance = null;

export default defineComponent({
  name: 'Main',
  setup() {
    // data
    const floating = ref(null);

    // computed
    // methods
    // hooks
    onMounted(() => {
      floatingInstance = M.FloatingActionButton.init(floating.value);
    });

    // template
    return {
      floating,
      ...useMessage(),
    };
  },
  components: {Sidebar},
});
</script>

<style scoped lang="scss">
.myRow {
  height: 100vh;
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-gap: 0 20px;

  &__left,
  &__right {
    height: 100%;
    padding-top: 15px;
    padding-bottom: 15px;
  }

  &__right {
    position: relative;
    padding-right: 15px;
  }
}
</style>