<template>
  <div class="sign-in">
    <div class="sign-in__form">
      <sign-in-form />
    </div>
    <div class="sign-in__info">
      <div class="sign-in__title">
        {{ 'sign-in.title' | globalize }}
      </div>
    </div>
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

.sign-in {
  display: flex;
  width: 100vw;
  height: 100vh;
}

.sign-in__info {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
}

.sign-in__title {
  font-weight: 900;
  font-size: 7em;
}

.sign-in__form {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
}
</style>
