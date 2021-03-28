<template>
  <div class="marketplace-list">
    <template v-if="isLoaded">
      <template v-if="isLoadFailed">
        <error-message />
      </template>
      <template v-else>
        <div class="marketplace-list__wrapper">
          <marketplace-offers-slider
            :marketplace-offers="marketplaceOffers"
          />
        </div>
      </template>
    </template>
    <template v-else>
      <loader />
    </template>
  </div>
</template>

<script>
import { ErrorHandler } from '@/js/helpers/error-handler'
import Loader from '@/vue/common/Loader'
import ErrorMessage from '@/vue/common/ErrorMessage'
import { api, loadingDataViaLoop } from '@/api'
import { MarketplaceOfferAskRecord } from '@/js/records/entities/marketplace-offer-ask.record'
import MarketplaceOffersSlider from '@/vue/common/MarketplaceOffersSlider'

export default {
  name: 'marketplace-list',
  components: { MarketplaceOffersSlider, ErrorMessage, Loader },
  data () {
    return {
      isLoaded: false,
      isLoadFailed: false,
      marketplaceOffers: [],
    }
  },
  async created () {
    await this.loadMarketplaceOffers()
  },
  methods: {
    async loadMarketplaceOffers () {
      this.isLoaded = false
      this.isLoadFailed = false
      try {
        const response = await api.get('/integrations/marketplace/offers')
        const data = await loadingDataViaLoop(response)
        this.marketplaceOffers = data.map(el => new MarketplaceOfferAskRecord(el))
      } catch (e) {
        this.isLoadFailed = true
        ErrorHandler.process(e)
      }
      this.isLoaded = true
    },
  },
}
</script>

<style scoped>

</style>
