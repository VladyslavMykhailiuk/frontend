<template>
    <hotels-search :per-page="perPage" @search="handleSearch"/>
    <display-hotels :hotels="displayedHotels"/>
    <pagination-comp :current-page="currentPage" :page-count="pageCount" :total-pages="totalPages"
                     @page-change="currentPage = $event"/>
</template>

<script>
import AxiosInstance from "@/services/AxiosInstance";
import PaginationComp from "@/components/Hotels/PaginationComp.vue";
import HotelsSearch from "@/components/Hotels/HotelsSearch.vue";
import DisplayHotels from "@/components/Hotels/DisplayHotels.vue";

export default {
    name: "HotelsView",
    components: {DisplayHotels, HotelsSearch, PaginationComp},
    data() {
        return {
            hotels: [],
            searchQuery: '',
            currentPage: 1,
            perPage: 10,
            displayedHotels: [],
            totalPages: 0,
        }
    },
    methods: {
        getHotels() {
            AxiosInstance.get("/hotels", {
                params: {
                    search: this.searchQuery,
                    perPage: this.perPage,
                    page: this.currentPage,
                },
            }).then((response) => {
                this.hotels = response.data.data;
                this.displayedHotels = this.hotels;
                this.totalPages = response.data.pagination.totalPages;
            });
        },
        handleSearch(query, page, perPage) {
            this.searchQuery = query;
            this.currentPage = page;
            this.perPage = perPage;
            this.getHotels();
        },
    },
    computed: {
        pageCount() {
            return this.totalPages;
        },
    },
    watch: {
        currentPage: function () {
            this.getHotels();
        },
        searchQuery: function () {
            this.currentPage = 1;
            this.getHotels();
        },
    },
    mounted() {
        this.getHotels();
    },
}
</script>

<style scoped>

</style>