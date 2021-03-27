<template>
  <div
    id="app"
    class="app"
    v-if="isAppInitialized"
    :key="appKey"
  >
    <transition name="app__transition">
      <router-view />
    </transition>
  </div>
</template>

<script>
import config from '@/config'
import { i18n } from '@/i18n'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { vuexTypes } from '@/vuex'
import { Bus } from '@/js/helpers/event-bus'

export default {
  name: 'app',
  data () {
    return {
      isAppInitialized: false,
      accountRole: '',
      lang: i18n.language,
    }
  },
  async created () {
    this.setAppTitle()
    await this.initApp()

    this.startIdle()

    i18n.onLanguageChanged(lng => (this.lang = lng))

    this.watchChangesInLocalStorage()
    Bus.on('updateAccountRole', () => this.updateAccountRole())
    this.isAppInitialized = true
  },
  computed: {
    ...mapGetters([
      vuexTypes.isLoggedIn,
      vuexTypes.walletAccountId,
    ]),
    isNavigationRendered () {
      return this.$route.matched.some(m => m.meta.isNavigationRendered)
    },
    appKey () {
      return `${this.accountRole}${this.lang}`
    },
  },
  methods: {
    ...mapMutations({
      popState: vuexTypes.POP_STATE,
      clearState: vuexTypes.CLEAR_STATE,
    }),
    ...mapActions({
      restoreSession: vuexTypes.RESTORE_SESSION,
      loadAccount: vuexTypes.LOAD_ACCOUNT,
      loadAssets: vuexTypes.LOAD_ASSETS,
      startIdle: vuexTypes.START_IDLE,
    }),

    async initApp () {
      if (this.isLoggedIn) {
        await this.restoreSession()
        await this.loadAccount(this.walletAccountId)
      }
      await this.loadAssets()
    },
    setAppTitle () {
      document.title = config.APP_NAME
    },
    watchChangesInLocalStorage () {
      window.onstorage = (storage) => {
        const isLocalStorageExists = localStorage.getItem(config.STORAGE_KEY)

        if ((this.isLoggedIn ||
          storage.newValue !== storage.oldValue) && isLocalStorageExists) {
          this.popState()
        } else {
          this.clearState()
        }
      }
    },
    async updateAccountRole () {
      this.accountRole = ((this.account || {}).role || {}).id || ''
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~@/scss/variables.scss";
@import "~@/scss/mixins.scss";

.app__transition-enter-active {
  animation: fade-in 0.35s ease;
}

.app__transition-leave-active {
  animation: fade-in 0.35s ease reverse;
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
