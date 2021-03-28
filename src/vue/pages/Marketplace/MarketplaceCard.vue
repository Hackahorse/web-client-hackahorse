<template>
  <fieldset
    class="marketplace-card"
  >
    <legend>
      {{ offer.name }}
    </legend>
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
import BuyMarketplaceOfferForm from '@/vue/forms/BuyMarketplaceOfferForm'

const EVENTS = {
  select: 'select',
}

export default {
  name: 'marketplace-card',
  // eslint-disable-next-line vue/no-unused-components
  components: { BuyMarketplaceOfferForm },
  props: {
    offer: {
      type: Object,
      default: _ => {},
    },
  },
  data () {
    return {
      EVENTS,
    }
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
