<template>
  <div class="dashboard-staked-offers">
    <article
      class="dashboard-staked-offers__item"
      role="tabpanel"
      v-for="offerBalance in offerBalances"
      :key="offerBalance.id"
    >
      <div class="dashboard-staked-offers__head">
        <div class="dashboard-staked-offers__title">
          {{ offerBalance.asset.name }}
        </div>
        <div class="dashboard-staked-offers__balance">
          {{ offerBalance.balance }}
        </div>
      </div>
      <div class="dashboard-staked-offers__body">
        {{ offerBalance.asset.description }}
      </div>
    </article>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import { vuexTypes } from '@/vuex'

export default {
  name: 'dashboard-staked-offers',
  computed: {
    ...mapGetters([
      vuexTypes.accountBalances,
    ]),
    offerBalances () {
      return this.accountBalances.filter(el => !el.asset.isBaseAsset)
    },
  },
  async created () {
    await this.loadAccountBalancesDetails()
  },
  methods: {
    ...mapActions({
      loadAccountBalancesDetails: vuexTypes.LOAD_ACCOUNT_BALANCES_DETAILS,
    }),
  },
}
</script>

<style lang="scss" scoped>
.dashboard-staked-offers {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
}

.dashboard-staked-offers__item {
  max-width: 40rem;

  &:not(:last-child) {
    margin-right: 1rem;
  }
}

.dashboard-staked-offers__title {
  font-size: 2.5rem;
}

.dashboard-staked-offers__body {
  font-size: 1.5rem;
}

.dashboard-staked-offers__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.dashboard-staked-offers__balance {
  font-size: 2.5rem;
  font-weight: 900;
}
</style>
