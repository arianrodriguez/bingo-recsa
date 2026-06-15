<script>
import BingoBoard from '@/components/bingo/BingoBoard.vue';

export default {
  name: 'BingoView',
  components: { BingoBoard },
};
</script>

<template>
  <section class="bingo">
    <img src="/recsa.png" alt="recsa" class="bingo__brand" />

    <header class="bingo__header">
      <img src="/bingo-logo.png" alt="Bingo" class="bingo__logo" />
    </header>

    <BingoBoard class="bingo__board" />
  </section>
</template>

<style scoped>
.bingo {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  overflow: hidden;
}

/* Logo recsa: esquina superior derecha */
.bingo__brand {
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
  width: min(120px, 18vw);
  user-select: none;
  z-index: 2;
}

/* Logo BINGO: centrado arriba */
.bingo__header {
  display: flex;
  justify-content: center;
  flex-shrink: 0;
}

.bingo__logo {
  height: clamp(80px, 15vh, 150px);
  width: auto;
  max-width: 90vw;
  object-fit: contain;
  user-select: none;
}

.bingo__board {
  flex: 1;
  width: 100%;
  min-height: 0;
}

/* En móvil/tablet se permite scroll y el contenido se apila */
@media screen and (max-width: 1050px) {
  .bingo {
    height: auto;
    min-height: 100vh;
    overflow: visible;
    padding-top: 1rem;
  }

  .bingo__brand {
    width: 80px;
    top: 1rem;
    right: 1rem;
  }

  .bingo__logo {
    height: 90px;
  }
}
</style>
