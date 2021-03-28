<template>
  <div class="marketplace-card app__block">
    <div class="marketplace-card__header">
      <img
        :src="asset.logoUrl"
      >
    </div>
    <div class="marketplace-card__body">
      <div class="marketplace-card__preview">
        <div class="marketplace-card__title">
          {{ asset.name }}
        </div>
      </div>
      <div class="marketplace-card__details">
        <div class="marketplace-card__title">
          {{ asset.name }}
        </div>
        <div class="marketplace-card__description">
          {{ asset.description }}
        </div>
        <div class="marketplace-card__details-actions">
          <button
            type="button"
            class="app__button"
            @click="$emit(EVENTS.select, offer.id)"
          >
            {{ 'marketplace-card.buy-btn' | globalize }}
          </button>
        </div>
      </div>
    </div>
  </div>
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
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 50rem;
  padding: 0;
}

.marketplace-card__header {
  flex: 1;
  z-index: $z-index-marketplace-card-header;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}

.marketplace-card__body {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: $z-index-marketplace-card-body;
}

.marketplace-card__preview {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: $app-block-padding;
  transition: 0.35s ease;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: $col-marketplace-card-body;
    z-index: -1;
  }

  .marketplace-card:hover & {
    transform: translateY(125%);
  }
}

.marketplace-card__title {
  font-size: 3rem;
  margin-bottom: 2rem;
}

.marketplace-card__details {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateY(125%);
  transition: 0.35s 0.15s ease;
  padding: $app-block-padding;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: $col-marketplace-card-body;
    z-index: -1;
  }

  .marketplace-card:hover & {
    transform: translateY(0);
  }
}

.marketplace-card__title {

}

.marketplace-card__description {

}

.marketplace-card__details-actions {
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
