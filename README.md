# Bingo recsa

Aplicación de bingo en vivo (Vue 3 + Vite) con autenticación local sencilla.

## Estructura del proyecto

```
public/
  fondo-recsa.png        # fondo global de la app
  recsa.png              # logo (esquina derecha del bingo / login)
  cartilla-recsa-*.png   # cartillas de ejemplo del panel derecho (opcional)
src/
  assets/styles/         # estilos globales + paleta de marca (variables CSS)
  components/
    base/                # UI reutilizable: BaseButton, BaseInput, BaseSpinner
    bingo/               # dominio: BingoBoard, BingoBall, BallWinnerModal, InfoModal
  config/                # constantes del juego (rangos, colores, cartillas)
  services/              # lógica pura del bingo (sin estado de UI)
  router/                # rutas + guard de autenticación
  store/                 # estado de sesión (Vuex)
  views/                 # páginas: LoginView, BingoView
```

La paleta de marca está centralizada en `src/assets/styles/main.css` (variables
`--color-*`). Cambiar esos valores reestiliza toda la app.

## Cartillas de ejemplo

El botón **"mover cartilla"** rota entre 6 cartillas servidas desde `/public`.
Deja tus 6 imágenes con estos nombres (o edita la lista en `src/config/bingo.js`):

```
public/cartilla-recsa-1.png … cartilla-recsa-6.png
```

## Configuración

El ingreso usa el usuario fijo `admin` y la contraseña `123` por defecto.
La sesión se guarda en `localStorage` y no expira.

Para cambiar la contraseña, crea un archivo `.env` (ver `.env.example`):

```
VITE_PASSWORD=tu-contraseña
```

## Desarrollo

```sh
npm install
npm run dev
```

## Build de producción

```sh
npm run build
npm run preview
```

## Despliegue en Vercel

1. Importa el repositorio en Vercel (detecta Vite automáticamente).
2. Build command: `npm run build` — Output directory: `dist`.
3. En **Settings → Environment Variables** agrega `VITE_PASSWORD`.
4. El `vercel.json` incluye el rewrite SPA para que las rutas de Vue Router
   funcionen en recargas/enlaces directos.
