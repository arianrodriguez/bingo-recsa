import './assets/main.css'
import router from "@/router/index.js";
import {jwtDecode} from "jwt-decode";
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);
app.use(router);
app.mount('#app');

const token = localStorage.getItem('token');

if (token) {
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTime) {
            localStorage.removeItem('token');
            router.push("/iniciar-sesion");
        }
    } catch (error) {
        localStorage.removeItem('token');
        router.push("/iniciar-sesion");
    }
} else {
    router.push("/iniciar-sesion");
}
