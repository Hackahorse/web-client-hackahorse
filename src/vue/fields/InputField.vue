<template>
  <div
    class="input-field"
    :class="{
      'input-field--error': errorMessage,
      'input-field--disabled': disabled,
    }"
  >
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
      <div
        v-if="label"
        class="input-field__label"
      >
        {{ label }}
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
}

.input-field__label {
  pointer-events: none;
  position: absolute;
  top: 50%;
  left: $input-field-padding-left;
  transform: translateY(-50%);
  transition: 0.35s ease;
  font-size: $input-field-font-size;
  color: $col-field-txt;

  .input-field--error & {
    color: $col-field-error;
  }

  .input-field__input:focus ~ &,
  .input-field__input:not(:placeholder-shown) ~ & {
    top: 0;
    left: 0;
    transform: translateY(-75%);
  }
}

.input-field__input {
  position: relative;
  border: none;
  border-bottom: 0.1rem solid rgba($col-field-border, 0.5);
  background: $col-field-bg;
  color: $col-field-txt;
  padding: $input-field-padding;
  font-size: $input-field-font-size;
  width: 100%;

  .input-field--error & {
    color: $col-field-error;
    border-color: $col-field-error;
  }

  &:focus {
    outline: none;
  }
}

.input-field__error-message-transition-enter-active {
  animation: slide-down 0.5s ease;
}
.input-field__error-message-transition-leave-active {
  animation: slide-down 0.5s ease reverse;
}

.input-field__error-message {
  position: absolute;
  top: 125%;
  left: $input-field-padding-left;
  color: $col-field-error;
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
