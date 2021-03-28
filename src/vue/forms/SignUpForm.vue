<template>
  <form
    class="sign-up-form app-form"
    @submit.prevent="isFormValid() && submit()"
  >
    <div class="app-form__field">
      <input-field
        v-model="form.email"
        :label="'sign-up-form.email-lbl' | globalize"
        :error-message="getFieldErrorMessage('form.email')"
        @blur="touchField('form.email')"
        :disabled="formMixin.isDisabled"
      />
    </div>
    <div class="app-form__field">
      <input-field
        v-model="form.password"
        :label="'sign-up-form.password-lbl' | globalize"
        :error-message="getFieldErrorMessage('form.password')"
        @blur="touchField('form.password')"
        :disabled="formMixin.isDisabled"
      />
    </div>
    <div class="app-form__field">
      <input-field
        v-model="form.confirmPassword"
        :label="'sign-up-form.confirm-password-lbl' | globalize"
        :error-message="getFieldErrorMessage('form.confirmPassword')"
        @blur="touchField('form.confirmPassword')"
        :disabled="formMixin.isDisabled"
      />
    </div>
    <div
      class="
        app-form__actions
        sign-up-form__actions
      "
    >
      <template v-if="isSubmitting || isDisabled">
        <loader />
      </template>
      <template v-else>
        <button
          type="submit"
          class="app__button-raised"
        >
          {{ 'sign-up-form.submit-btn' | globalize }}
        </button>
      </template>
    </div>
    <router-link
      class="app-form__field"
      :to="vueRoutes.signIn"
    >
      {{ 'sign-up-form.sign-in-link' | globalize }}
    </router-link>
  </form>
</template>

<script>
import Loader from '@/vue/common/Loader'
import FormMixin from '@/vue/mixins/form.mixin'
import { walletsManager } from '@/api'
import { errors } from '@/js/errors'

import {
  email,
  required,
  password,
  sameAs,
} from '@/validators'
import { ErrorHandler } from '@/js/helpers/error-handler'
import { vueRoutes } from '@/vue-router/vueRoutes'

export default {
  name: 'sign-up-form',
  components: { Loader },
  mixins: [FormMixin],
  props: {
    submitEvent: {
      type: String,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      form: {
        email: '',
        password: '',
        confirmPassword: '',
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
        password,
      },
      confirmPassword: {
        required,
        password,
        sameAsPassword: sameAs(function () { return this.form.password }),
      },
    },
  },
  methods: {
    async submit () {
      this.disableForm()
      this.isSubmitting = true
      try {
        await walletsManager.getKdfParams(this.form.email.toLowerCase())
        throw new errors.UserExistsError()
      } catch (e) {
        if (e instanceof errors.NotFoundError) {
          this.$emit(this.submitEvent, this.form)
          this.enableForm()
          this.isSubmitting = false
          return
        }
        ErrorHandler.process(e)
      }
      this.isSubmitting = false
      this.enableForm()
    },
  },
}
</script>

<style lang="scss" scoped>
@import "./scss/forms";

</style>
