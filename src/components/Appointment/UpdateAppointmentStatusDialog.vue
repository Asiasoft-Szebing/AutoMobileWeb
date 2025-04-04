<script setup>
import { ref } from 'vue';

const props = defineProps({
    isOpen: Boolean,
})

const emit = defineEmits(["close", "apply"]);

const appointment = ref({
    appointmentstatus: "confirm",
    assignedemployee: "",
    reasonrejected: "",
})

const viewDetails = () => {

}

const applyChanges = () => {
    
}

const handleCancel = () => {
    emit("close");
};
</script>

<template>
    <div v-if="isOpen" class="modal-overlay">
        <div class="update-appointment-modal-container">
            <div class="flex justify-between mb-2">
                <!-- Modal Title-->
                <h2 class="headline-text-md ">Update Appointment Status</h2>
                <!-- Close Button -->
                <button @click="handleCancel">
                    <span class="material-icons"> close </span>
                </button>
            </div>
            <!-- line -->
            <hr class="modal-hr" />
            <!--Content-->
            <div class="mt-6">
                <p class="label-text-md text-left mb-2">Set Status </p>

                <label class="flex items-center mt-2">
                    <input type="radio" v-model="appointment.appointmentstatus" value="confirm" class="mr-2"> Confirm
                    </input>
                    <input type="radio" v-model="appointment.appointmentstatus" value="cancel" class="ml-4 mr-2"> Cancel
                    </input>
                </label>
            </div>
            <div v-if="appointment.appointmentstatus === 'confirm'" class="my-6">
                <p class="label-text-md text-left mb-2">Choose an Employee</p>
                <div class="relative">
                    <select class="short-textbox" v-model="appointment.assignedemployee">
                        <option disabled selected>Select employee</option>
                        <option value="1">Employee 1</option>
                    </select>
                </div>
            </div>
            <div v-if="appointment.appointmentstatus === 'cancel'" class="my-6">
                <p class="label-text-md text-left mb-2"> Reason </p>
                <input type="text" class="short-textbox" placeholder="Please specify the reasonfor rejection"
                    v-model="appointment.reasonrejected" />
            </div>
            <!-- line -->
            <hr class="modal-hr" />
            <!-- button -->
            <div class="flex justify-between items-center mt-4">
                <!-- Clear Filter -->
                <a @click.prevent="viewDetails" class="reset-button">View Details</a>
                <!-- Apply button -->
                <button @click="applyChanges" class="button-sm button-primary">Apply</button>
            </div>
        </div>
    </div>
</template>