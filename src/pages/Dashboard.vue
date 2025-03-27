<script setup>
import { ref } from 'vue';
import MainLayout from '../layout/MainLayout.vue';
import CustomizeOverviewDialog from '../components/Dashboard/CustomizeOverviewDialog.vue';
import OverviewCard from '../components/Dashboard/OverviewCard.vue';

// Default selected metrics (change as needed)
const selectedMetrics = ref(['stockAlert','totalSales','availableServiceBays','availableTechnicians']);
const showCustomizeOverviewDialog = ref(false);

const openCustomizeOverviewDialog = () => {
  showCustomizeOverviewDialog.value = true;
};

const closeCustomizeOverviewDialog = () => {
  showCustomizeOverviewDialog.value = false;
};

const updateMetrics = (metrics) => {
    selectedMetrics.value = metrics
  
};

</script>

<template>
    <MainLayout>
        <!-- Customize Overview Cards Dialog -->
         <CustomizeOverviewDialog :isOpen="showCustomizeOverviewDialog" @close="closeCustomizeOverviewDialog" @apply="updateMetrics"/>
        <!-- Big Title -->
        <div class="flex justify-between">
            <h2 class="headline-text-lg"> Overview</h2>
            <!-- Edit Icon -->
            <button class="button-icon button-default" @click="openCustomizeOverviewDialog">
                <span class="material-icons">edit</span>
            </button>
        </div>

        <!-- Subtitle -->
        <div class="flex justify-between">
            <h2 class="headline-text-md"> Performance Insights</h2>
            <!-- Calendar Select Date (Modal) -->
            <div class="date-picker-textbox-sm items-center">
                <span class="material-icons">calendar_today</span>
                <!-- Date Range -->
                <span class="text-gray-700 text-[12px] ml-2">2025-03-01 ~ 2025-03-31</span>
            </div>
        </div>
    </MainLayout>
</template>
