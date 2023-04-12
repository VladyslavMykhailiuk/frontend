<template>
    <div class="d-flex justify-content-center align-items-center mt-5">
        <nav>
            <ul class="pagination">
                <li class="page-item" :class="{disabled: currentPage === 1}">
                    <a class="page-link" href="#" @click.prevent="emitPageChange(currentPage - 1)">Previous</a>
                </li>
                <li v-for="page in pageCount" :key="page" class="page-item" :class="{active: currentPage === page}">
                    <a class="page-link" href="#" @click.prevent="emitPageChange(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{disabled: currentPage === totalPages}">
                    <a class="page-link" href="#" @click.prevent="emitPageChange(currentPage + 1)">Next</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: "PaginationComp",
    props: {
        currentPage: Number,
        pageCount: Number,
        totalPages: Number
    },
    methods: {
        emitPageChange(page) {
            this.$emit("page-change", page);
        }
    }
}
</script>