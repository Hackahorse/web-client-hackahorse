<template>
  <div class="marketplace-offers-slider">
    <carousel
      :navigation-enabled="true"
      :per-page="3"
    >
      <slide
        v-for="marketplaceOffer in marketplaceOffers"
        :key="marketplaceOffer.id"
      >
        <div class="marketplace-offers-slider__slider-item">
          <marketplace-card
            :offer="marketplaceOffer"
            @select="setOfferForDrawer"
          />
        </div>
      </slide>
    </carousel>
    <drawer
      :is-shown.sync="isDrawerShown"
    >
      <buy-marketplace-offer-form
        :offer="selectedOffer"
      />
    </drawer>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import MarketplaceCard from '@/vue/pages/Marketplace/MarketplaceCard'
import Drawer from '@/vue/common/Drawer'
import BuyMarketplaceOfferForm from '@/vue/forms/BuyMarketplaceOfferForm'

export default {
  name: 'marketplace-offers-slider',
  components: {
    BuyMarketplaceOfferForm,
    Drawer,
    MarketplaceCard,
    Carousel,
    Slide,
  },
  props: {
    marketplaceOffers: {
      type: Array, /** {@link MarketplaceOfferAskRecord} **/
      required: true,
    },
  },
  data () {
    return {
      isDrawerShown: false,
      selectedOfferId: '',
    }
  },
  computed: {
    selectedOffer () {
      return this.marketplaceOffers.find(el => el.id === this.selectedOfferId)
    },
  },
  methods: {
    setOfferForDrawer (offerId) {
      this.isDrawerShown = true
      this.selectedOfferId = offerId
    },
  },
}
</script>

<style lang="scss" scoped>
.marketplace-offers-slider__slider-item {
  padding: 0 2rem;
}
</style>
