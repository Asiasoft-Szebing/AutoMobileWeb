<script setup>
import { ref, watch } from 'vue';
import InputTextbox from '../../components/InputTextbox.vue';

const props = defineProps({
    isOpen: Boolean,
    Name: String,
    DisplayName: String,
    IsRequired: Boolean,
    Type: String,
});

const required = ref("yes");
const availableType = ref(['Single Choice', 'Multiple Choice']);
// Selected values
const selectedType = ref("");

const emit = defineEmits(["close", "save"]);

const handleCancel = () => {
    emit("close");
};

const addattribute = () => {
    emit("save", {

    });
}


</script>

<template>
    <div v-if="isOpen" class="modal-overlay">
        <div class="modal-container">
            <div class="flex justify-between mb-2">
                <!-- Modal Title-->
                <h2 class="headline-text-sm ">Add New Attribute</h2>
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
                    <InputTextbox label="Name" inputType="string" placeholder="e.g Car Wash Package" v-model="name"/>
                </div>
                <div>
                    <InputTextbox label="Display Name" inputType="string" placeholder="e.g Package" v-model="displayname"/>
                </div>
                <div class="mt-4">
                    <label class="label-text-md">Required?</label>
                    <div class="flex items-center space-x-4 mt-2">
                        <label class="flex items-center space-x-2">
                            <input v-model="required" type="radio" value="yes" class="radio-input">
                            <span>Yes</span>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input v-model="required" type="radio" value="no" class="radio-input">
                            <span>No</span>
                        </label>
                    </div>
                </div>
                <label class="label-text-md mt-4 mb-2"> Type </label>
                <select v-model="selectedType[0]" class="select-textbox">
                    <option v-for="type in availableType" :key="type" :value="type"> {{ type }}
                    </option>
                </select>
            </div>
            <!-- line -->
            <hr class="modal-hr" />
            <!-- button -->
            <div class="flex justify-center items-center mt-4">
                <!-- Apply button -->
                <button @click="addattribute" class="button-sm button-primary">Save</button>
            </div>
        </div>

    </div>
</template>