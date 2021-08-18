<template>
  <div class="historyTop">
    <h4>История заказов</h4>

    <button
        v-if="orders.length"
        :class="['waves-effect', 'waves-light', 'btn-small', {red: isFiltered}]"
        v-tool-tip:left="'Открыть фильтр'"
        @click="isFilter = !isFilter"
    >
      <i class="material-icons">filter_list</i>
    </button>
  </div>

  <FilterHistory
      v-if="isFilter"
      @applyFilter="applyFilter"
  />

  <Preloader v-if="preloader"/>

  <template v-else-if="!preloader && orders.length">
    <HistoryTable
        :orders="orders"
    />

    <button type="button" class="waves-effect waves-light btn loadOrder" v-if="isOrder" @click="loadMore">
      Загрузить ещё
    </button>

    <Preloader v-if="preloader2"/>
  </template>

  <div v-else>
    <h6>Заказов пока нет. Добавьте
      <router-link :to="{name: 'OrderItems'}">заказ</router-link>
    </h6>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed, onMounted, onUnmounted} from 'vue';
import {useStore} from 'vuex';
import FilterHistory from '../components/History/FilterHistory.vue';
import HistoryTable from '../components/History/HistoryTable.vue';
import Preloader from '../components/Preloader.vue';
import {IFilter} from '../types/Order';

export default defineComponent({
  name: 'History',
  setup() {
    // data
    const store = useStore();
    const isFilter = ref(false);
    const isOrder = ref(true);
    const orders = ref<{}[]>([]);
    const preloader = ref(true);
    const preloader2 = ref(false);
    const filter = ref({});

    // computed
    const isFiltered = computed((): boolean => {
      return Object.keys(filter.value).length !== 0;
    });

    // methods
    const loadMore = async () => {
      try {
        preloader2.value = true;
        const res = await store.dispatch('order/actionSetOffset');
        // orders.value = orders.value.concat(res);
        orders.value = [...orders.value, ...res];

        // Если заказов пришло меньше чем ожидаем, то значит заказы закончились в БД и скрываем кнопку "Загрузить ещё"
        isOrder.value = !(res.length < +import.meta.env.VITE_LIMIT);
      } catch (error) {
      } finally {
        preloader2.value = false;
      }
    };

    // Применение фильтрации
    const applyFilter = async (filterData: IFilter) => {
      try {
        // console.log(filterData);
        preloader.value = true;
        orders.value = [];
        filter.value = filterData;
        store.commit('order/setOffset', 0);
        // const res = await store.dispatch('order/orderAll', filterData);
        store.commit('order/setDataFilter', filterData);
        const res = await store.dispatch('order/orderAll');
        orders.value = res;

        // Если заказов пришло меньше чем ожидаем, то значит заказы закончились в БД и скрываем кнопку "Загрузить ещё"
        isOrder.value = !(res.length < +import.meta.env.VITE_LIMIT);
      } catch (error) {
      } finally {
        preloader.value = false;
      }
    };

    // hooks
    onMounted(async () => {
      try {
        orders.value = await store.dispatch('order/orderAll');
      } catch (error) {
      } finally {
        preloader.value = false;
      }
    });

    onUnmounted(() => {
      store.commit('order/setOffset', 0);
    });

    // watch
    // template
    return {
      preloader,
      preloader2,
      orders,
      isFilter,
      isOrder,
      isFiltered,
      loadMore,
      applyFilter,
    };
  },
  components: {Preloader, HistoryTable, FilterHistory},
});
</script>

<style scoped>
.historyTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.loadOrder {
  display: block;
  margin: 30px auto;
}
</style>