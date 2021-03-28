<template>
  <div class="notification">
    <notifications />
  </div>
</template>

<script>
import { Bus } from '@/js/helpers/event-bus'
import { globalize } from '@/vue/filters/globalize'

export default {
  name: 'notification',
  created () {
    Bus.on(Bus.eventList.success, message => {
      this.$notify({
        type: 'success',
        title: 'Success!',
        text: globalize(message),
        duration: 5000,
        speed: 1000,
      })
    })
    Bus.on(Bus.eventList.error, message => {
      this.$notify({
        type: 'error',
        title: 'Error!',
        text: globalize(message),
        duration: 5000,
        speed: 1000,
      })
    })
    Bus.on(Bus.eventList.warning, message => {
      this.$notify({
        type: 'warning',
        title: 'Warning!',
        text: globalize(message),
        duration: 5000,
        speed: 1000,
      })
    })
    Bus.on(Bus.eventList.info, message => {
      this.$notify({
        type: 'info',
        title: 'Info!',
        text: globalize(message),
        duration: 5000,
        speed: 1000,
      })
    })
  },
}
</script>

<style lang="scss" scoped>
.notification {
}
</style>
