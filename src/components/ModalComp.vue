<template class="bg-black">
    <div class="modal fade show" id="exampleModalLive" tabindex="-1" aria-labelledby="exampleModalLiveLabel"
         style="display: block;" aria-modal="true" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLiveLabel">{{ title }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            @click="$emit('close')"></button>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$emit('close')">
                        Закрити
                    </button>
                    <button type="button" class="btn btn-primary" @click="$emit('reserve');$emit('updateComment')">{{ confirmButton }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "ModalComp",
    props: {
        title: {
            type: String
        },
        confirmButton: {
            type: String
        }
    }
}

</script>


<style>
</style>