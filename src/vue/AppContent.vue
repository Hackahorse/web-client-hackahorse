<template>
  <div class="app-content">
    <div class="window app-content__window">
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
      <div class="window-body app-content__window-body">
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
          <button
            @click="isDepositModalShown = true"
          >
            {{ 'app-content.deposit-btn' | globalize }}
          </button>
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
    <modal
      :is-shown.sync="isDepositModalShown"
    >
      <deposit-form
        @submit="isDepositModalShown = false"
      />
    </modal>
  </div>
</template>

<script>
import Notification from '@/vue/common/Notification'
import { mapActions } from 'vuex'
import { vuexTypes } from '@/vuex'
import config from '@/config'
import { vueRoutes } from '@/vue-router/vueRoutes'
import Modal from '@/vue/common/Modal'
import DepositForm from '@/vue/forms/DepositForm'

export default {
  name: 'app-content',
  components: {
    DepositForm,
    Modal,
    Notification,
  },
  data () {
    return {
      isDepositModalShown: false,
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
  overflow: hidden auto;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 3rem;
}

.app-content__window {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.app-content__window-body {
  overflow: hidden auto;
}

.app-content__nav {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.app-content__link {
  font-size: 1.5rem;

  &:not(:last-child) {
    margin-right: 2rem;
  }
}

.clippy {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
