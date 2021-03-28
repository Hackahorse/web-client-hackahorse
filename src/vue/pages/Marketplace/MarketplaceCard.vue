<template>
  <fieldset
    class="marketplace-card"
  >
    <legend>
      {{ asset.name }}
    </legend>
    {{ asset.description }}
    <button
      type="button"
      class="app__button"
      @click="$emit(EVENTS.select, offer.id)"
    >
      {{ 'marketplace-card.buy-btn' | globalize }}
    </button>
  </fieldset>
</template>

<script>
import { MarketplaceOfferAskRecord } from '@/js/records/entities/marketplace-offer-ask.record'
import BuyMarketplaceOfferForm from '@/vue/forms/BuyMarketplaceOfferForm'
import { mapGetters } from 'vuex'
import { vuexTypes } from '@/vuex'

const EVENTS = {
  select: 'select',
}

export default {
  name: 'marketplace-card',
  // eslint-disable-next-line vue/no-unused-components
  components: { BuyMarketplaceOfferForm },
  props: {
    offer: {
      type: MarketplaceOfferAskRecord,
      default: _ => new MarketplaceOfferAskRecord(),
    },
  },
  data () {
    return {
      EVENTS,
    }
  },
  computed: {
    ...mapGetters([
      vuexTypes.assetByCode,
      vuexTypes.statsQuoteAsset,
      vuexTypes.accountId,
    ]),
    asset () {
      return this.assetByCode(this.offer.baseAssetCode)
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~@/scss/variables.scss";
@import "~@/scss/mixins.scss";

.marketplace-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
