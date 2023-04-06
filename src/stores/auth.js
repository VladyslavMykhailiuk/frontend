import {defineStore} from "pinia";
import AxiosInstance from "@/services/AxiosInstance";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: {},
        token: localStorage.getItem("token"),
    }),
    getters: {
        loggedIn: (state) => state.token !== null,
    },
    actions: {
        loginUser(data) {
            AxiosInstance.post('/auth/login', {
                ...data
            }).then((response) => {
                this.token = response.data.token;
                this.user= response.data.user;
                localStorage.setItem('token', this.token);
            })
        },
        logout() {
            AxiosInstance.post('/auth/logout')
                .then(() => {
                    this.user = {};
                    this.token = null;
                    localStorage.removeItem('token');
                })
        },
        registerUser(data) {
            AxiosInstance.post('/auth/register', {
                ...data
            }).then((response) => {
                this.token = response.data.token;
                this.user= response.data.user;
                localStorage.setItem('token', this.token);
            })
        },
    },
    persist: true,
})

