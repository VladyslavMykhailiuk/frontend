<template>
  <section class="vh-100">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">

              <form class="mb-md-5 mt-md-4 pb-5">

                <h2 class="fw-bold mb-2 text-uppercase">Вхід</h2>
                <p class="text-white-50 mb-5">Будь ласка введіть вашу пошту та пароль!</p>

                <div class="form-outline form-white mb-4">
                    <label class="form-label" for="typeEmailX">Пошта</label>
                  <input  v-model="email" type="email" id="typeEmailX" class="form-control form-control-lg"  @input="validateEmail"/>
                    <span class="text-danger">{{ emailError }}</span>
                </div>

                <div class="form-outline form-white mb-4">
                    <label class="form-label" for="typePasswordX">Пароль</label>
                  <input v-model="password" type="password" id="typePasswordX" class="form-control form-control-lg" @input="validatePassword"/>
                    <span class="text-danger">{{ passwordError }}</span>
                </div>
                <button class="btn btn-outline-light btn-lg px-5" type="submit" @click.prevent="sendCredentials">Ввійти</button>
              </form>

              <div>
                <p class="mb-0">Ще не маєте аккаунту? <router-link to="/register" class="text-white-50 fw-bold">Реєстрація</router-link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import router from "@/router/router";
import {useAuthStore} from "@/stores/auth";
import {mapActions} from "pinia";

export default {
  name: "LoginView",

  data() {
    return {
      email: null,
      password: null,
        emailError: null,
        passwordError: null
    }
  },

  methods: {
    ...mapActions(useAuthStore, ["loginUser"]),
    router() {
      return router
    },
      validateEmail() {
          if (!this.email) {
              this.emailError = 'Ви нічого не ввели';
          } else if (!/\S+@\S+\.\S+/.test(this.email)) {
              this.emailError = 'Ввели некоректну пошту';
          } else {
              this.emailError = null;
          }
      },
      validatePassword() {
          if (!this.password) {
              this.passwordError = 'Введіть ваш пароль';
          } else {
              this.passwordError = null;
          }
      },
    sendCredentials() {
        this.validateEmail();
        this.validatePassword();
        if (!this.emailError && !this.passwordError) {
            const userData = {
                'email': this.email,
                'password': this.password,
                'device_name': 'desktop'
            }
            this.loginUser(userData)
        }
    }
  },
}

</script>


<style>

</style>