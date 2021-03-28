<template>
  <div class="app-content">
    <div class="app-content__sidebar">
      <sidebar />
    </div>
    <div class="app-content__main">
      <div class="app-content__navbar">
        <navbar />
      </div>
      <div class="app-content__main-wrapper">
        <notification />
        <transition
          name="app-content__transition"
          mode="out-in"
        >
          <router-view />
        </transition>
      </div>
<!--      <div class="app-content__footer">-->
<!--        <app-footer />-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
import Sidebar from '@/vue/navigation/Sidebar'
// import AppFooter from '@/vue/navigation/Footer'
import Navbar from '@/vue/navigation/Navbar'
import Notification from '@/vue/common/Notification'

export default {
  name: 'app-content',
  components: {
    Notification,
    Sidebar,
    // AppFooter,
    Navbar,
  },
}
</script>

<style lang="scss" scoped>
@import "~@/scss/variables.scss";
@import "~@/scss/mixins.scss";

.app-content {
  overflow: hidden;
  display: flex;
  width: 100vw;
  height: 100vh;
}

.app-content__main {
  overflow: hidden auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: $app-content-padding;
}

.app-content__main-wrapper {
  flex: 1;
  background: $col-app-content-background;
  padding: $app-content-padding-top 0 $app-content-padding-bottom 0;
}

.app-content__sidebar {
  display: none;

  @include respond-to($hide-sidebar-breakpoint) {
    display: block;
  }
}

.app-content__transition-enter-active {
  animation: fade-in 0.5s ease;
}

.app-content__transition-leave-active {
  animation: fade-in 0.5s ease reverse;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
