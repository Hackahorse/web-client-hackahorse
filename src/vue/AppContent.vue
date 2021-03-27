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
        <router-view />
      </div>
      <div class="app-content__footer">
        <app-footer />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/vue/navigation/Sidebar'
import AppFooter from '@/vue/navigation/Footer'
import Navbar from '@/vue/navigation/Navbar'
import Notification from '@/vue/common/Notification'

export default {
  name: 'app-content',
  components: {
    Notification,
    Sidebar,
    AppFooter,
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
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #ff0000;
}

.app-content__main-wrapper {
  flex: 1;
}
</style>
