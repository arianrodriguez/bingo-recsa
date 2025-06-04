import {createRouter, createWebHistory} from "vue-router";
import AuthenticationView from "@/views/AuthenticationView.vue";
import BingoView from "@/views/BingoView.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/", redirect: "/iniciar-sesion"},
        {path: "/iniciar-sesion", component: AuthenticationView},
        {path: "/inicio", component: BingoView},
        {path:"/:pathMatch(.*)*", redirect: "/iniciar-sesion"}
    ]
});

export default router;