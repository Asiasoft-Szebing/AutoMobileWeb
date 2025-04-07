<script setup>
import { ref } from 'vue';
import MainLayout from '../layout/MainLayout.vue';
import CustomizeOverviewDialog from '../components/Dashboard/CustomizeOverviewDialog.vue';
import OverviewCard from '../components/Dashboard/OverviewCard.vue';
import Calendar from '../components/Dashboard/Calendar.vue';
import BarChart from '../components/Dashboard/BarChart.vue';
import DoughnutChart from '../components/Dashboard/DoughnutChart.vue';
import LineChart from '../components/Dashboard/LineChart.vue';

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

const handleDragHandleClick = (e) => {
  e.stopPropagation()
}
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
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
      <!--Customer Growth Rate-->
      <div class="col-span-2 relative bg-white shadow-lg rounded-md mt-4 p-4 w-full min-w-[250px] flex flex-col h-full">
        <!-- Drag Handle -->
        <div class="drag-indicator" @mousedown.stop="handleDragHandleClick">
          <span class="material-symbols-outlined">
            drag_indicator
          </span>
        </div>
        <!-- Title -->
        <h2 class="text-black text-lg font-semibold mb-6">
          Customer Growth Rate
        </h2>
        <!--Value-->
        <LineChart />
      </div>
      <!--Customer Review-->
      <div class="col-span-2 relative bg-white shadow-lg rounded-md mt-4 p-4 w-full min-w-[250px] flex flex-col h-full">
        <!-- Drag Handle -->
        <div class="drag-indicator" @mousedown.stop="handleDragHandleClick">
          <span class="material-symbols-outlined">
            drag_indicator
          </span>
        </div>
        <!-- Title -->
        <h2 class="text-black text-lg font-semibold mb-6">Customer Review</h2>
        <!--Bar Chart -->
        <BarChart />
      </div>
    </div>
    <!--Upcoming Appointment Calendar -->
    <div class="col-span-4 relative bg-white shadow-lg rounded-md my-15 p-8 pb-4 w-full min-w-[250px] flex flex-col h-full">
      <!-- Drag Handle -->
      <div class="drag-indicator" @mousedown.stop="handleDragHandleClick">
        <span class="material-symbols-outlined">
          drag_indicator
        </span>
      </div>
      <Calendar />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
      <!--Today's Appointment-->
      <div class="col-span-2 relative bg-white shadow-lg rounded-md p-4 w-full min-w-[250px] flex flex-col h-full">
        <!-- Drag Handle -->
        <div class="drag-indicator" @mousedown.stop="handleDragHandleClick">
          <span class="material-symbols-outlined">
            drag_indicator
          </span>
        </div>
        <!-- Title -->
        <h2 class="text-black text-md font-semibold">Today's Appointment</h2>
        <!-- Value -->
        <table class="w-full mt-8 border-collapse">
          <thead>
            <tr class="bg-blue-100 text-gray-600">
              <th class="text-left p-2">Time Slot</th>
              <th class="text-left p-2">Member's Name</th>
              <th class="text-left p-2">Branch</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(appointment, index) in appointments" :key="index" class="border-b">
              <td class="p-2">{{ appointment.time }}</td>
              <td class="p-2">{{ appointment.name }}</td>
              <td class="p-2">{{ appointment.branch }}</td>
            </tr>
          </tbody>
        </table>
        <RouterLink to="/Appointment/AllAppointment" class="text-blue-500 text-center mt-2 cursor-pointer">
          <p>View More</p>
        </RouterLink>
      </div>
      <!-- Appointment Chart-->
      <div class="col-span-2 relative bg-white shadow-lg rounded-md p-0 w-full min-w-[250px] flex flex-col h-full">
        <div class="p-5 pb-1">
          <!-- Drag Handle -->
          <div class="drag-indicator" @mousedown.stop="handleDragHandleClick">
            <span class="material-symbols-outlined">
              drag_indicator
            </span>
          </div>
          <!-- Title -->
          <h2 class="text-black text-md font-semibold">Appointment Chart</h2>
          <!-- Content -->
          <DoughnutChart />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style>
.drag-indicator {
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: move;
  color: var(--text-placeholder);
}

#AppointmentChart {
  margin: 10px auto;
  width: 350px !important;
  height: 350px !important;
}
</style>