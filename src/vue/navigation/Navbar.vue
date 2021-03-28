<template>
  <div class="navbar">
    <button
      type="button"
      class="navbar__sidebar-btn"
      @click="openSidebar"
    >
      <i class="mdi mdi-format-list-bulleted" />
    </button>
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
import { Bus } from '@/js/helpers/event-bus'

export default {
  name: 'navbar',
  components: { Passport },
  methods: {
    openSidebar () {
      Bus.emit(Bus.eventList.openSidebar)
    },
  },
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
  color: $col-navbar-text;
  padding: $navbar-padding;
  border-radius: 1.5rem;
}

.navbar__sidebar-btn {
  display: none;

  @include respond-to($hide-sidebar-breakpoint) {
    display: block;
  }
}

.navbar__total-staked {
  display: block;

  @include respond-to($hide-sidebar-breakpoint) {
    display: none;
  }
}

.navbar__count-down {
  display: block;

  @include respond-to($hide-sidebar-breakpoint) {
    display: none;
  }
}

.navbar__passport {
  display: block;

  @include respond-to($hide-sidebar-breakpoint) {
    display: none;
  }
}
</style>
