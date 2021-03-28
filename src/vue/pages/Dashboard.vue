<template>
  <div class="dashboard">
    <div class="dashboard__count-down app__block">
      00:00:00
    </div>
    <div class="dashboard__total-staked-chart app__block">
      dashboard total staked chart
    </div>
    <div class="dashboard__staked-offers app__block">
      dashboard staked offers
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
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
