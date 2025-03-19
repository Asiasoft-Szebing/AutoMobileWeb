<script setup>
import { ref } from 'vue';
import {useToast} from 'vue-toast-notification';

const $toast = useToast();
const props = defineProps({
    isOpen: Boolean,
    Metrics: Array,
});

const emit = defineEmits(["close", "apply"]);

const handleCancel = () => {
    emit("close");
};

const applySelection = () => {
  if (selectedMetrics.value.length > 0) {
    emit("updateMetrics", selectedMetrics.value);
    $toast.success('Metrics updated successfully!');
    handleCancel();
  } else {
    $toast.error('Please select at least one metric!');
  }
};

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
</script>

<template>
    <div v-if="isOpen" class="fixed inset-0 bg-overlay flex justify-center items-center z-50">
        <div class="modal-container">
            <div class="flex justify-between px-6 py-4">
                <!-- Modal Title-->
                <h2 class="modal-title">Customize Overview</h2>
                <!-- Close Button -->
                <button @click="handleCancel">
                    <span class="material-icon">close</span>
                </button>
            </div>
            <!-- line -->
            <hr />
            <!--Content-->
            <p class="modal-subtitle">Overview</p>
            <div class="modal-helper ">
                <span class="material-icon modal-helper-icon">info</span>
                <p>Select up to 4 metrics to display on your dashboard</p>
            </div>
            <!--Selection-->
            <div class="grid grid-cols-2 pb-4">
                <div v-for="metric in availableMetrics" :key="metric.name" class="modal-selection">
                    <input type="checkbox" v-model="selectedMetrics" :value="metric.name"
                        class="modal-checkbox border-[#E0E0E0] bg-[#E0E0E0]"
                        :disabled="selectedMetrics.length >= 4 && !selectedMetrics.includes(metric.name)" />
                    <label>{{ metric.label }}</label>
                </div>
            </div>
            <!-- line -->
            <hr />
            <!-- button -->
            <button @click="applySelection" class="modal-button">Apply</button>
        </div>
    </div>
</template>

<style>
.modal-container {
    height: 360px;
    width: 500px;
    background-color: #FFFFFF;
    padding: 0px;
    border: 1px #D6D6D6;
    border-radius: 8px;
    box-shadow: 0px 4px 8px 0px #0000001A;

}

.modal-title {
    font-size: 22px;
    font-weight: 700;
    color: #000000;
}

hr {
    color: #E3E8EE;
    padding: 0px;
    margin: 0px;
}

.modal-subtitle {
    font-size: 16px;
    font-weight: 700;
    color: #000000;
    padding: 16px 24px 4px 24px;
}

.modal-helper {
    display: flex;
    vertical-align: center;
    align-content: center;
    color: #FF0000;
    padding: 0px 24px 16px 24px;
    font-size: 10px;
}

.modal-helper-icon {
    height: 12.5px;
    width: 12.5px;
    margin-right: 2px;
    fill: #FF0000;
    color: white;
}

.modal-selection {
    display: flex;
    align-items: center;
    padding: 5px 24px;
    font-size: 14px;
    font-weight: 400;
}

.modal-checkbox {
    border-radius: 4px;
    margin-right: 8px;
    height: 16px;
    width: 16px;
    cursor: pointer;
}

.modal-button {
    display: flex;
    align-self: center;
    justify-content: center;
    margin: 20px auto;
    color: #FFFFFF;
    background: #0080FF;
    width: 180px;
    height: 40px;
    padding: 12px 14px;
    border-radius: 8px;
    border: 1px #D6D6D6;

}
</style>