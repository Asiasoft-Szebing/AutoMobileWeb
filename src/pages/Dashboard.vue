<script setup>
import { ref } from 'vue';
import MainLayout from '../layout/MainLayout.vue';
import CustomizeOverviewDialog from '../components/Dashboard/CustomizeOverviewDialog.vue';
import OverviewCard from '../components/Dashboard/OverviewCard.vue';

// Default selected metrics (change as needed)
const allMetrics = ref([
  { name: 'stockAlert', title: 'Stock Alert', value: 1 },
  { name: 'totalSales', title: 'Total Sales', value: 1000, previousValue: 500 },
  { name: 'totalAppointments', title: 'Total Appointments', value: 8, previousValue: 2 },
  { name: 'availableServiceBays', title: 'Available Service Bays', value: 2, previousValue: 5 },
  { name: 'totalMembers', title: 'Total Members', value: 30, previousValue: 5 },
  { name: 'availableTechnicians', title: 'Available Technicians', value: 4, previousValue: 5 },
  { name: 'pendingAppointments', title: 'Pending Appointments', value: 0, previousValue: 5 },
  { name: 'negativeFeedback', title: 'Negative Feedback Alerts', value: 1, previousValue: 5 },
]);

const selectedMetrics = ref([...allMetrics.value].slice(0, 4));

const showCustomizeOverviewDialog = ref(false);

const openCustomizeOverviewDialog = () => {
  showCustomizeOverviewDialog.value = true;
};

const closeCustomizeOverviewDialog = () => {
  showCustomizeOverviewDialog.value = false;
};

const updateMetrics = (newmetrics) => {
  selectedMetrics.value = newmetrics.map(name => {
    const metricObj = allMetrics.value.find(m => m.name === name);
    return {
      name,
      title: metricObj?.label || name,
      value: metricObj.value,
      previousValue: metricObj.previousValue
    };
  });
};
</script>

<template>
  <MainLayout>
    <!-- Customize Overview Cards Dialog -->
    <CustomizeOverviewDialog :isOpen="showCustomizeOverviewDialog" @close="closeCustomizeOverviewDialog"
      @apply="updateMetrics" />
    <!-- Big Title -->
    <div class="flex justify-between">
      <h2 class="headline-text-lg"> Overview</h2>
      <!-- Edit Icon -->
      <button class="button-icon button-default" @click="openCustomizeOverviewDialog">
        <span class="material-icons">edit</span>
      </button>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8">
      <!-- Overview Card -->
      <div v-for="metric in selectedMetrics" :key="metric.name">
        <OverviewCard :name="metric.name" :value="metric.value" :previousValue="metric.previousValue" />
      </div>
    </div>

    <!-- Subtitle -->
    <div class="flex justify-between mt-15">
      <h2 class="headline-text-md"> Performance Insights</h2>
      <!-- Calendar Select Date (Modal) -->
      <div class="date-picker-textbox-sm items-center w-5">
        <span class="material-icons">calendar_today</span>
        <!-- Date Range -->
        <span class="text-gray-700 text-[12px] ml-2">2025-04-01 ~ 2025-04-30</span>
      </div>
    </div>
  </MainLayout>
</template>
