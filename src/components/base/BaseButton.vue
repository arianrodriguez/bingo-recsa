<script>
/**
 * Botón presentacional reutilizable. No contiene lógica de negocio:
 * solo emite el click nativo y aplica una variante de estilo.
 */
export default {
  name: 'BaseButton',
  props: {
    label: {
      type: String,
      required: true,
    },
    /** button | submit */
    type: {
      type: String,
      default: 'button',
    },
    /** primary | light */
    variant: {
      type: String,
      default: 'primary',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<template>
  <button
    :type="type"
    class="base-button"
    :class="`base-button--${variant}`"
    :disabled="disabled"
  >
    {{ label }}
  </button>
</template>

<style scoped>
.base-button {
  width: 100%;
  padding: 0.8rem 1rem;
  border-radius: var(--radius-sm);
  border: 3px solid transparent;
  font-family: inherit;
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  cursor: pointer;
  user-select: none;
  transition: transform 0.15s ease, opacity 0.2s ease, box-shadow 0.2s ease;
}

.base-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-soft);
}

.base-button:active:not(:disabled) {
  transform: translateY(0);
}

.base-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.base-button--primary {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-text-inverse);
}

.base-button--light {
  background-color: var(--color-surface);
  border-color: var(--color-surface);
  color: var(--color-text);
}
</style>
