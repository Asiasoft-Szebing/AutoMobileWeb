<script setup>
import { ref, watch } from 'vue';
import InputTextbox from '../../components/InputTextbox.vue';

const props = defineProps({
    isOpen: Boolean,
    Term: String,
    Description: String,
});

const emit = defineEmits(["close", "save"]);

const handleCancel = () => {
    emit("close");
};

const addTerms = () => {
    emit("save", {

    });
}
</script>

<template>
    <div v-if="isOpen" class="modal-overlay">
        <div class="modal-container">
            <div class="flex justify-between mb-2">
                <!-- Modal Title-->
                <h2 class="headline-text-sm ">Add New Term</h2>
                <!-- Close Button -->
                <button @click="handleCancel">
                    <span class="material-icons"> close </span>
                </button>
            </div>
            <!-- line -->
            <hr class="modal-hr" />
            <!--Content-->
            <div class="modal-filter-content">
                <div>
                    <InputTextbox label="Name" inputType="string" placeholder="e.g Hand Wash" v-model="name"/>
                </div>
                <div>
                    <InputTextbox label="Description" inputType="string" placeholder="Description (optional)" v-model="description"/>
                </div>
            </div>
            <!-- line -->
            <hr class="modal-hr" />
             <!-- button -->
             <div class="flex justify-center items-center mt-4">
                <!-- Apply button -->
                <button @click="addTerms" class="button-sm button-primary">Save</button>
            </div>
        </div>
    </div>
</template>