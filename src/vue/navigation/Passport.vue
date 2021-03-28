<template>
  <div class="passport">
    <button
      class="passport__header"
      @click="toggleDropdown"
    >
      <span class="passport__title">
        {{ email }}
      </span>
      <span class="passport__avatar">
        {{ email | abbreviate }}
      </span>
    </button>
    <transition name="passport__dropdown">
      <div
        v-if="isDropdownOpen"
        class="passport__dropdown"
      >
        <template v-if="$route.name !== vueRoutes.marketplaceList">
          <router-link
            class="passport__dropdown-item"
            :to="vueRoutes.marketplaceList"
            @click="closeDropdown"
          >
            {{ 'passport.marketplace-link' | globalize }}
          </router-link>
        </template>
        <template v-if="$route.name !== vueRoutes.dashboard">
          <router-link
            class="passport__dropdown-item"
            :to="vueRoutes.dashboard"
            @click="closeDropdown"
          >
            {{ 'passport.dashboard-link' | globalize }}
          </router-link>
        </template>
        <button
          class="passport__dropdown-item"
          @click="logOut"
        >
          {{ 'passport.logout-btn' | globalize }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import { vuexTypes } from '@/vuex'
import { mapGetters, mapActions } from 'vuex'
import { vueRoutes } from '@/vue-router/vueRoutes'
import { handleClickOutside } from '@/js/helpers/handle-click-outside'
import { ErrorHandler } from '@/js/helpers/error-handler'

export default {
  name: 'passport',
  data () {
    return {
      isDropdownOpen: false,
      loadAccountDetailsTickerTimeout: 45000,
      destructClickOutsideHandler: () => { },
      vueRoutes,
    }
  },
  computed: {
    ...mapGetters({
      email: vuexTypes.walletEmail,
      kyc: vuexTypes.kyc,
      isAccountCorporate: vuexTypes.isAccountCorporate,
      isAccountGeneral: vuexTypes.isAccountGeneral,
      isAccountBlocked: vuexTypes.isAccountBlocked,
      accountId: vuexTypes.accountId,
    }),
  },
  created () {
  },
  methods: {
    ...mapActions({
      loadKyc: vuexTypes.LOAD_KYC,
      loadAccount: vuexTypes.LOAD_ACCOUNT,
      logOutAccount: vuexTypes.LOG_OUT,
    }),

    async createLoadAccountDetailsTicker () {
      setInterval(() => {
        this.loadAccountDetails()
      }, this.loadAccountDetailsTickerTimeout)
    },

    async loadAccountDetails () {
      try {
        await Promise.all([
          this.loadAccount(this.accountId),
          this.loadKyc(),
        ])
      } catch (e) {
        ErrorHandler.processWithoutFeedback(e)
      }
    },

    toggleDropdown () {
      if (this.isDropdownOpen) {
        this.closeDropdown()
      } else {
        this.openDropdown()
      }
    },

    openDropdown () {
      this.isDropdownOpen = true
      this.destructClickOutsideHandler = handleClickOutside(
        '.passport',
        this.closeDropdown,
      )
    },

    closeDropdown () {
      this.destructClickOutsideHandler()
      this.isDropdownOpen = false
    },

    logOut () {
      this.closeDropdown()
      this.logOutAccount()
      window.location.reload()
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~@/scss/variables.scss";
@import "~@/scss/mixins.scss";

.passport {
  position: relative;
  z-index: $z-passport;
}

.passport__header {
  display: flex;
  align-items: center;
}

.passport__dropdown {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 250%;
  right: -$navbar-padding-right;
  background: $col-passport-background;
  border-radius: 1.5rem;
}

.passport__dropdown-item {
  display: flex;
  padding: 1.5rem 2rem;
  color: $col-passport-text;

  &:hover {
    color: $col-passport-text-hover;
  }
}

.passport__dropdown-enter-active {
  animation: fade-up 0.5s ease;
}
.passport__dropdown-leave-active {
  animation: fade-up 0.5s ease reverse;
}

@keyframes fade-up {
  0% {
    transform: translateY(25%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
