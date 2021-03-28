<template>
  <div class="loader">
    <pulse-loader />
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader'

export default {
  name: 'loader',
  components: { PulseLoader },
}
</script>
