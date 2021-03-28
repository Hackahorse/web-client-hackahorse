<template>
  <div
    class="marketplace-list"
  >
    <template v-if="isLoaded">
      <template v-if="isLoadFailed">
        <error-message />
      </template>
      <template v-else-if="!marketplaceOffers.length">
        <no-data-message
          :title="'marketplace-list.no-data-title' | globalize"
          :message="'marketplace-list.no-data-msg' | globalize"
        />
      </template>
      <template v-else>
        <div
          class="marketplace-list__wrapper"
        >
          <article
            class="marketplace-list__item"
            role="tabpanel"
            v-for="marketplaceOffer in marketplaceOffers"
            :key="marketplaceOffer.id"
          >
            <div class="marketplace-offers-slider__slider-item">
              <marketplace-card
                :offer="marketplaceOffer"
                @select="setOfferForDrawer"
              />
            </div>
          </article>
        </div>
      </template>
    </template>
    <template v-else>
      <loader />
    </template>
    <modal
      :is-shown.sync="isModalShown"
    >
      <buy-marketplace-offer-form
        :offer="selectedOffer"
      />
    </modal>
  </div>
</template>

<script>
import Loader from '@/vue/common/Loader'
import MarketplaceCard from '@/vue/pages/Marketplace/MarketplaceCard'
import BuyMarketplaceOfferForm from '@/vue/forms/BuyMarketplaceOfferForm'
import Modal from '@/vue/common/Modal'
import ErrorMessage from '@/vue/common/ErrorMessage'
import { ErrorHandler } from '@/js/helpers/error-handler'
import { api, loadingDataViaLoop } from '@/api'
import { MarketplaceOfferAskRecord } from '@/js/records/entities/marketplace-offer-ask.record'
import NoDataMessage from '@/vue/common/NoDataMessage'

export default {
  name: 'marketplace-list',
  components: {
    NoDataMessage,
    MarketplaceCard,
    ErrorMessage,
    Loader,
    BuyMarketplaceOfferForm,
    Modal,
  },
  data () {
    return {
      isLoaded: false,
      isLoadFailed: false,
      isModalShown: false,
      marketplaceOffers: [],
      selectedOfferId: '',
    }
  },
  computed: {
    selectedOffer () {
      return this.marketplaceOffers.find(el => el.id === this.selectedOfferId)
    },
  },
  async created () {
    await this.loadMarketplaceOffers()
  },
  methods: {
    setOfferForDrawer (offerId) {
      this.selectedOfferId = offerId
      this.isModalShown = true
    },
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

<style lang="scss" scoped>
.marketplace-list {
  width: 100%;
  height: 100%;
}
</style>
