<template>
  <footer class="footer">
    footer
  </footer>
</template>

<script>
export default {
  name: 'app-footer',
}
</script>

<style lang="scss" scoped>
@import "~@/scss/variables.scss";
@import "~@/scss/mixins.scss";

.footer {
  background: $col-footer-background;
  color: $col-footer-text;
  padding: $footer-padding;
  border-radius: 1.5rem;;
}
</style>
