<template>
  <div class="no-data-message">
    <div class="no-data-message__title">
      {{ title }}
    </div>
    <div class="no-data-message__message">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'no-data-message',
  props: {
    title: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.no-data-message__title {
  font-size: 4rem;
}
.no-data-message__message {
  font-size: 2.5rem;
}
</style>
