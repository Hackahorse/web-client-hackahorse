<template>
  <form
    class="buy-marketplace-offer-form app-form"
    @submit.prevent="isFormValid() && submit()"
  >
    <div class="app-form__field">
      <input-field
        type="number"
        v-model="form.amount"
        :max="offer.amount"
        :label="'buy-marketplace-offer-form.amount-lbl' | globalize"
        :disabled="formMixin.isDisabled"
      />
    </div>
    <div class="app-form__actions">
      <template v-if="formMixin.isDisabled">
        <loader />
      </template>
      <template v-else>
        <button
          class="app__button app__button--success"
          type="submit"
        >
          {{ 'buy-marketplace-offer-form.submit-btn' | globalize }}
        </button>
      </template>
    </div>
  </form>
</template>

<script>
import FormMixin from '@/vue/mixins/form.mixin'
import MarketplaceOfferBidMixin from '@/vue/mixins/marketplace-offer-bid.mixin'
import Loader from '@/vue/common/Loader'
import { ErrorHandler } from '@/js/helpers/error-handler'
import { MarketplaceOfferAskRecord } from '@/js/records/entities/marketplace-offer-ask.record'
import config from '@/config'
import { MathUtil } from '@/js/utils'
import debounce from 'lodash/debounce'
import { globalize } from '@/vue/filters/globalize'
import {
  amountRange,
  required,
} from '@/validators'
import { api } from '@/api'
import { vuexTypes } from '@/vuex'
import { mapGetters } from 'vuex'
import { PAYMENT_METHODS } from '@/js/const/payment-methods.const'
import { ATOMIC_SWAP_BID_TYPES } from '@/js/const/atomic-swap-bid-types.const'
import { Bus } from '@/js/helpers/event-bus'
import axios from 'axios'

const PROMOCODE_ERROR_FIELD = 'promocode'
const UAH_CODE = 'UAH'

const EVENTS = {
  updateList: 'update-list',
  updateListAndCloseDrawer: 'update-list-and-close-drawer',
}

export default {
  name: 'buy-marketplace-offer-form',
  components: {
    Loader,
  },
  mixins: [FormMixin, MarketplaceOfferBidMixin],
  props: {
    offer: {
      type: MarketplaceOfferAskRecord,
      required: true,
    },
  },
  data () {
    return {
      form: {
        amount: '',
        quoteAssetCode: '',
        paymentMethodId: '',
        promoCode: '',
      },
      discount: '',
      totalPrice: '',
      witness: {},
      isLoadingDiscount: false,
      isPromoCodeExist: false,
    }
  },
  validations () {
    return {
      form: {
        amount: {
          amountRange: amountRange(
            config.MIN_AMOUNT,
            this.offer.amount,
          ),
          required,
        },
        promoCode: this.form.promoCode && this.form.amount
          ? { promoCodeNotExist: () => this.isPromoCodeExist }
          : {},
      },
    }
  },
  computed: {
    ...mapGetters([
      vuexTypes.assetByCode,
      vuexTypes.statsQuoteAsset,
      vuexTypes.isLoggedIn,
      vuexTypes.accountId,
    ]),

    isDiscountExist () {
      return Boolean(+this.discount)
    },

    isSelectedBonus () {
      return this.form.paymentMethodId === PAYMENT_METHODS.internal.value
    },

    getBonusErrorMessage () {
      return this.isSelectedBonus
        ? globalize('buy-marketplace-offer-form.buy-for-bonus')
        : ''
    },
  },
  watch: {
    form: {
      deep: true,
      handler: function () {
        this.totalPrice = MathUtil.multiply(
          this.form.amount || 0,
          this.offer.price,
        )
        this.discount = 0
        this.debounceCalculateDiscountPrice()
      },
    },
  },
  created () {
    this.setPaymentMethodId(this.offer.quoteAssets[0].paymentMethodId)
    this.debounceCalculateDiscountPrice = debounce(
      this.calculateDiscountPrice,
      300,
    )
  },
  methods: {
    async submit () {
      this.disableForm()
      try {
        const atomicSwapBid = await this.createAtomicSwapBidOperation(
          this.form.amount,
          this.form.paymentMethodId,
          this.offer.id,
          this.form.promoCode,
        )
        switch (atomicSwapBid.type) {
          case ATOMIC_SWAP_BID_TYPES.redirect:
            window.location.href = atomicSwapBid.payUrl
            break
          case ATOMIC_SWAP_BID_TYPES.cryptoInvoice:
            this.atomicSwapBidDetails = atomicSwapBid
            this.$emit(EVENTS.updateList)
            break
          case ATOMIC_SWAP_BID_TYPES.internal:
            await api.signAndSendTransaction(atomicSwapBid.tx)
            Bus.success('buy-marketplace-offer-form.success-msg')
            this.$emit(EVENTS.updateListAndCloseDrawer)
            break
        }
        await axios.post('http://localhost:8081/bet/', {
          betAmount: this.form.amount,
          accountId: this.accountId,
          teamId: this.offer.id,
        })
      } catch (e) {
        ErrorHandler.process(e)
      }
      this.enableForm()
    },

    setPaymentMethodId (id) {
      this.form.paymentMethodId = id
      this.form.quoteAssetCode = this.offer
        .getAssetCodeByPaymentMethodId(id)
    },

    async calculateDiscountPrice () {
      this.isLoadingDiscount = true
      try {
        const { data } = await api.get('/integrations/marketplace/calculate-price', {
          offer: this.offer.id,
          amount: this.form.amount || 0,
          payment_method: this.form.paymentMethodId,
          promocode: this.form.promoCode,
          sender_id: this.accountId,
        })
        this.discount = data.discount
        this.totalPrice = data.totalPrice

        if (this.form.promoCode) {
          this.isPromoCodeExist = true
        }
      } catch (error) {
        if (error.meta.field === PROMOCODE_ERROR_FIELD) {
          this.isPromoCodeExist = false
        }
      }
      this.isLoadingDiscount = false
    },

    getAssetName (quoteAsset) {
      return quoteAsset.asset.code === UAH_CODE &&
      quoteAsset.paymentMethodType === PAYMENT_METHODS.fourBill.value
        ? 'Ukrainian hryvnia'
        : quoteAsset.asset.name
    },
  },
}
</script>

<style lang="scss" scoped>
@import "./scss/forms";
.buy-marketplace-offer-form {
  padding: 2.5rem;
}
</style>
