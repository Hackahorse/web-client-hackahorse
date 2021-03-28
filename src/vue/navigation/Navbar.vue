<template>
  <div class="navbar">
    <div class="navbar__total-staked">
      total-staked
    </div>
    <div class="navbar__count-down">
      00:00:00
    </div>
    <div class="navbar__balance">
      H 250
    </div>
    <div class="navbar__passport">
      <passport />
    </div>
  </div>
</template>

<script>
import Passport from '@/vue/navigation/Passport'
export default {
  name: 'navbar',
  components: { Passport },
}
</script>

<style lang="scss" scoped>
@import "~@/scss/variables.scss";
@import "~@/scss/mixins.scss";

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: $col-navbar-background;
  padding: $navbar-padding;
}
</style>
