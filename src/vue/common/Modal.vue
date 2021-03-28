<template>
  <transition
    appear
    name="modal__fade"
  >
    <div
      v-if="isShown"
      class="modal"
    >
      <div
        class="modal__backdrop"
        @click="closeByClickOutside ? closeSelf() : ''"
      />

      <div
        class="window modal__box"
      >
        <template v-if="isCloseBtn">
          <div class="title-bar">
            <div class="title-bar-text">
              <slot name="head" />
            </div>
            <div class="title-bar-controls">
              <button
                aria-label="Minimize"
                @click.stop="closeSelf"
              />
              <button aria-label="Maximize"></button>
              <button
                aria-label="Close"
                @click.stop="closeSelf"
              />
            </div>
          </div>
        </template>
        <div class="modal__box-main">
          <slot />
        </div>
        <slot name="foot" />
      </div>
    </div>
  </transition>
</template>

<script>
const HTML_CLASS_NAME = 'fixed'
const EVENTS = {
  updateIsShown: 'update:isShown',
}

export default {
  name: 'modal',

  props: {
    closeByClickOutside: { type: Boolean, default: false },
    isCloseBtn: { type: Boolean, default: true },
    isShown: { type: Boolean, default: true },
  },

  watch: {
    isShown (val) {
      this.toggleHtmlClass(val)
    },
  },

  methods: {
    closeSelf () {
      this.$emit(EVENTS.updateIsShown, false)
    },
    toggleHtmlClass (isModalShown) {
      const el = document.getElementsByTagName('html')[0]

      if (isModalShown) {
        el.classList.add(HTML_CLASS_NAME)
      } else {
        el.classList.remove(HTML_CLASS_NAME)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/scss/variables';
@import '~@/scss/mixins';

.modal {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.4rem;
  z-index: $z-modal;

  @include respond-to(small) {
    padding: 0;
  }
}

.modal__backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $col-modal-backdrop-bg;
  z-index: $z-modal-backdrop;
}

.modal__box {
  width: 100%;
  max-width: 64rem;
  height: auto;
  max-height: 75vh;
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 1.2rem;

  @include respond-to(small) {
    max-width: unset;
    max-height: unset;
    height: 100%;
    padding: 4.8rem 2.4rem;
    border-radius: 0;
  }
}

.modal__box-main {
  overflow-y: auto;
  flex: 1;
  width: 100%;
}

.modal__fade-enter > .modal__backdrop,
.modal__fade-leave-active > .modal__backdrop,
.modal__fade-enter > .modal__box,
.modal__fade-leave-active > .modal__box,
.modal__fade-enter > .modal__close-btn,
.modal__fade-leave-active > .modal__close-btn {
  opacity: 0;
}

.modal__fade-enter-active,
.modal__fade-leave-active,
.modal__fade-enter-active > .modal__backdrop,
.modal__fade-leave-active > .modal__backdrop,
.modal__fade-enter-active > .modal__box,
.modal__fade-leave-active > .modal__box,
.modal__fade-enter-active > .modal__close-btn,
.modal__fade-leave-active > .modal__close-btn {
  transition: opacity 200ms ease-out;
}
</style>
