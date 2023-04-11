<template>
    <div class="input-group m-5 d-flex flex-column justify-content-center align-items-center">
        <input v-model="searchQuery" type="search" class="form-control rounded input" placeholder="Пошук за назвою..." aria-label="Search" aria-describedby="search-addon" @input="handleSearch" />
    </div>
    <div class="row row-cols-1 row-cols-md-3 g-4" v-if="hotels.length>0">
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
    <div v-else>
        <h1 class="text-center text-white">Уууупссс...нічого не знайдено, введіть вірну назву</h1>
    </div>
</template>

<script>
import AxiosInstance from "@/services/AxiosInstance";

export default {
    name: "HotelsView",

    data() {
        return {
hotels:[],
            searchQuery: '',
        }
    },

    methods: {
        getHotels() {
            AxiosInstance.get('/hotels', {
                params: {
                    search: this.searchQuery,
                }
            }).then((response) => {
                this.hotels = response.data.data;
            })
        },
        handleSearch() {
            this.getHotels();
        }
    },
    mounted() {
        this.getHotels();
    }
}


</script>

<style scoped>
.card-img-top {
    height: 300px;
}

.input {
    width: 85% !important;
}
</style>