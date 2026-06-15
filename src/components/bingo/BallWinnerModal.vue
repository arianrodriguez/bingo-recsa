<script>
import BingoBall from '@/components/bingo/BingoBall.vue';
import BaseButton from '@/components/base/BaseButton.vue';

/** Modal que muestra en grande la última bola extraída. */
export default {
  name: 'BallWinnerModal',
  components: { BingoBall, BaseButton },
  props: {
    letter: {
      type: String,
      required: true,
    },
    number: {
      type: [String, Number],
      required: true,
    },
    outerColor: {
      type: String,
      default: 'var(--color-primary)',
    },
    innerColor: {
      type: String,
      default: 'var(--color-primary-light)',
    },
  },
  emits: ['close'],
};
</script>

<template>
  <div class="modal flex" @click.self="$emit('close')">
    <div class="modal__card flex">
      <BingoBall
        :letter="letter"
        :number="number"
        :outer-color="outerColor"
        :inner-color="innerColor"
      />
      <BaseButton label="aceptar" @click="$emit('close')" />
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1rem;
}

.modal__card {
  flex-direction: column;
  gap: 2rem;
  width: min(320px, 90vw);
  padding: 2rem 1.5rem;
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
}
</style>
