/**
 * Configuración central del juego de bingo.
 * Todo lo que sea "constante de negocio" vive aquí para mantener los
 * componentes y servicios libres de números mágicos.
 */

/** Letras del bingo, en orden de columnas. */
export const LETTERS = ['B', 'I', 'N', 'G', 'O'];

/** Rango de números [min, max] que corresponde a cada letra. */
export const LETTER_RANGES = {
  B: [1, 15],
  I: [16, 30],
  N: [31, 45],
  G: [46, 60],
  O: [61, 75],
};

/** Número máximo posible en el bombo. */
export const MAX_NUMBER = 75;

/**
 * Pares de colores [exterior, interior] para pintar la bola en cada giro.
 * Son colores festivos genéricos (no de marca) que se eligen al azar.
 */
export const BALL_COLORS = [
  ['#FFBD59', '#FF9100'],
  ['#FF6F61', '#FF3D00'],
  ['#6A0572', '#A500B5'],
  ['#00B09B', '#96C93D'],
  ['#FF4E50', '#FC913A'],
  ['#FDC830', '#F37335'],
  ['#FF758F', '#FF7EB3'],
  ['#00C9FF', '#92FE9D'],
];

/**
 * Cartillas de ejemplo mostradas en el panel derecho.
 * Las imágenes se sirven desde la carpeta /public, así que basta con dejar
 * los archivos ahí con estos nombres (o editar esta lista).
 */
export const CARDS = [
  '/cartilla-1.png',
  '/cartilla-2.png',
  '/cartilla-3.png',
  '/cartilla-4.png',
  '/cartilla-5.png',
  '/cartilla-6.png',
];
