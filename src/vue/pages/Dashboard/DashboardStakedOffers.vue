<template>
  <div class="dashboard-staked-offers">
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'dashboard-staked-offers',
  computed: {
    ...mapGetters([]),
  },
  async created () {},
  methods: {
    ...mapActions({
    }),
  },
}
</script>

<style lang="scss" scoped>
.dashboard-staked-offers {
  width: 100%;
  height: 100%;
}
</style>
