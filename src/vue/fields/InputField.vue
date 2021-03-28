<template>
  <div
    class="input-field"
    :class="{
      'input-field--error': errorMessage,
      'input-field--disabled': disabled,
    }"
  >
    <div
      v-if="label"
      class="input-field__label"
    >
      {{ label }}
    </div>
    <div class="input-field__wrapper">
      <input
        class="input-field__input"
        v-bind="$attrs"
        v-on="listeners"
        :type="type"
        :value="value"
        :placeholder="$attrs.placeholder || ' '"
        @blur="onBlur"
      >
    </div>
    <transition name="input-field__error-message-transition">
      <div
        v-if="errorMessage"
        class="input-field__error-message"
      >
        {{ errorMessage }}
      </div>
    </transition>
  </div>
</template>

<script>
const EVENTS = {
  input: 'input',
}

const INPUT_TYPES = {
  text: 'text',
  password: 'password',
  number: 'number',
}

export default {
  name: 'input-field',
  props: {
    value: {
      type: [String, Number],
      default: undefined,
    },
    label: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: INPUT_TYPES.text,
    },
    trim: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      isPasswordShown: false,
    }
  },
  computed: {
    listeners () {
      return {
        ...this.$listeners,
        input: event => {
          if (this.value === event.target.value) return
          this.$emit(EVENTS.input, event.target.value)
        },
      }
    },
  },
  methods: {
    onBlur (event) {
      if (this.trim) {
        this.$emit(EVENTS.input, event.target.value.trim())
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "./scss/variables";

.input-field {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.input-field__wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
}

.input-field__error-message {
  color: $col-field-error;
  margin-top: 0.5rem;
}

@keyframes slide-down {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

</style>
