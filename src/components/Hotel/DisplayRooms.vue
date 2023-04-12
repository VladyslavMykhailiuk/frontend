<template>
    <div>
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
                            <button class="btn btn-danger mt-3" @click="emitModalChange(true) ; emitRoomChange(room)">Забронювати номер</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-5 text-center" v-else>
            <h2>Ууууууппсс... пока порожньо, скоро щось з'явиться!</h2>
        </div>
    </div>
</template>

<script>
export default {
    name: "DisplayRooms",
    props: {
        rooms: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        emitModalChange(showModal) {
            this.$emit("modal-change", showModal);
        },
        emitRoomChange(selectedRoom) {
            this.$emit("room-change", selectedRoom);
        }
    }
};
</script>