<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    isOpen: Boolean,
    Metrics: Array,
})

const emit = defineEmits(["close", "apply"]);

const availableMetrics = ref([
    { name: 'stockAlert', label: 'Stock Alert' },
    { name: 'totalSales', label: 'Total Sales' },
    { name: 'totalAppointments', label: 'Total Appointment' },
    { name: 'availableServiceBays', label: 'Available Service Bays' },
    { name: 'totalMembers', label: 'Total Members' },
    { name: 'availableTechnicians', label: 'Available Technicians' },
    { name: 'pendingAppointments', label: 'Pending Appointments' },
    { name: 'negativeFeedback', label: 'Negative Feedback Alerts' },
]);

const selectedMetrics = ref([]);

const handleCancel = () => {
    emit("close");
};

// Apply Changes
const applyChanges = () => {
    emit("apply", selectedMetrics.value);
    handleCancel();
};

// Reset
const reset = () => {
    console.log(props.Metrics);
    selectedMetrics.value = [...props.Metrics];
};
</script>

<template>
    <div v-if="isOpen" class="modal-overlay">
        <div class="modal-container">
            <div class="flex justify-between mb-2">
                <!-- Modal Title-->
                <h2 class="headline-text-md ">Customize Overview</h2>
                <!-- Close Button -->
                <button @click="handleCancel">
                    <span class="material-icons"> close </span>
                </button>
            </div>
            <!-- line -->
            <hr class="modal-hr" />
            <!--Content-->
            <p class="body-text-md mt-2">Overview</p>
            <div class="modal-helper ">
                <span class="material-icons mr-2"> info </span>
                <p class="caption-text">Select up to 4 metrics to display on your dashboard</p>
            </div>
            <!--Selection-->
            <div class="grid grid-cols-2 pb-4">
                <div v-for="metric in availableMetrics" :key="metric.name" class="modal-selection ">
                    <input type="checkbox" v-model="selectedMetrics" :value="metric.name" class="modal-checkbox"
                        :disabled="selectedMetrics.length >= 4 && !selectedMetrics.includes(metric.name)" />
                    <label class="body-text-md mx-2">{{ metric.label }}</label>
                </div>
            </div>
            <!-- line -->
            <hr class="modal-hr" />
            <!-- button -->
            <div class="flex justify-between items-center mt-4">
                <!-- Clear Filter -->
                <a @click.prevent="reset" class="reset-button">Reset to default</a>
                <!-- Apply button -->
                <button @click="applyChanges" class="button-sm button-primary">Apply</button>
            </div>
        </div>
    </div>
</template>

<style>
/* Prevent modal click from propagating to the background */
div[role="dialog"] {
    position: relative;
}
</style>