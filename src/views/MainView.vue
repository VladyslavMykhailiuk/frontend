<template>
  <div class="container wrap text-white">
    <h1>Вітаю вас на нашому сайті!</h1>
      <h2>Скоріше обирайте готель та насолоджуйтесь райським задоволенням!</h2>
      <button><router-link to="/hotels" class="nav-link px-2 text-white">Перейти до вибору</router-link></button>
  </div>
</template>
<script setup>
</script>

<style scoped>
h1,h2 {
    margin-bottom: 25px;
}
.wrap {
    margin: 0 auto;
    margin-top: 200px;
    text-align: center;
}

button {
    background-color: crimson;
    width: 200px;
    height: 50px;
    border-radius: 12px;
}
</style>