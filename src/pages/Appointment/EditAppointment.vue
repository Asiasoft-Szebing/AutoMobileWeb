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
                    <div class="grid grid-cols-2 gap-4 my-6">
                        <div>
                            <p class="label-text-md text-left mb-2"> ID </p>

                        </div>
                        <div>
                            <p class="label-text-md text-left mb-2"> Original ID </p>

                        </div>
                    </div>
                    <!-- Row 2 -->
                    <div class="my-6">
                        <p class="label-text-md text-left mb-2"> Status </p>
                    </div>
                    <!-- Row 3 -->
                    <div class="mt-2">
                        <p class="label-text-md text-left mb-2">Date & Time</p>
                        <div class="relative">
                            <input type="text" class="short-textbox" placeholder="e.g. 2025-02-10 09:00:00" />
                            <span class="material-icons input-icon">calendar_today</span>
                        </div>
                    </div>
                    <!-- Row 4 -->
                    <div class="grid grid-cols-2 gap-4 my-6">
                        <div>
                            <p class="label-text-md text-left mb-2">Technician</p>
                            <input type="text" class="short-textbox" placeholder="Alex" />
                        </div>
                        <div>
                            <p class="label-text-md text-left mb-2"> Workshop </p>

                        </div>
                    </div>
                    <!-- Row 5 -->
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <p class="label-text-md text-left"> Appointment Type </p>

                        </div>
                        <div>
                            <p class="label-text-md text-left"> Source </p>

                        </div>
                    </div>
                    <!-- Row 6 -->
                    <div class="my-6">
                        <p class="label-text-md text-left mb-2"> Provided Note </p>
                        <input type="text" class="short-textbox" placeholder="Please check the tyre pressure" />

                    </div>
                    <!-- Vehicle Info -->
                    <div class="title-backgorund">
                        <h2 class="headline-text-sm"> Vehicle Info </h2>
                    </div>
                    <!-- Row 1 -->
                    <div class="grid grid-cols-2 gap-4 my-6">
                        <div>
                            <p class="label-text-md text-left mb-2"> VIN </p>

                        </div>
                        <div>
                            <p class="label-text-md text-left mb-2"> Plate No </p>

                        </div>
                    </div>
                    <!-- Row 2 -->
                    <div class="my-6">
                        <p class="label-text-md text-left mb-2"> Brand </p>
                    </div>
                    <!-- Row 3 -->
                    <div class="mt-2">
                        <p class="label-text-md text-left mb-2">Model</p>

                    </div>
                    <!-- Row 4 -->
                    <div class="grid grid-cols-2 gap-4 my-6">
                        <div>
                            <p class="label-text-md text-left mb-2">Model Year</p>
                        </div>
                        <div>
                            <p class="label-text-md text-left mb-2"> Color </p>

                        </div>
                    </div>
                    <!-- Row 5 -->
                    <div class="grid grid-cols-2 gap-4 my-6">
                        <div>
                            <p class="label-text-md text-left mb-2">Drive Type</p>
                        </div>
                        <div>
                            <p class="label-text-md text-left mb-2"> Mileage </p>
                            <input type="text" class="short-textbox" placeholder="30,020" />
                        </div>
                    </div>
                    <!-- Row 6 -->
                    <div class="my-6">
                        <p class="label-text-md text-left mb-2"> Notes </p>
                        <input type="text" class="short-textbox"
                            placeholder="Prefer touchless wash due to ceramic coating" />
                    </div>
                    <!-- Payment Info -->
                    <div class="title-backgorund">
                        <h2 class="headline-text-sm"> Payment Info </h2>
                    </div>
                    <!-- Row 1 -->
                    <div class="grid grid-cols-2 gap-4 my-6">
                        <div>
                            <p class="label-text-md text-left mb-2">Payment Status</p>
                        </div>
                        <div>
                            <p class="label-text-md text-left mb-2"> Total Amount Due </p>
                        </div>
                    </div>
                    <!-- Row 2 -->
                    <div class="grid grid-cols-2 gap-4 my-6">
                        <div>
                            <p class="label-text-md text-left mb-2">Transaction Date & Time</p>
                        </div>
                        <div>
                            <p class="label-text-md text-left mb-2"> Transaction Ref </p>
                        </div>
                    </div>
                    <!-- Row 3 -->
                    <div class="grid grid-cols-2 gap-4 my-6">
                        <div>
                            <p class="label-text-md text-left mb-2">Payment Method</p>
                        </div>
                    </div>
                </div>
                <!-- Right -->
                <div class="col-span-4 settings-form">
                    <!-- Customer Details-->
                    <div>
                        <div>
                            <h2 class="headline-text-sm"> Customer Details </h2>
                        </div>
                        <!-- Row 1 -->
                        <div>
                            <p class="label-text-md text-left mb-2"> ID </p>

                        </div>
                        <!-- Row 2 -->
                        <div>
                            <p class="label-text-md text-left mb-2"> Name </p>

                        </div>
                        <!-- Row 3 -->
                        <div>
                            <p class="label-text-md text-left mb-2"> Member Tier </p>

                        </div>
                        <!-- Row 4 -->
                        <div>
                            <p class="label-text-md text-left mb-2"> Phone </p>

                        </div>
                        <!-- Row 5 -->
                        <div>
                            <p class="label-text-md text-left mb-2"> Email </p>

                        </div>
                        <!-- Row 6 -->
                        <div>
                            <p class="label-text-md text-left mb-2"> Total Appointment </p>

                        </div>
                        <!-- Row 7 -->
                        <div>
                            <p class="label-text-md text-left mb-2"> Not Present Count </p>

                        </div>
                    </div>
                </div>
            </div>
            <!--Service Details Tab  -->
            <div v-if="activeTab === 'details'">
                <!-- Partially Refunded -->
                <div>
                    <h2 class="headline-text-sm"> Follow-Up Items </h2>
                </div>
                <!-- Table -->

                <hr />
                <!-- Button -->
                <div class="flex place-content-start">
                    <div class="flex gap-2">
                        <!-- Back Button -->
                        <button class="flex items-center justify-center button-md button-outline-primary">
                            Add item(s)
                        </button>
                        <!-- Add Button -->
                        <button class="flex items-center justify-center button-md button-outline-primary">
                            Apply Coupon
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </MainLayout>
</template>