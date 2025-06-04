<script>
import Input from "@/components/Input.vue";
import AuthenticateService from "@/services/authenticate.service.js";
import Swal from "sweetalert2";
import SpinnerComponent from "@/components/SpinnerComponent.vue";
import store from "@/store/index.js";
import router from "@/router/index.js";

export default {
  name: "LoginComponent",
  data() {
    return {
      showSpinner: false,
      user: {
        username: "",
        password: ""
      },
      authenticateService: new AuthenticateService()
    }
  },
  components: {
    SpinnerComponent,
    Input
  },
  methods: {
    onSubmit: async function() {
      if (!this.user.username || !this.user.password) {
        await Swal.fire({
          title: '¡Alerta!',
          text: 'Los campos son obligatorios',
          icon: 'warning'
        });
        return;
      }

      const password = process.env.VITE_PASSWORD;
      if(!password) {
        await Swal.fire({
          title: '¡Alerta!',
          text: 'No se ha configurado la contraseña',
          icon: 'warning'
        });
        return;
      }

      if(this.user.username === "admin" && this.user.password === password.replace(/"/g, "")) {
        store.commit('setToken', password);
        await router.push("/inicio")
      }else {
        await Swal.fire({
          title: '¡Alerta!',
          text: 'Las credenciales no son válidas',
          icon: 'warning'
        });
      }
    },
    obtainUser: function(text) {
      text = text.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]/g, '');
      this.user.username = text;
    },
    obtainPassword: function(text) {
      text = text.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s$]/g, '');
      this.user.password = text;
    }
  }
}
</script>

<template>
  <img src="/logo-OTP-Blanco.png" alt="Logo OTP" class="logo">
  <div class="container flex">
    <img src="/otp-hombre.png" alt="OTP" class="otp-man"/>
    <div class="bingo-header flex">
      <img src="/src/assets/img/bingo-logo.png" alt="Bingo">
    </div>
    
    <form class="login__content flex" @submit.prevent="onSubmit">

      <Input type="text" placeholder="Usuario" :login="true" @valueText="obtainUser" />
      <Input type="password" placeholder="Contraseña" :login="true" @valueText="obtainPassword" />
      
      <div class="button" v-if="!showSpinner">
        <button class="button__content" type="submit">Ingresar</button>
      </div>
      
      <div class="container-spinner" v-if="showSpinner">
        <SpinnerComponent />
      </div>
    </form>
  </div>
  
  <div class="bg-map"></div>
</template>

<style scoped>

.logo {
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
}

.bg-map {
  background-image: url("/src/assets/img/map.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  mix-blend-mode:soft-light;
}

.otp-man {
  position: absolute;
  left: 17%;
  bottom: 0%;
  width: 20%; 
}

.bingo-header img {
  width: 70%;
  user-select: none;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  height: 100vh;
  flex-direction: column;
  position: relative;

}

.login__content {
  flex-direction: column;
  gap: 2rem;
  background-color: #fff;
  padding: 2rem 3rem;
  height: 50vh;
  width: 30%;
  border-radius: .5rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, .2);
}

.button {
  background-color: #222222;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
  transition: all .3s ease-in-out;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
  width: 80%;
  user-select: none;
}

.button__content {
  background: none;
  border: none;
  padding: .8rem 1rem;
  font: inherit;
  color: inherit;
  font-weight: lighter;
  width: 100%;
  text-align: center;
  cursor: pointer;
}

@media screen and (max-width: 1020px) {
  .button {
    margin-bottom: 5rem;
  }
}
</style>