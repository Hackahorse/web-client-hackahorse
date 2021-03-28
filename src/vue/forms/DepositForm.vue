<template>
  <form
    class="deposit-form app-form"
    @submit.prevent="isFormValid() && submit()"
  >
    <div class="deposit-form__select-currency">
      <div class="deposit-form__select-currency-label">
        {{ 'deposit-form.select-lbl' | globalize }}
      </div>
      <select
        v-model="form.selectedCurrency"
      >
        <option value=""></option>
        <option
          v-for="currency in CURRENCIES"
          :key="currency"
          :value="currency"
        >
          {{ currency }}
        </option>
      </select>
    </div>
    <input-field
      v-model="form.amount"
      :label="'deposit-form.amount-lbl' | globalize"
    />
    <div class="app-form__actions">
      <button
        type="submit"
        :disabled="formMixin.isDisabled"
      >
        {{ 'deposit-form.submit-btn' | globalize }}
      </button>
    </div>
    <template v-if="deposit.qrCodeUrl">
      <img :src="deposit.qrCodeUrl">
    </template>
  </form>
</template>

<script>
import InputField from '@/vue/fields/InputField'
import FormMixin from '@/vue/mixins/form.mixin'
import { mapGetters } from 'vuex'
import { vuexTypes } from '@/vuex'
import axios from 'axios'
import { ErrorHandler } from '@/js/helpers/error-handler'

const CURRENCIES = [
  'BTC',
  'LTC',
  'BNB',
  'BNB.ERC20',
  'DASH',
  'DOGE',
  'ETH',
  'OKB',
  'NEO',
  'USDT.BEP2',
  'USDT.ERC20',
  'XEM',
  'ZEC',
]

export default {
  name: 'deposit-form',
  components: { InputField },
  mixins: [FormMixin],
  data () {
    return {
      form: {
        amount: '',
        selectedCurrency: '',
      },
      deposit: {
        address: '',
        amount: 0,
        qrCodeUrl: '',
      },
      CURRENCIES,
    }
  },
  computed: {
    ...mapGetters([
      vuexTypes.accountId,
    ]),
  },
  methods: {
    async submit () {
      this.deposit.qrCodeUrl = ''
      this.disableForm()
      try {
        const { data } = await axios.post('http://localhost:8081/deposit', {
          amount: +this.form.amount,
          currency: this.form.selectedCurrency,
          accountId: this.accountId,
        })
        this.deposit = {
          address: data.address,
          amount: data.amount,
          qrCodeUrl: data.qrCodeUrl,
        }
      } catch (error) {
        ErrorHandler.process(error)
      }
      this.enableForm()
    },
  },
}
</script>

<style lang="scss" scoped>
@import "./scss/forms";

.deposit-form {
  padding: 3rem;
}

.deposit-form__select-currency-label {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
</style>
