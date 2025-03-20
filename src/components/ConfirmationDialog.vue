<template>
    <div v-if="isOpen" class="modal-overlay">
        <div class="modal-container ">
            <!-- Close Button -->
            <button @click="handleCancel" class="absolute top-2 right-2">
                <span class="material-icons"> close </span>
            </button>
            <h2 class="headline-text-md mb-4">{{ title }}</h2>
            <p class="body-text-md text-[#666666] mb-6">{{ message }}</p>
            <div class="modal-button-group ">
                <button @click="handleCancel" class="button-sm button-cancel mr-3">
                    Cancel
                </button>
                <button @click="handleConfirm" class="button-sm button-primary">
                    Confirm
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    isOpen: Boolean,
    title: String,
    message: String,
});

const emit = defineEmits(["close", "confirm"]);

const handleCancel = () => {
    emit("close");
};

const handleConfirm = () => {
    emit("confirm");
};
</script>

<style>
/* Prevent modal click from propagating to the background */
div[role="dialog"] {
    position: relative;
}
</style>