<template>
  <aside
    class="sidebar"
    :class="{
      'sidebar--active': isSidebarShown,
    }"
  >
    <div
      class="sidebar__backdrop"
      @click="closeSidebar"
    />
    <div class="sidebar__aside">
      <div class="sidebar__header">
        <div class="sidebar__title">
          {{ walletEmail }}
        </div>
      </div>
      <div class="sidebar__link-section">
        <router-link
          class="sidebar__link-item"
          :to="vueRoutes.dashboard"
        >
          {{ 'sidebar.dashboard-link' | globalize }}
        </router-link>
        <router-link
          class="sidebar__link-item"
          :to="vueRoutes.marketplace"
        >
          {{ 'sidebar.marketplace-link' | globalize }}
        </router-link>
      </div>
      <div class="sidebar__footer">
        sidebar-footer
      </div>
    </div>
  </aside>
</template>

<script>
import { vuexTypes } from '@/vuex'
import { mapGetters } from 'vuex'
import { vueRoutes } from '@/vue-router/vueRoutes'
import { Bus } from '@/js/helpers/event-bus'

export default {
  name: 'sidebar',
  data () {
    return {
      isSidebarShown: false,
      vueRoutes,
    }
  },
  computed: {
    ...mapGetters([
      vuexTypes.walletEmail,
    ]),
  },
  created () {
    Bus.on(Bus.eventList.openSidebar, () => {
      this.isSidebarShown = !this.isSidebarShown
    })
  },
  methods: {
    openSidebar () {
      this.openSidebar = true
    },

    closeSidebar () {
      this.isSidebarShown = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~@/scss/variables.scss";
@import "~@/scss/mixins.scss";

.sidebar {
  position: relative;
  overflow: hidden;
  width: auto;
  height: 100vh;
}

.sidebar__backdrop {
  position: fixed;
  top: 0;
  left: -200%;
  width: 100vw;
  height: 100vh;
  background: $col-sidebar-backdrop;
  z-index: $z-index-sidebar-backdrop;
  transition: 0.25s ease;

  .sidebar--active & {
    left: 0;
  }
}

.sidebar__aside {
  position: fixed;
  top: 0;
  left: -200%;
  display: flex;
  flex-direction: column;
  width: auto;
  height: 100%;
  background: $col-sidebar-background;
  color: $col-sidebar-txt;
  padding: $sidebar-padding;
  z-index: $z-index-sidebar;
  transition: 0.25s 0.1s ease;

  .sidebar--active & {
    left: 0;
  }
}

.sidebar__header {
  border-bottom: 0.1rem solid $col-sidebar-header-border;
  padding: 0 $sidebar-padding-right 2rem $sidebar-padding-left;
  margin-bottom: 2rem;
}

.sidebar__link-section {
  display: flex;
  flex-direction: column;
}

.sidebar__link-item {
  position: relative;
  padding: 1rem $sidebar-padding-right 1rem $sidebar-padding-left;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 0.2rem;
    background: $col-sidebar-txt-active;
    opacity: 0;
  }

  &.router-link-active {
    color: $col-sidebar-txt-active;

    &:after {
      opacity: 1;
    }
  }
}

.sidebar__footer {
  border-top: 0.1rem solid $col-sidebar-footer-border;
  padding: 2rem $sidebar-padding-right 0 $sidebar-padding-left;
  margin-top: 2rem;
}
</style>
