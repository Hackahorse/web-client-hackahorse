<template>
  <div class="app-content">
    <div class="window">
      <div class="title-bar">
        <div class="title-bar-text">
          {{ config.APP_NAME }}
        </div>
        <div class="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button
            aria-label="Close"
            @click="logOut"
          />
        </div>
      </div>
      <div class="window-body">
        <div class="app-content__nav">
          <router-link
            class="app-content__link"
            :to="vueRoutes.dashboard"
          >
            {{ 'app-content.dashboard-link' | globalize }}
          </router-link>
          <router-link
            class="app-content__link"
            :to="vueRoutes.marketplace"
          >
            {{ 'app-content.marketplace-link' | globalize }}
          </router-link>
        </div>
        <notification/>
        <transition
          name="app-content__transition"
          mode="out-in"
        >
          <router-view/>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Notification from '@/vue/common/Notification'
import { mapActions } from 'vuex'
import { vuexTypes } from '@/vuex'
import config from '@/config'
import { vueRoutes } from '@/vue-router/vueRoutes'

export default {
  name: 'app-content',
  components: {
    Notification,
  },
  data () {
    return {
      config,
      vueRoutes,
    }
  },
  methods: {
    ...mapActions({
      loadKyc: vuexTypes.LOAD_KYC,
      loadAccount: vuexTypes.LOAD_ACCOUNT,
      logOutAccount: vuexTypes.LOG_OUT,
    }),
    logOut () {
      this.logOutAccount()
      window.location.reload()
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~@/scss/variables.scss";
@import "~@/scss/mixins.scss";

.app-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 3rem;
}

.window {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.app-content__nav {
  display: flex;
}

.app-content__link {
  &:not(:last-child) {
    margin-right: 2rem;
  }
}
</style>
