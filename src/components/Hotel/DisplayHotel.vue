<template>
  <div>
      <h2 class="fw-bold text-center mt-4">{{ hotel.name }}</h2>
      <p class="fs-4 text-center">{{ hotel.city }}</p>
      <div class="d-flex">
          <div class="col-md-4 mb-4 m-5" v-for="image in hotel.images" :key="image.id" >
              <img :src="image" alt="Hotel Photo" class="img-fluid rounded">
          </div>
      </div>
      <p class="fs-5">{{ hotel.description }}</p>
      <p class="fs-5">Адреса: {{ hotel.address }}</p>
      <p class="fs-5">Кількість зірок: {{ hotel.stars }}</p>
      <p class="fs-5">Середня ціна за ніч: {{ hotel.average_cost }}</p>
  </div>
</template>

<script>
export default {
    name: "DisplayHotel",
    props: {
        hotel: {
            type: Object,
            default: () => {},
        },
    }
};
</script>