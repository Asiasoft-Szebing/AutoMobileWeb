<template>
    <MainLayout>
        <!-- Customization Modal -->
        <CustomizeOverviewModal :isOpen="showCustomizeModal" :Metrics="availableMetrics" @close="closeCustomizeOverview"
            @updateMetrics="updateMetrics" />
    </MainLayout>
</template>
<script setup>
import MainLayout from '../layout/MainLayout.vue';

</script>