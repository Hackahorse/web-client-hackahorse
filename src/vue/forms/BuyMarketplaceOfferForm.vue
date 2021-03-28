<template>
  <form
    class="buy-marketplace-offer-form app-form"
    @submit.prevent="isFormValid() && submit()"
  >
    <div class="app-form__field">
      <input-field
        type="number"
        v-model="form.amount"
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
    <div
      v-if="secretWitness"
      class="app-form__field app-form__field-qr"
    >
      <qr-code
        :text="secretWitness"
      />
      <div class="app-form__field-attention">
        {{ 'buy-marketplace-offer-form.save-attention' | globalize }}
      </div>
    </div>
  </form>
</template>

<script>
import FormMixin from '@/vue/mixins/form.mixin'
import MarketplaceOfferBidMixin from '@/vue/mixins/marketplace-offer-bid.mixin'
import Loader from '@/vue/common/Loader'
import { ErrorHandler } from '@/js/helpers/error-handler'
import config from '@/config'
import {
  amountRange,
  required,
} from '@/validators'
import { vuexTypes } from '@/vuex'
import { mapGetters } from 'vuex'
import axios from 'axios'
import { base } from '@tokend/js-sdk'
import { api } from '@/api'
import _isEmpty from 'lodash/isEmpty'
import { Bus } from '@/js/helpers/event-bus'

export default {
  name: 'buy-marketplace-offer-form',
  components: {
    Loader,
  },
  mixins: [FormMixin, MarketplaceOfferBidMixin],
  props: {
    offer: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      form: {
        amount: '',
      },
      witness: {},
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
      },
    }
  },
  computed: {
    ...mapGetters([
      vuexTypes.statsQuoteAsset,
      vuexTypes.accountId,
      vuexTypes.accountBalanceByCode,
    ]),
    statsQuoteAssetBalance () {
      return this.accountBalanceByCode(this.statsQuoteAsset.code)
    },
    secretWitness () {
      return !_isEmpty(this.witness) ? JSON.stringify(this.witness) : undefined
    },
  },
  methods: {
    async submit () {
      this.disableForm()
      try {
        const paymentOp = this.buildPaymentOperation(this.form.amount)
        await api.postOperations(paymentOp)
        const { data } = await axios.post('http://localhost:8081/bet/', {
          betAmount: this.form.amount,
          accountId: this.accountId,
          teamId: this.offer.id,
        })
        this.witness = {
          ...data,
        }
        Bus.success('buy-marketplace-offer-form.staking-success')
      } catch (e) {
        ErrorHandler.process(e)
      }
      this.enableForm()
    },

    buildPaymentOperation (amount) {
      return base.PaymentBuilder.payment({
        sourceBalanceId: this.statsQuoteAssetBalance.id,
        destination: config.CORPORATE_BOKKIE,
        amount: String(amount),
        feeData: {
          sourceFee: {
            percent: '0',
            fixed: '0',
          },
          destinationFee: {
            percent: '0',
            fixed: '0',
          },
          sourcePaysForDest: false,
        },
        subject: '',
        asset: this.statsQuoteAssetBalance.asset.code,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import "./scss/forms";
.buy-marketplace-offer-form {
  padding: 2.5rem;
}
.app-form__field-attention {
  font-size: 3.5rem;
}
.app-form__field-qr {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
