<template>
  <div class="dashboard">
    <article
      class="dashboard__count-down"
      role="tabpanel"
    >
      00:00:00
    </article>
    <article
      class="dashboard__total-staked-chart"
      role="tabpanel"
    >
      dashboard total staked chart
    </article>
    <article
      class="dashboard__staked-offers"
      role="tabpanel"
    >
      <dashboard-staked-offers />
    </article>
  </div>
</template>

<script>
import DashboardStakedOffers from '@/vue/pages/Dashboard/DashboardStakedOffers'
export default {
  name: 'dashboard',
  components: { DashboardStakedOffers },
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
}

</style>
