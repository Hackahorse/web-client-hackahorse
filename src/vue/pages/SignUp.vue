<template>
  <div
    class="sign-up"
  >
    <div class="sign-up__wrapper">
      <div
        class="window"
      >
        <div class="title-bar">
          <div class="title-bar-text">
            {{ 'sign-in.title' | globalize }}
          </div>
          <div class="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button aria-label="Close"></button>
          </div>
        </div>
        <div class="window-body">
          <sign-up-form
            :is-disabled="formMixin.isDisabled"
            submit-event="submit"
            @submit="handleChildFormSubmit"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignUpForm from '@/vue/forms/SignUpForm'
import FormMixin from '@/vue/mixins/form.mixin'
import { base } from '@tokend/js-sdk'
import { walletsManager } from '@/api'
import { ErrorHandler } from '@/js/helpers/error-handler'
import { vuexTypes } from '@/vuex'
import { mapActions } from 'vuex'
import { vueRoutes } from '@/vue-router/vueRoutes'

export default {
  name: 'sign-up',
  mixins: [FormMixin],
  components: { SignUpForm },
  data () {
    return {
      recoveryKeypair: null,
      password: null,
      email: '',
      vueRoutes,
    }
  },
  methods: {
    ...mapActions({
      storeWallet: vuexTypes.STORE_WALLET,
      loadAccount: vuexTypes.LOAD_ACCOUNT,
      loadKyc: vuexTypes.LOAD_KYC,
      loadWallet: vuexTypes.LOAD_WALLET,
    }),
    handleChildFormSubmit (form) {
      this.email = form.email
      this.password = form.password
      this.recoveryKeypair = base
        .Keypair
        .random()

      this.submit()
    },
    async submit () {
      this.disableForm()
      try {
        const { response, wallet } = await walletsManager.create(
          this.email.toLowerCase(),
          this.password,
          this.recoveryKeypair,
        )
        if (response.data.verified) {
          await this.storeWallet(wallet)
          await this.loadAccountInfoAndPushToSignupKyc()
        } // else {
        //   await this.$router.push({
        //     ...vueRoutes.verify,
        //     params: {
        //       paramsBase64: btoa(JSON.stringify({
        //         email: wallet.email.toLowerCase(),
        //         walletId: wallet.id,
        //       })),
        //     },
        //   })
        // }
      } catch (e) {
        ErrorHandler.process(e)
      }
      this.enableForm()
    },

    async loadAccountInfoAndPushToSignupKyc () {
      await this.loadAccount(this.walletAccountId)
      await this.loadKyc()
      await this.$router.push(vueRoutes.marketplace)
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~@/scss/variables.scss";
@import "~@/scss/mixins.scss";

.sign-up {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.sign-up__wrapper {
  min-width: 30rem;
}
</style>
