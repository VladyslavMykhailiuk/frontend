<template>
    <div class="row row-cols-1 row-cols-md-3 g-4" v-if="hotels.length>0">
        <div class="col" v-for="hotel in hotels" :key="hotel.id">
            <div class="card m-3">
                <img :src="hotel.main_image" class="card-img-top" alt="Hotel Photo">
                <div class="card-body">
                    <h5 class="card-title">{{ hotel.name }}</h5>
                    <p class="card-text">{{ hotel.city }}</p>
                    <div><strong>Середня ціна за ніч:</strong> {{ hotel.average_cost }}грн</div>
                    <router-link :to="{ name: 'HotelView', params: { id: hotel.id } }" class="btn btn-danger mt-3">
                        Відкрити готель
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <h1 class="text-center text-white">Уууупссс...нічого не знайдено, введіть вірну назву</h1>
    </div>
</template>

<script>
export default {
    name: "DisplayHotels",
    props: {
        hotels: {
            type: Array,
            default: () => [],
        },
    }
};
</script>

<style scoped>
.card-img-top {
    height: 300px;
}
</style>