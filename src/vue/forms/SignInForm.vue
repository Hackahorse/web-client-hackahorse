<template>
  <form
    class="sign-in-form app-form"
    @submit.prevent="isFormValid() && submit()"
  >
    <div class="app-form__field">
      <input-field
        v-model="form.email"
        :label="'sign-in-form.email-lbl' | globalize"
        :error-message="getFieldErrorMessage('form.email')"
        @blur="touchField('form.email')"
        :disabled="formMixin.isDisabled"
      />
    </div>
    <div class="app-form__field">
      <input-field
        type="password"
        v-model="form.password"
        :label="'sign-in-form.password-lbl' | globalize"
        :error-message="getFieldErrorMessage('form.password')"
        @blur="touchField('form.password')"
        :disabled="formMixin.isDisabled"
      />
    </div>
    <div
      class="
        app-form__actions
        sign-in-form__actions
      "
    >
      <template v-if="isSubmitting">
        <loader />
      </template>
      <template v-else>
        <button
          class="app__button app__button--success"
          type="submit"
          :disabled="formMixin.isDisabled"
        >
          {{ 'sign-in-form.submit-btn' | globalize }}
        </button>
      </template>
    </div>
    <router-link
      class="app-form__field"
      :to="vueRoutes.signUp"
    >
      {{ 'sign-in-form.sign-up-link' | globalize }}
    </router-link>
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
import Loader from '@/vue/common/Loader'

export default {
  name: 'sign-in-form',
  components: { Loader },
  mixins: [FormMixin],
  data () {
    return {
      form: {
        email: '',
        password: '',
      },
      isSubmitting: false,
      vueRoutes,
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

<style lang="scss" scoped>
@import "./scss/forms";

.sign-in-form__actions {
  display: flex;
  justify-content: flex-end;
}

</style>
