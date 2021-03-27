<template>
  <form
    class="sign-in-form"
    @submit.prevent="isFormValid() && submit()"
  >
    <input
      type="text"
      v-model="form.email"
    >
    <input
      type="text"
      v-model="form.password"
    >
    <button type="submit">
      Sign in
    </button>
  </form>
</template>

<script>
import FormMixin from '@/vue/mixins/form.mixin'
import { required, email } from '@/validators'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { vuexTypes } from '@/vuex'
import { errors } from '@/js/errors'
import { ErrorHandler } from '@/js/helpers/error-handler'
import { vueRoutes } from '@/vue-router/vueRoutes'

export default {
  name: 'sign-in-form',
  mixins: [FormMixin],
  data () {
    return {
      form: {
        email: '',
        password: '',
      },
      isSubmitting: false,
    }
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },
  computed: {
    ...mapGetters([
      vuexTypes.walletAccountId,
      vuexTypes.walletEmail,
    ]),
  },
  methods: {
    ...mapActions({
      logInAccount: vuexTypes.LOG_IN,
    }),
    ...mapMutations({
      clearWalletAndAccount: vuexTypes.CLEAR_WALLET_AND_ACCOUNT,
    }),
    async submit () {
      this.disableForm()
      this.isSubmitting = true
      try {
        await this.logInAccount({
          email: this.form.email.toLowerCase(),
          password: this.form.password,
        })
        await this.$router.push(vueRoutes.app)
      } catch (e) {
        this.processAuthError(e)
        this.enableForm()
        this.isSubmitting = false
      }
      this.isSubmitting = false
      this.enableForm()
    },
    processAuthError (error) {
      switch (error.constructor) {
        // case errors.VerificationRequiredError:
        //   this.$router.push({
        //     ...vueRoutes.verify,
        //     params: {
        //       paramsBase64: btoa(JSON.stringify({
        //         walletId: error.meta.walletId,
        //         email: this.form.email.toLowerCase(),
        //       })),
        //     },
        //   })
        //   break
        case errors.TFARequiredError:
          this.tfaError = error
          break
        case errors.NotFoundError:
          ErrorHandler.process(
            error,
            'auth-pages.wrong-email-or-password-err',
          )
          break
        case errors.BadRequestError:
          ErrorHandler.process(
            error,
            'auth-pages.wrong-tfa-code-err',
          )
          break
        case errors.TransactionError:
          ErrorHandler.process(
            error,
            'errors.default',
          )
          this.clearWalletAndAccount()
          break
        default:
          ErrorHandler.process(error)
      }
    },
  },
}
</script>

<style scoped>

</style>
