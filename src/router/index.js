import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import LoginView from '@/views/LoginView.vue';
import BingoView from '@/views/BingoView.vue';

const routes = [
  { path: '/', redirect: '/iniciar-sesion' },
  {
    path: '/iniciar-sesion',
    name: 'login',
    component: LoginView,
    meta: { requiresGuest: true },
  },
  {
    path: '/inicio',
    name: 'bingo',
    component: BingoView,
    meta: { requiresAuth: true },
  },
  { path: '/:pathMatch(.*)*', redirect: '/iniciar-sesion' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/** Guard de autenticación local. */
router.beforeEach((to) => {
  const isAuthenticated = store.getters.isAuthenticated;

  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'login' };
  }
  if (to.meta.requiresGuest && isAuthenticated) {
    return { name: 'bingo' };
  }
  return true;
});

export default router;
