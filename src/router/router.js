import { createRouter, createWebHashHistory } from "vue-router";
import MainView from "@/views/MainView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import HotelsView from "@/views/HotelsView.vue";
import HotelView from "@/views/HotelView.vue";



const routes = [
    {
        path: "/",
        component: MainView
    },
    {
        path: "/login",
        component: LoginView
    },
    {
        path: "/register",
        component: RegisterView
    },
    {
        path: "/hotels",
        component: HotelsView
    },
    {
        path: "/hotels/:id",
        name: "HotelView",
        component: HotelView,
    },

]


const router = createRouter({
    routes,
    history: createWebHashHistory(process.env.BASE_URL)
})

export default router;