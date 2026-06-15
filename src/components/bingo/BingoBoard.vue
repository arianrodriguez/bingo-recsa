<script>
import {
  drawBall,
  buildSpinSequence,
  randomColorPair,
  letterForNumber,
  resetDraw,
} from '@/services/bingo.service';
import { LETTERS, CARDS } from '@/config/bingo';
import BingoBall from '@/components/bingo/BingoBall.vue';
import BallWinnerModal from '@/components/bingo/BallWinnerModal.vue';
import InfoModal from '@/components/bingo/InfoModal.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseSpinner from '@/components/base/BaseSpinner.vue';

/** Estado inicial de filas por columna (2 = primera fila utilizable). */
const initialRowCounts = () => ({
  1: 2, 2: 2, 3: 2, 4: 2, 5: 2,
  6: 2, 7: 2, 8: 2, 9: 2, 10: 2,
});

export default {
  name: 'BingoBoard',
  components: {
    BingoBall,
    BallWinnerModal,
    InfoModal,
    BaseButton,
    BaseSpinner,
  },
  data() {
    return {
      letter: 'B',
      number: '?',
      lastNumber: null,
      outerColor: 'var(--color-primary)',
      innerColor: 'var(--color-primary-light)',

      isSpinning: false,
      showBallWinner: false,
      showInfo: false,
      infoTitle: '',
      infoDetail: '',

      items: [],
      rowCounts: initialRowCounts(),
      // Cada letra ocupa 2 columnas de la cartilla grande.
      columnsByLetter: {
        B1: 1, B2: 2,
        I1: 3, I2: 4,
        N1: 5, N2: 6,
        G1: 7, G2: 8,
        O1: 9, O2: 10,
      },

      cards: CARDS,
      cardIndex: 0,
    };
  },
  computed: {
    cardStyle() {
      return { backgroundImage: `url(${this.cards[this.cardIndex]})` };
    },
  },
  methods: {
    /** Inicia el giro: extrae una bola y anima el barajado hasta el resultado. */
    spin() {
      if (this.showInfo || this.isSpinning) return;

      const ball = drawBall();
      if (ball === null) {
        this.openNoNumbersInfo();
        return;
      }

      const sequence = buildSpinSequence(ball);
      this.isSpinning = true;

      let index = 0;
      let letterIndex = 0;

      const interval = setInterval(() => {
        this.number = sequence[index];
        this.letter = LETTERS[letterIndex];

        const { outer, inner } = randomColorPair();
        this.outerColor = outer;
        this.innerColor = inner;

        index += 1;
        letterIndex = (letterIndex + 1) % LETTERS.length;

        if (index >= sequence.length) {
          clearInterval(interval);
          this.number = sequence[0];
          this.lastNumber = sequence[0];
          this.letter = letterForNumber(sequence[0]);
          this.registerBall();
          this.isSpinning = false;
          this.showBallWinner = true;
        }
      }, 10);
    },

    /** Registra la bola extraída en la cartilla grande. */
    registerBall() {
      let column = this.columnsByLetter[`${this.letter}1`];
      if (this.rowCounts[column] >= 10) {
        column = this.columnsByLetter[`${this.letter}2`];
      }

      this.items.push({
        id: parseInt(this.number, 10),
        row: this.rowCounts[column],
        column,
        content: this.number,
        className: column % 2 === 1 ? 'sub1' : 'sub2',
      });

      this.rowCounts[column] += 1;
    },

    gridStyle(item) {
      const isWinner = this.lastNumber === item.content;
      return {
        gridColumn: `${item.column} / span 1`,
        gridRow: `${item.row} / span 1`,
        color: isWinner ? 'var(--color-text-inverse)' : 'var(--color-text)',
        fontWeight: isWinner ? '700' : '300',
        backgroundColor: isWinner ? 'var(--color-accent)' : 'transparent',
        padding: isWinner ? '0 0.5rem' : '0',
        borderRadius: isWinner ? 'var(--radius-sm)' : '0',
      };
    },

    moveCard() {
      this.cardIndex = (this.cardIndex + 1) % this.cards.length;
    },

    reset() {
      this.showInfo = false;
      this.items = [];
      this.number = '?';
      this.lastNumber = null;
      this.rowCounts = initialRowCounts();
      this.isSpinning = false;
      resetDraw();
    },

    openNoNumbersInfo() {
      this.isSpinning = false;
      this.number = '-';
      this.infoTitle = 'No hay más números';
      this.infoDetail =
        'No hay más números disponibles para girar, por favor restablezca los números para continuar.';
      this.showInfo = true;
    },
  },
};
</script>

<template>
  <section class="board">
    <BallWinnerModal
      v-if="showBallWinner"
      :letter="letter"
      :number="number"
      :outer-color="outerColor"
      :inner-color="innerColor"
      @close="showBallWinner = false"
    />

    <InfoModal
      v-if="showInfo"
      :title="infoTitle"
      :detail="infoDetail"
      @close="showInfo = false"
    />

    <div class="board__content">
      <!-- Panel: bola actual -->
      <div class="board__panel">
        <div class="board__card flex">
          <BingoBall
            :letter="letter"
            :number="number"
            :outer-color="outerColor"
            :inner-color="innerColor"
          />
        </div>
        <BaseSpinner v-if="isSpinning" />
        <BaseButton
          v-else
          label="girar"
          :disabled="showInfo"
          @click="spin"
        />
      </div>

      <!-- Panel: cartilla grande de números cantados -->
      <div class="board__panel board__panel--wide">
        <div class="board__card megacard">
          <div class="megacard__grid">
            <p
              v-for="l in ['B', 'I', 'N', 'G', 'O']"
              :key="l"
              class="megacard__header"
            >
              {{ l }}
            </p>
            <div
              v-for="item in items"
              :key="item.id"
              class="megacard__cell"
              :style="gridStyle(item)"
            >
              {{ item.content }}
            </div>
          </div>
        </div>
        <BaseButton label="restablecer" variant="light" @click="reset" />
      </div>

      <!-- Panel: cartilla de ejemplo -->
      <div class="board__panel">
        <div class="board__card board__card--image" :style="cardStyle"></div>
        <BaseButton label="mover cartilla" @click="moveCard" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.board {
  width: 100%;
  height: 100%;
}

.board__content {
  display: flex;
  gap: 1.5rem;
  padding: 0.5rem;
  height: 100%;
}

.board__panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 0;
  min-height: 0;
}

.board__panel--wide {
  flex: 2;
}

.board__card {
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  min-height: 0;
  padding: 1rem;
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  overflow: hidden;
}

.board__card--image {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
}

/* ---- Cartilla grande ---- */
.megacard {
  padding-top: 1.5rem;
  font-weight: 700;
  overflow: auto;
}

.megacard__grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(8, minmax(25px, 1fr));
  justify-items: center;
  align-items: center;
  text-align: center;
  row-gap: 1rem;
  position: relative;
  height: 100%;
  min-width: 480px;
}

/* Líneas verticales que separan los bloques B/I/N/G/O */
.megacard__grid::before {
  content: '';
  position: absolute;
  top: 0;
  left: 20%;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(to right, #000 1px, transparent 1px);
  background-size: calc(100% / 4) 100%;
  pointer-events: none;
}

.megacard__header {
  grid-column: span 2;
  grid-row: 1;
  width: 75px;
  padding: 0.6rem 0;
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
  border-radius: var(--radius-sm);
  font-size: 2rem;
  font-weight: 700;
  line-height: 20px;
  text-align: center;
}

.megacard__cell {
  font-size: 2rem;
  font-weight: 300;
}

.megacard__cell.sub1 {
  grid-row: span 8;
}

.megacard__cell.sub2 {
  grid-row: span 7;
}

/* ---- Responsive ---- */
@media screen and (max-width: 1050px) {
  .board__content {
    flex-direction: column;
    gap: 2.5rem;
    height: auto;
    padding: 0.5rem 0.5rem 2rem;
  }

  .board__panel,
  .board__panel--wide {
    flex: none;
  }

  .board__card {
    overflow: visible;
  }

  .megacard {
    min-height: 360px;
  }

  .board__card--image {
    width: 100%;
    aspect-ratio: 3 / 4;
  }
}

@media screen and (max-width: 480px) {
  .megacard__header {
    width: 100%;
    font-size: 1.4rem;
  }

  .megacard__cell {
    font-size: 1.4rem;
  }
}
</style>
