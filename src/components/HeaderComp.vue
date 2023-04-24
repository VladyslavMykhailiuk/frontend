<template>
    <header class="p-3 bg-dark text-white">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                    <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                        <use xlink:href="#bootstrap"></use>
                    </svg>
                </a>

                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li>
                        <router-link to="/" class="nav-link px-2 text-white">Головна</router-link>
                    </li>
                    <li>
                        <router-link to="/hotels" class="nav-link px-2 text-white">Готелі</router-link>
                    </li>
                </ul>
                <div class="text-end">
                    <router-link v-if="!loggedIn" to="/login" class="btn btn-outline-light me-2">Ввійти</router-link>
                    <router-link v-if="!loggedIn" to="/register" class="btn btn-warning">Зареєструватися</router-link>
                    <div v-if="loggedIn" class="d-flex align-items-center">
                        <div class="m-2">{{ user.name }}</div>
                        <a v-if="user.role_id !== 3" class="btn btn-danger" @click="adminPanel" target="_blank">Адмін панель</a>
                        <button type="button" class="btn btn-outline-light m-2" @click.prevent="logout">Вийти</button>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
import router from "@/router/router";
import {mapActions, mapState} from "pinia";
import {useAuthStore} from "@/stores/auth";
import axiosInstance from "@/services/AxiosInstance";

export default {
    name: "HeaderComp",

    data() {
        return {}
    },
    methods: {
        ...mapActions(useAuthStore, ["logout"]),
        router() {
            return router
        },
        adminPanel() {
            axiosInstance.post('/auth/check',[], {
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                withCredentials:true
            }).then((r)=>{
                console.log(r);
                const xsrf = r.data['x-xsrf-token'];
                console.log(xsrf);
                window.open(`http://localhost:85/admin?_sp_token=${localStorage.getItem('token')}&xsrf=${xsrf}`);
            })
        }
    },
    computed: {
        ...mapState(useAuthStore, ["loggedIn", "user", "token"])
    },
}

</script>
