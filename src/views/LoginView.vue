<script>
import Swal from 'sweetalert2';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseSpinner from '@/components/base/BaseSpinner.vue';

const ADMIN_USER = 'admin';
// Credenciales locales. Se puede sobreescribir la contraseña con VITE_PASSWORD,
// pero siempre hay un valor por defecto para que el acceso funcione sin
// configuración adicional (autenticación local sencilla).
const ADMIN_PASSWORD = import.meta.env.VITE_PASSWORD || '123';
const TEXT_SANITIZER = /[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s$]/g;

export default {
  name: 'LoginView',
  components: { BaseInput, BaseButton, BaseSpinner },
  data() {
    return {
      isSubmitting: false,
      form: {
        username: '',
        password: '',
      },
    };
  },
  watch: {
    'form.username'(value) {
      this.form.username = value.replace(TEXT_SANITIZER, '');
    },
    'form.password'(value) {
      this.form.password = value.replace(TEXT_SANITIZER, '');
    },
  },
  methods: {
    async onSubmit() {
      if (!this.form.username || !this.form.password) {
        await this.alert('Los campos son obligatorios');
        return;
      }

      const isValid =
        this.form.username === ADMIN_USER &&
        this.form.password === ADMIN_PASSWORD;

      if (!isValid) {
        await this.alert('Las credenciales no son válidas');
        return;
      }

      // Sesión local persistente: queda guardada en localStorage y no expira.
      this.$store.commit('setToken', ADMIN_PASSWORD);
      this.$router.push({ name: 'bingo' });
    },
    alert(text) {
      return Swal.fire({ title: '¡Alerta!', text, icon: 'warning' });
    },
  },
};
</script>

<template>
  <main class="login flex">
    <img src="/recsa.png" alt="recsa" class="login__logo" />

    <form class="login__card flex" @submit.prevent="onSubmit">
      <BaseInput
        v-model="form.username"
        type="text"
        placeholder="Usuario"
      />
      <BaseInput
        v-model="form.password"
        type="password"
        placeholder="Contraseña"
      />

      <BaseSpinner v-if="isSubmitting" />
      <BaseButton v-else type="submit" label="Ingresar" />
    </form>
  </main>
</template>

<style scoped>
.login {
  flex-direction: column;
  gap: 2.5rem;
  min-height: 100vh;
  padding: 2rem 1rem;
}

.login__logo {
  width: min(260px, 60vw);
  user-select: none;
}

.login__card {
  flex-direction: column;
  gap: 2rem;
  width: min(420px, 90vw);
  padding: 2.5rem;
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-soft);
}
</style>
