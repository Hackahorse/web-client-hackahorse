<template>
  <div
    class="sign-in"
  >
    <div class="sign-in__wrapper">
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
          <sign-in-form />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignInForm from '@/vue/forms/SignInForm'

export default {
  name: 'sign-in',
  components: { SignInForm },
  data () {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~@/scss/variables.scss";
@import "~@/scss/mixins.scss";

.sign-in {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.sign-in__wrapper {
  min-width: 30rem;
}
</style>
