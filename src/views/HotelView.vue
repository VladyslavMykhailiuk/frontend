<template>
    <div class="container">
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
        <h1 class="mt-5 text-center">Коментарі щодо готелю:</h1>
        <div v-if="hotelComments.length > 0">
            <div class="card mb-3 mt-5 text-black" v-for="hotelComment in hotelComments" :key="hotelComment.id">
                <div class="row g-0">
                    <div class="col-md-12">
                        <div class="card-body">
                            <div>{{ hotelComment.description }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-5 text-center" v-else>
            <h2>Ууууууппсс... пока порожньо, будьте першим!</h2>
        </div>
        <h1 class="mt-5 text-center">Кімнати:</h1>
        <div v-if="rooms.length > 0">
            <div class="card mb-3 mt-5 text-black" v-for="room in rooms" :key="room.id">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img :src="room.main_image" class=" p-3 img-fluid rounded-start" alt="Room Photo">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">{{ room.name }}</h5>
                            <p class="card-text">{{ room.description }}</p>
                            <div><strong>Клас:</strong> {{ room.class }}</div>
                            <div><strong>Кількість персон:</strong> {{ room.persons }}</div>
                            <div><strong>Дата заїзду:</strong> {{ room.arrival_date }}</div>
                            <div><strong>Дата виїзду:</strong> {{ room.departure_day }}</div>
                            <div><strong>Ціна:</strong> {{ room.price }}грн</div>
                            <button class="btn btn-danger mt-3" @click="showModal = true">Забронювати номер</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-5 text-center" v-else>
            <h2>Ууууууппсс... пока порожньо, скоро щось з'явиться!</h2>
        </div>
    </div>
    <modal-comp v-if="showModal" @close="showModal = false">
        Something
    </modal-comp>
</template>

<script>
import AxiosInstance from "@/services/AxiosInstance";
import ModalComp from "@/components/ModalComp.vue";

export default {
    name: "HotelView",
    components: {ModalComp},

    data() {
        return {
            hotel: {},
            rooms: [],
            hotelComments: [],
            showModal:false,
        };
    },

    methods: {
        getHotel(id) {
            AxiosInstance.get(`/hotels/${id}`).then((response) => {
                this.hotel = response.data.data;
            });
        },
        getRooms(id) {
            AxiosInstance.get(`/hotels/${id}/rooms`)
                .then((response) => {
                    this.rooms = response.data.data;
                    console.log(this.rooms);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getHotelComments(id) {
            AxiosInstance.get(`/hotels/${id}/hotelComments`)
                .then((response) => {
                    this.hotelComments = response.data.data;
                    console.log(this.hotelComments);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },

    mounted() {
        const id = this.$route.params.id;
        this.getHotel(id);
        this.getRooms(id);
        this.getHotelComments(id);
    },
};
</script>

<style scoped>
.container {
    color: #fff;
}

.card {
    min-height: 200px !important;
}

.img-fluid {
    height: 100%;
}

</style>