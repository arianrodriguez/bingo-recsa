<script>
import BaseButton from '@/components/base/BaseButton.vue';

/** Modal informativo simple (título + detalle + aceptar). */
export default {
  name: 'InfoModal',
  components: { BaseButton },
  props: {
    title: {
      type: String,
      default: '',
    },
    detail: {
      type: String,
      default: '',
    },
  },
  emits: ['close'],
};
</script>

<template>
  <div class="modal flex" @click.self="$emit('close')">
    <div class="modal__card">
      <i class="fa-solid fa-xmark modal__close" @click="$emit('close')"></i>
      <div class="modal__content flex">
        <h2 class="modal__title">{{ title }}</h2>
        <p class="modal__detail">{{ detail }}</p>
        <BaseButton label="aceptar" @click="$emit('close')" />
      </div>
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
  position: relative;
  width: min(520px, 92vw);
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
}

.modal__close {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5rem 1rem 0 0;
  font-size: 2rem;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.modal__close:hover {
  opacity: 0.7;
}

.modal__content {
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem 1.5rem;
  text-align: center;
}

.modal__title {
  font-weight: 700;
  color: var(--color-primary);
}

.modal__detail {
  color: var(--color-text-muted);
  line-height: 1.5;
}
</style>
