<template>
    <div v-if="isOpen" class="fixed inset-0 bg-overlay flex justify-center items-center z-50">
        <div class="bg-white p-4 rounded shadow-md relative w-80">
            <!-- Close Button -->
            <button @click="handleCancel" class="absolute top-2 right-2">
                <span class="material-symbols-outlined">
                    close
                </span>
             </button>
            <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
            <p class="text-gray-700 mb-6">{{ message }}</p>
            <div class="flex justify-end space-x-4">
                <button @click="handleCancel" class="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                    Cancel
                </button>
                <button @click="handleConfirm" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
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