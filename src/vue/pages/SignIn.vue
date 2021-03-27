<template>
  <div class="sign-in">
    <sign-in-form />
  </div>
</template>

<script>
import SignInForm from '@/vue/forms/SignInForm'
export default {
  name: 'sign-in',
  components: { SignInForm },
}
</script>

<style lang="scss" scoped>
@import "~@/scss/variables.scss";
@import "~@/scss/mixins.scss";

</style>
