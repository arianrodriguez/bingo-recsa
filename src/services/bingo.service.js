import { LETTERS, LETTER_RANGES, MAX_NUMBER, BALL_COLORS } from '@/config/bingo';

/**
 * Servicio con la lógica pura del bingo (sin estado de UI).
 * Mantiene internamente el set de números ya extraídos para no repetirlos.
 */

/** Números ya cantados en la ronda actual. */
const drawnNumbers = new Set();

/** Devuelve un número aleatorio válido del bombo (1..MAX_NUMBER). */
export function randomNumber() {
  return Math.floor(Math.random() * MAX_NUMBER) + 1;
}

/** Devuelve la letra (B/I/N/G/O) a la que pertenece un número. */
export function letterForNumber(number) {
  return LETTERS.find(
    (letter) =>
      number >= LETTER_RANGES[letter][0] && number <= LETTER_RANGES[letter][1],
  );
}

/** Devuelve un par de colores { outer, inner } aleatorio para la bola. */
export function randomColorPair() {
  const [outer, inner] =
    BALL_COLORS[Math.floor(Math.random() * BALL_COLORS.length)];
  return { outer, inner };
}

/**
 * Extrae una bola que no haya salido antes.
 * @returns {number|null} el número, o null si ya no quedan disponibles.
 */
export function drawBall() {
  if (drawnNumbers.size >= MAX_NUMBER) return null;

  let number;
  do {
    number = randomNumber();
  } while (drawnNumbers.has(number));

  drawnNumbers.add(number);
  return number;
}

/**
 * Construye la secuencia animada del giro: el primer elemento es la bola real
 * y el resto son números aleatorios para el "barajado" visual.
 */
export function buildSpinSequence(finalNumber, steps = 100) {
  const sequence = [finalNumber];
  for (let i = 0; i < steps; i += 1) {
    sequence.push(randomNumber());
  }
  return sequence;
}

/** Reinicia la ronda: vuelve a permitir todos los números. */
export function resetDraw() {
  drawnNumbers.clear();
}
