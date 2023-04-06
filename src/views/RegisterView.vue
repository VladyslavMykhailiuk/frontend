<template>
<div>
  <section class="vh-100">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">

              <div class="mb-md-5 mt-md-4 pb-5">

                <h2 class="fw-bold mb-2 text-uppercase">Реєстрація</h2>

                <div class="form-outline form-white mb-4">
                  <input v-model="name" type="text" id="typeNameX" class="form-control form-control-lg"/>
                  <label class="form-label" for="typeNameX">Ім'я</label>
                </div>

                <div class="form-outline form-white mb-4">
                  <input v-model="email" type="email" id="typeEmailX" class="form-control form-control-lg"/>
                  <label class="form-label" for="typeEmailX">Пошта</label>
                </div>

                <div class="form-outline form-white mb-4">
                  <input v-model="password" type="password" id="typePasswordX" class="form-control form-control-lg"/>
                  <label class="form-label" for="typePasswordX">Пароль</label>
                </div>
                <div class="form-outline form-white mb-4">
                  <input v-model="password_confirmation" type="password_confirmation" id="typeConfirmPasswordX" class="form-control form-control-lg"/>
                  <label class="form-label" for="typeConfirmPasswordX">Підтвердження паролю</label>
                </div>
                <button class="btn btn-outline-light btn-lg px-5" type="submit" @click.prevent="sendCredentials">Реєстрація</button>
              </div>

              <div>
                <p class="mb-0">Вже маєте аккаунт? <router-link to="/login" class="text-white-50 fw-bold">Вхід</router-link></p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import router from "@/router/router";
import {mapActions} from "pinia";
import {useAuthStore} from "@/stores/auth";

export default {
  name: "RegisterView",

  data() {
    return {
      name:null,
      email: null,
      password: null,
      password_confirmation: null,
    }
  },

  methods: {
    ...mapActions(useAuthStore, ["registerUser"]),
    router() {
      return router
    },
    sendCredentials() {
      const userData = {
        'name':this.name,
        'email':this.email,
        'password':this.password,
        'password_confirmation':this.password_confirmation,
        'device_name' : 'desktop'
      }
      this.registerUser(userData);
    }
  },
}


</script>