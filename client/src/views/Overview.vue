<template>
  <h1 class="h1">
    Обзор за вчера ({{ date(yesterday) }})
    <i class="material-icons" @click="featureDiscoveryRef.open()">info_outline</i>
  </h1>

  <Preloader v-if="preloader"/>

  <div class="row" v-else-if="!preloader && dataOverview">
    <div class="col s12 m6">
      <div class="card light-blue lighten-2">
        <div class="card-content white-text">
          <span class="card-title">Выручка:</span>
          <p class="price">{{ dataOverview.gain.yesterday }} ₽</p>
          <div :class="clOverGain.cl">
            <i class="material-icons">{{ clOverGain.materialIcon }}</i>
            <div>{{ dataOverview.gain.percent }}%</div>
          </div>
          <div>
            Выручка вашего бизнеса вчера на {{ dataOverview.gain.percent }}%
            {{ dataOverview.gain.isHigher ? 'выше' : 'ниже' }} среднего:
            <p>{{ dataOverview.gain.compare }} руб. в день</p>
          </div>
        </div>
      </div>
    </div>

    <div class="col s12 m6">
      <div class="card orange lighten-1">
        <div class="card-content white-text">
          <span class="card-title">Заказы:</span>
          <p class="price">{{ dataOverview.orders.yesterday }} зак.</p>
          <div :class="clOverOrder.cl">
            <i class="material-icons">{{ clOverOrder.materialIcon }}</i>
            <div>{{ dataOverview.orders.percent }}%</div>
          </div>
          <div>
            Число заказов вчера на {{ dataOverview.orders.percent }}%
            {{ dataOverview.orders.isHigher ? 'выше' : 'ниже' }} среднего значения:
            <p>{{ dataOverview.orders.compare }} заказа в день</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="center" v-else>
    <h4>Данных по аналитике пока нет</h4>
  </div>

  <FeatureDiscovery
      ref="featureDiscoveryRef"
  />
</template>

<script lang="ts">
import {defineComponent, ref, computed, onMounted} from 'vue';
import {useStore} from 'vuex';
import FeatureDiscovery from '../components/FeatureDiscovery.vue';
import Preloader from '../components/Preloader.vue';
import date from '../filters/date.filter';

import {IOverviewData} from '../types/Overview';

export default defineComponent({
  name: 'Overview',
  setup() {
    // data
    const store = useStore();
    const preloader = ref(true);
    const dataOverview = ref<IOverviewData>({});
    const featureDiscoveryRef = ref<{ open: () => void }>({});

    // computed
    const clOverGain = computed(() => {
      return dataOverview.value.gain.isHigher
          ? {cl: 'percentUp', materialIcon: 'arrow_upward'}
          : {cl: 'percentDown', materialIcon: 'arrow_downward'};
    });

    const clOverOrder = computed(() => {
      return dataOverview.value.orders.isHigher
          ? {cl: 'percentUp', materialIcon: 'arrow_upward'}
          : {cl: 'percentDown', materialIcon: 'arrow_downward'};
    });

    // Получаем вчерашнюю дату
    const yesterday = computed(() => new Date().setDate(new Date().getDate() - 1));

    // methods
    // hooks
    onMounted(async () => {
      try {
        dataOverview.value = await store.dispatch('analytics/getOverview');
      } catch (error) {
      } finally {
        preloader.value = false;
      }
    });

    // template
    return {
      date,
      yesterday,
      preloader,
      dataOverview,
      clOverGain,
      clOverOrder,
      featureDiscoveryRef,
    };
  },
  components: {Preloader, FeatureDiscovery},
});
</script>

<style scoped lang="scss">
.h1 {
  font-size: 30px;
  display: flex;
  align-items: center;
  margin: 10px 0 30px 0;

  & i {
    cursor: pointer;
    margin-left: 10px;
  }
}

.price {
  font-size: 50px;
}

@mixin percentUpDown($color) {
  display: flex;
  align-items: center;

  i, & > div {
    color: $color;
  }

  div {
    font-size: 40px;
    margin-left: 10px;
  }
}

.percentUp {
  @include percentUpDown(#0f9d58);
}

.percentDown {
  @include percentUpDown(#e81a1a);
}
</style>