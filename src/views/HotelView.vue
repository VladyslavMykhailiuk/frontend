<template>
    <div class="container">
        <display-hotel :hotel="hotel"/>
        <h1 class="mt-5 text-center">Фільтр:</h1>
        <div class="input-group m-5 d-flex flex-column justify-content-center align-items-center">
            <input v-model="countPersons" type="number" class=" mt-4 form-control rounded input" placeholder="К-сть персон..." @input="handleFilter"/>
            <input v-model="arrival_date" type="date" class=" mt-4 form-control rounded input" placeholder="Дата заїзду..." @input="handleFilter"/>
            <input v-model="departure_day" type="date" class=" mt-4 form-control rounded input" placeholder="Дата виїзду..." @input="handleFilter"/>
            <select v-model="sort" class="form-select input mt-5" aria-label="Default select example" @change="handleFilter">
                <option value="" disabled selected>Оберіть метод сортування за ціною</option>
                <option value="asc">за зростанням</option>
                <option value="desc">За спаданням</option>
            </select>
        </div>
        <display-rooms @modal-change="showModal = $event" @room-change="selectedRoom = $event" :rooms="rooms"></display-rooms>
        <h1 class="mt-5 text-center">Коментарі:</h1>
        <div v-if="hotelComments.length > 0">
            <div class="position-relative card mb-3 mt-5 text-black" v-for="hotelComment in hotelComments" :key="hotelComment.id">
                <div class="row g-0">
                    <div class="col-md-12">
                        <div class="card-body">
                            <div>{{ hotelComment.description }}</div>
                            <div style="position: absolute;left: 0;bottom: 0"><strong>{{hotelComment.username}}</strong></div>
                            <div style="position: absolute;bottom: 0;right: 0">
                                <button class="btn btn-danger m-2" @click="showSecondModal = true;showComment(hotelComment.id);">Редагувати коментар</button>
                                <button class="btn btn-danger  m-2" @click="deleteComment(hotelComment.id)">Видалити коментар</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-5 text-center" v-else>
            <h2>Ууууууппсс... пока порожньо, будьте першим!</h2>
        </div>
        <form class="d-flex justify-content-center align-items-center">
            <textarea v-model="comment" style="width: 100%;height: 50px" name="comment" id="" cols="30" rows="10"></textarea>
            <button type="submit" class="btn btn-danger m-2" @click.prevent="addComment">Додати коментар</button>
        </form>
    </div>
    <modal-comp v-if="showModal" @close="showModal = false" @reserve="reserve" :title="`Бронювання готелю`" :confirmButton="`Забронювати`">
        <form>
            <div v-if="selectedRoom">
                <p><strong>Кімната:</strong> {{ selectedRoom.name }}</p>
                <p><strong>Клас:</strong> {{ selectedRoom.class }}</p>
                <p><strong>Кількість персон:</strong> {{ selectedRoom.persons }}</p>
                <p><strong>Дата заїзду:</strong> {{ selectedRoom.arrival_date }}</p>
                <p><strong>Дата виїзду:</strong> {{ selectedRoom.departure_day }}</p>
                <p><strong>Ціна:</strong> {{ selectedRoom.price }}грн</p>
            </div>
            <input v-model="personName" type="text" class=" mt-4 form-control rounded input" placeholder="Ім'я..."/>
            <input v-model="personEmail" type="email" class=" mt-4 form-control rounded input" placeholder="Пошта..."/>
        </form>
    </modal-comp>
    <modal-comp v-if="showSecondModal" @close="showSecondModal = false" :title="`Редагування коментарю`"  :confirmButton="`Редагувати`" @updateComment="updateComment(hotelCommentId)">
        <input v-model="commentInfo" type="text" class=" mt-4 form-control rounded input">
    </modal-comp>
    <div class="d-flex justify-content-center align-items-center">
        <button class="btn btn-danger m-2" @click="downloadPDF">Згенерувати PDF</button>
    </div>
</template>

<script>
import AxiosInstance from "@/services/AxiosInstance";
import ModalComp from "@/components/ModalComp.vue";
import axiosInstance from "@/services/AxiosInstance";
import router from "@/router/router";
import Swal from 'sweetalert2';
import {mapState} from "pinia";
import {useAuthStore} from "@/stores/auth";
import Pusher from "pusher-js";
import DisplayHotel from "@/components/Hotel/DisplayHotel.vue";
import DisplayRooms from "@/components/Hotel/DisplayRooms.vue";

export default {
    name: "HotelView",
    components: {DisplayRooms, DisplayHotel, ModalComp},

    data() {
        return {
            hotel: {},
            rooms: [],
            comment:null,
            hotelComments: [],
            showModal:false,
            showSecondModal:false,
            countPersons: null,
            arrival_date: null,
            departure_day: null,
            sort:'',
            personName: null,
            personEmail: null,
            selectedRoom: null,
            commentInfo:'',
            hotelCommentId:null,
            hotelCommentUserId:null,
            hotelCommentHotelId:null,
        };
    },

    methods: {
        getHotel(id) {
            AxiosInstance.get(`/hotels/${id}`).then((response) => {
                this.hotel = response.data.data;
            });
        },
        getRooms(id) {
            const params = {};

            if (this.countPersons !== '') {
                params.persons = this.countPersons;
            }

            if (this.arrival_date !== '') {
                params.arrival_date = this.arrival_date;
            }

            if (this.departure_day !== '') {
                params.departure_day = this.departure_day;
            }

            if (this.sort !== '') {
                params.sort = this.sort;
            }

            AxiosInstance.get(`/hotels/${id}/rooms`, {
                params: params
            })
                .then((response) => {
                    this.rooms = response.data.data;
                })
                .catch(() => {
                });
        },
        getHotelComments(id) {
            AxiosInstance.get(`/hotels/${id}/hotelComments`)
                .then((response) => {
                    this.hotelComments = response.data.data;
                })
                .catch(() => {
                });
        },
        handleFilter() {
            const id = this.$route.params.id;
            this.getRooms(id);
        },
        reserve() {
            const data = {
                room_id: this.selectedRoom.id,
                name: this.personName,
                email: this.personEmail,
            };

            axiosInstance.post('/reserve-room', data)
                .then(() => {
                    AxiosInstance.post('/add-reservation',{
                        hotel_id:this.selectedRoom.hotel_id,
                        name:this.selectedRoom.name,
                        class:this.selectedRoom.class,
                        persons:this.selectedRoom.persons,
                        price:this.selectedRoom.price,
                        arrival_date:this.selectedRoom.arrival_date,
                        departure_day:this.selectedRoom.departure_day,
                    }).then(()=>{
                    })
                    this.showModal = false;
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Готель заброньовано!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    router.push('/hotels')
                })
                .catch(() => {
                });
        },
        addComment() {
            if(Object.keys(this.user).length !== 0) {
                axiosInstance.post('/addComment', {
                    hotel_id: this.$route.params.id,
                    description: this.comment,
                    user_id: this.user.id,
                }).then(() => {
                    this.getHotelComments(this.$route.params.id);
                    this.comment = '';
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Коментар додано!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
            }
            else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Ви неавторизовані!',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.showSecondModal = false;
            }
        },
        showComment(commentId) {
            axiosInstance.get(`/hotelComments/${commentId}`)
                .then((response) => {
                    console.log(response);
                    this.commentInfo = response.data.data.description;
                    this.hotelCommentId = response.data.data.id;
                    this.hotelCommentUserId = response.data.data.user_id;
                    this.hotelCommentHotelId = response.data.data.hotel_id;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        updateComment(commentId){
            if(Object.keys(this.user).length !== 0 && (this.user.id === this.hotelCommentUserId || this.user.role_id !== 3)) {
                axiosInstance.put(`/hotelComments/${commentId}`, {
                    hotel_id: this.hotelCommentHotelId,
                    description: this.commentInfo,
                    user_id: this.hotelCommentUserId,
                }).then(() => {
                    this.getHotelComments(this.$route.params.id);
                    this.showSecondModal = false;
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Коментар відредаговано!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
            }
            else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Ви або неавторизовані або хочете редагувати чужий коментар!',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.showSecondModal = false;
            }
        },

        deleteComment(commentId){
            axiosInstance.get(`/hotelComments/${commentId}`)
                .then((response) => {
                    this.hotelCommentUserId = response.data.data.user_id;
                })
                Swal.fire({
                    title: 'Ви впевнені?',
                    text: "Ви не зможете скасувати це!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Так, видалити коментар!'
                }).then((result) => {
                    if (result.isConfirmed && (Object.keys(this.user).length !== 0 && (this.user.id === this.hotelCommentUserId || this.user.role_id !== 3))){
                        axiosInstance.delete(`/hotelComments/${commentId}`).then(() => {
                            this.getHotelComments(this.$route.params.id);
                            Swal.fire(
                                'Видалено!',
                                'Ваш коментар успішно видалено.',
                                'success'
                            )
                        })
                    }
                    else {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Ви або неавторизовані або хочете видалити чужий коментар!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        this.showSecondModal = false;
                    }
                })
        },
        downloadPDF() {
            axiosInstance.get(`/pdf-download/${this.$route.params.id}`)
                .then(() => {
                    const pusher = new Pusher('82615ddfc1722620e052', {
                        cluster: 'eu',
                        useTLS: true
                    });

                    const channel = pusher.subscribe('mint-salute-672');
                    channel.bind('pdf-ready', data => {
                        window.open(data.url, '_blank');
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        }

    },
    computed: {
        ...mapState(useAuthStore, ["user"])
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

.input {
    width: 85% !important;
}

</style>