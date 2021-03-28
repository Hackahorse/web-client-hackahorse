<template>
  <div class="dashboard-total-staked">
    <template v-if="isLoaded">
      <template v-if="isLoadFailed">
        <error-message/>
      </template>
      <template v-else>
        <div
          class="dashboard-staked-offers__wrapper"
        >
          <article
            class="dashboard-staked-offers__item"
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
      <loader/>
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
import MarketplaceCard from '@/vue/pages/Marketplace/MarketplaceCard'
import ErrorMessage from '@/vue/common/ErrorMessage'
import Loader from '@/vue/common/Loader'
import BuyMarketplaceOfferForm from '@/vue/forms/BuyMarketplaceOfferForm'
import Modal from '@/vue/common/Modal'
import { mapGetters } from 'vuex'
import { vuexTypes } from '@/vuex'
import { api, loadingDataViaLoop } from '@/api'
import { MarketplaceOfferAskRecord } from '@/js/records/entities/marketplace-offer-ask.record'
import { ErrorHandler } from '@/js/helpers/error-handler'

export default {
  name: 'dashboard-total-staked',
  components: {
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
    ...mapGetters([
      vuexTypes.accountId,
    ]),
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
        const response = await api.getWithSignature('/integrations/marketplace/buy_requests', {
          filter: {
            sender: this.accountId,
          },
        })
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
