<script setup>
import { ref, onMounted } from 'vue';
import MainLayout from '../../layout/MainLayout.vue';

const activeTab = ref('general');
</script>

<template>
    <MainLayout>
        <!-- Breadcrumbs + Buttons -->
        <div class="flex justify-between items-center mb-4">
            <!-- Title-->
            <h2 class="headline-text-md ">Appointment</h2>
            <!-- Button -->
            <div class="flex gap-4">
                <!-- Back Button -->
                <button class="flex items-center gap-1 justify-center button-sm button-default" @click="$router.go(-1)">
                    <span class="material-icons">chevron_left</span>
                    <span>Back</span>
                </button>
                <!-- Add Button -->
                <button class="flex items-center gap-2 justify-center button-md button-primary">
                    <span class="material-icons"> save</span>
                    <span>Save Changes</span>
                </button>
            </div>
        </div>


        <!-- Tab -->
        <div class="tab space-x-4">
            <button @click="activeTab = 'general'"
                :class="activeTab === 'general' ? 'body-text-lg active-tab' : 'body-text-sm inactive-tab'"
                class="px-4 py-2">
                General
            </button>
            <button @click="activeTab = 'details'"
                :class="activeTab === 'details' ? 'body-text-lg active-tab' : 'body-text-sm inactive-tab'"
                class="px-4 py-2">
                Service Details
            </button>
        </div>

        <div class="add-update-services-form">
            <!-- General Tab  -->
            <div v-if="activeTab === 'general'" class="grid grid-cols-12 gap-12">
                <!-- Left -->
                <div class="col-span-8">
                    <!-- Appointment Info -->
                    <div class="title-backgorund">
                        <h2 class="headline-text-sm"> Appointment Info </h2>
                    </div>
                    <!-- Row 1 -->
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <p class="label-text-md text-left my-4"> ID </p>

                        </div>
                        <div>
                            <p class="label-text-md text-left my-4"> Original ID </p>

                        </div>
                    </div>
                    <!-- Row 2 -->
                    <div>
                        <p class="label-text-md text-left my-4"> Status </p>
                    </div>
                    <!-- Row 3 -->
                    <div class="mt-2">
                        <p class="label-text-md text-left mb-2">Date & Time</p>
                        <div class="relative">
                            <input type="text" class="short-textbox" placeholder="e.g. 2025-02-10 09:00:00"/>
                            <span class="material-icons input-icon">calendar_today</span>
                        </div>
                    </div>
                    <!-- Row 4 -->
                    <div class="grid grid-cols-2 gap-4">
                    </div>

                    <!-- Vehicle Info -->
                    <div class="title-backgorund">
                        <h2 class="headline-text-sm"> Vehicle Info </h2>
                    </div>
                    <div class="grid grid-cols-2 gap-4">

                    </div>
                    <!-- Payment Info -->
                    <div class="title-backgorund">
                        <h2 class="headline-text-sm"> Payment Info </h2>
                    </div>
                    <div class="grid grid-cols-2 gap-4">

                    </div>
                </div>
            </div>
        </div>

    </MainLayout>
</template>