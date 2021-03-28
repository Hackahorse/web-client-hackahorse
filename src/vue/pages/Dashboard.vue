<template>
  <div class="dashboard">
    <article
      class="dashboard__total-staked-chart"
      role="tabpanel"
    >
      <div class="dashboard__title">
        {{ 'dashboard.total-staked-title' | globalize }}
      </div>
      <div class="dashboard__total-staked-chart-amount">
        {{ statsQuoteAsset.issued }}
      </div>
    </article>
    <article
      class="dashboard__staked-offers"
      role="tabpanel"
    >
      <div class="dashboard__title">
        {{ 'dashboard.staked-offers-title' | globalize }}
      </div>
      <dashboard-staked-offers />
    </article>
  </div>
</template>

<script>
import DashboardStakedOffers from '@/vue/pages/Dashboard/DashboardStakedOffers'
import { mapGetters } from 'vuex'
import { vuexTypes } from '@/vuex'

export default {
  name: 'dashboard',
  components: { DashboardStakedOffers },
  computed: {
    ...mapGetters([
      vuexTypes.statsQuoteAsset,
    ]),
  },
}
</script>

<style lang="scss" scoped>
@import "~@/scss/variables.scss";
@import "~@/scss/mixins.scss";

.dashboard {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.5rem;
}

.dashboard__staked-offers {
  grid-column: 1 / -1;
  padding-bottom: 5rem;
}

.dashboard__title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  font-weight: 600;
}

.dashboard__total-staked-chart-amount {
  font-size: 3.5rem;
  font-weight: 800;
}

</style>
