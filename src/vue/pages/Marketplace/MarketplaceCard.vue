<template>
  <div class="marketplace-card">
    <buy-marketplace-offer-form
      :offer="offer"
    />
  </div>
</template>

<script>
import { MarketplaceOfferAskRecord } from '@/js/records/entities/marketplace-offer-ask.record'
import BuyMarketplaceOfferForm from '@/vue/forms/BuyMarketplaceOfferForm'

export default {
  name: 'marketplace-card',
  components: { BuyMarketplaceOfferForm },
  props: {
    offer: {
      type: MarketplaceOfferAskRecord,
      default: _ => new MarketplaceOfferAskRecord(),
    },
  },
}
</script>

<style scoped>

</style>
