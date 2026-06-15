<script>
/**
 * Bola del bingo: letra grande + círculo con el número.
 * Reutilizada en el tablero y en el modal de ganador.
 */
export default {
  name: 'BingoBall',
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
};
</script>

<template>
  <div class="bingo-ball flex">
    <h2 class="bingo-ball__letter">{{ letter }}</h2>
    <div class="bingo-ball__circle">
      <div
        class="bingo-ball__outer"
        :style="{ backgroundColor: outerColor }"
      ></div>
      <div class="bingo-ball__inner" :style="{ backgroundColor: innerColor }">
        <span>{{ number }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bingo-ball {
  flex-direction: column;
  gap: 1rem;
}

.bingo-ball__letter {
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 800;
  color: var(--color-text);
}

.bingo-ball__circle {
  width: clamp(120px, 22vw, 170px);
  aspect-ratio: 1;
  position: relative;
}

.bingo-ball__outer,
.bingo-ball__inner {
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
}

.bingo-ball__outer {
  width: 100%;
  height: 100%;
  background-color: var(--color-primary);
}

.bingo-ball__inner {
  width: 80%;
  height: 80%;
  margin: 10%;
  background-color: var(--color-primary-light);
}

.bingo-ball__inner span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 800;
  color: var(--color-text-inverse);
}
</style>
