<script>
let uid = 0;

/**
 * Campo de texto con etiqueta flotante, compatible con v-model.
 * Es puramente presentacional; la validación/saneo lo hace el contenedor.
 */
export default {
  name: 'BaseInput',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  data() {
    uid += 1;
    return {
      inputId: `base-input-${uid}`,
      focused: false,
    };
  },
  computed: {
    isFloating() {
      return this.focused || this.modelValue.length > 0;
    },
  },
  methods: {
    onInput(event) {
      this.$emit('update:modelValue', event.target.value);
    },
    onBlur() {
      this.focused = this.modelValue.length > 0;
    },
  },
};
</script>

<template>
  <div class="base-input">
    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      class="base-input__field"
      autocomplete="off"
      @input="onInput"
      @focus="focused = true"
      @blur="onBlur"
    />
    <label
      :for="inputId"
      class="base-input__label"
      :class="{ 'is-floating': isFloating }"
    >
      {{ placeholder }}
    </label>
  </div>
</template>

<style scoped>
.base-input {
  position: relative;
  width: 100%;
}

.base-input__field {
  width: 100%;
  height: 3.5rem;
  padding: 0 1rem;
  border: 1px solid #a7a9bd;
  border-radius: var(--radius-sm);
  background-color: var(--color-surface);
  color: var(--color-text);
  font-size: 1.1rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.base-input__field:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-primary);
}

.base-input__label {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 0.3rem;
  background-color: var(--color-surface);
  color: var(--color-text-muted);
  font-size: 1.1rem;
  pointer-events: none;
  transition: all 0.2s ease-out;
}

.base-input__label.is-floating {
  top: 0;
  font-size: 0.8rem;
  color: var(--color-primary);
}
</style>
