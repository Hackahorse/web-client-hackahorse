<template>
  <article
    role="tabpanel"
    class="marketplace"
  >
    <router-view />
  </article>
</template>

<script>
export default {
  name: 'marketplace',
}
</script>

<style lang="scss" scoped>
.marketplace {
  display: flex;
  flex: 1;
}
</style>
