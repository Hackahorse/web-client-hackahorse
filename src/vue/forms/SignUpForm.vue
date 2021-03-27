<template>
  <form
    class="sign-up-form"
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
    <input
      type="text"
      v-model="form.confirmPassword"
    >
    <button type="submit">
      sign up
    </button>
  </form>
</template>

<script>
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

export default {
  name: 'sign-up-form',
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

</style>
