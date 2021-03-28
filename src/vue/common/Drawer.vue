<template>
  <transition name="drawer-transition">
    <div
      class="drawer"
      v-if="isShown">
      <div
        class="drawer__backdrop"
        @click="closeByClickOutside ? closeSelf() : ''"
      />
      <div class="window drawer__pane">
        <div class="title-bar">
          <div class="title-bar-text">
            <slot name="heading"/>
          </div>
          <div class="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button
              aria-label="Close"
              @click="closeSelf"
            />
          </div>
        </div>
        <div class="window__body">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
const EVENTS = {
  updateIsShown: 'update:isShown',
}

/**
 * Drawer component serves as a wrapper for modal content.
 *
 * To use it pass your content as a slot inside and sync it's prop with the
 * data field in your parent component:
 *
 * <drawer :is-shown.sync="isContentShown">
 *    <content>
 * </drawer>
 *
 * As long as `isContentShown` is `true`, your content will be displayed.
 */
export default {
  props: {
    isShown: { type: Boolean, default: true },
    closeByClickOutside: { type: Boolean, default: true },
  },
  methods: {
    closeSelf () {
      this.$emit(EVENTS.updateIsShown, false)
    },
  },
}
</script>

<style lang="scss">
@import '~@/scss/variables';
@import '~@/scss/mixins';

$media-small: 460px;

.drawer {
  position: fixed;
  width: 100vw;
  min-height: 100vh;
  top: 0;
  left: 0;
  z-index: $z-drawer;
}

.drawer__backdrop {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: $z-drawer-backdrop;
  background-color: $col-drawer-backdrop-bg;
}

.drawer__pane {
  position: absolute;
  top: 0;
  right: 0;
  width: 52.8rem;
  max-width: 100%;
  min-height: 100%;
  height: 100%;
  box-shadow: 0 1rem 2rem 0 $col-drawer-backdrop-bg;
  display: flex;
  flex-direction: column;
}

.drawer-transition-enter-active {
  animation-duration: 0.2s;

  /*
    Disabled because with this nesting we can shiny see where this animation
    used
  */
  /* stylelint-disable selector-nested-pattern */
  & > .drawer__backdrop {
    animation: drawer-backdrop-keyframes 0.2s ease-in-out;
  }

  & > .drawer__pane {
    animation: drawer-pane-keyframes 0.2s ease-in-out;
  }

  /* stylelint-enable selector-nested-pattern */
}

.drawer-transition-leave-active {
  /*
    overall duration should be less than nested durations,
    to prevent animation flickering after animation ended
    but the element still present
  */
  animation-duration: 0.13s;

  /*
    Disabled because with this nesting we can shiny see where this animation
    used
  */
  /* stylelint-disable selector-nested-pattern */
  & > .drawer__backdrop {
    animation: drawer-backdrop-keyframes 0.2s ease-in-out reverse;
  }

  & > .drawer__pane {
    animation: drawer-pane-keyframes 0.2s ease-in-out reverse;
  }

  /* stylelint-enable selector-nested-pattern */
}

@keyframes drawer-backdrop-keyframes {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes drawer-pane-keyframes {
  from {
    opacity: 0;
    transform: translateX(100%);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
