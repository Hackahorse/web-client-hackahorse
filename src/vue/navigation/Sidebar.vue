<template>
  <aside class="sidebar">
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
  </aside>
</template>

<script>
import { vuexTypes } from '@/vuex'
import { mapGetters } from 'vuex'
import { vueRoutes } from '@/vue-router/vueRoutes'

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
  created () {},
  methods: {},
}
</script>

<style lang="scss" scoped>
@import "~@/scss/variables.scss";
@import "~@/scss/mixins.scss";

.sidebar {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: $col-sidebar-background;
  padding: $sidebar-padding;
}

.sidebar__header {
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  border-bottom: 0.1rem solid $col-sidebar-header-border;
}

.sidebar__link-section {
  display: flex;
  flex-direction: column;
}

.sidebar__footer {
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 0.1rem solid $col-sidebar-footer-border;
}
</style>
