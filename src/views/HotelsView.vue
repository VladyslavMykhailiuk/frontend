<template>
    <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col" v-for="hotel in hotels" :key="hotel.id">
            <div class="card m-3" >
                <img :src="hotel.main_image" class="card-img-top" alt="Hotel Photo">
                <div class="card-body">
                    <h5 class="card-title">{{hotel.name}}</h5>
                    <p class="card-text">{{hotel.city}}</p>
                    <div><strong>Середня ціна за ніч:</strong> {{ hotel.average_cost }}грн</div>
                    <router-link :to="{ name: 'HotelView', params: { id: hotel.id } }" class="btn btn-danger mt-3">Відкрити готель</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AxiosInstance from "@/services/AxiosInstance";

export default {
    name: "HotelsView",

    data() {
        return {
hotels:[],
        }
    },

    methods: {
       getHotels() {
           AxiosInstance.get('/hotels').then((response)=>{
               this.hotels = response.data.data;
           })
       }
    },
    mounted() {
        this.getHotels();
    }
}


</script>

<style>
.card-img-top {
    height: 300px;
}
</style>