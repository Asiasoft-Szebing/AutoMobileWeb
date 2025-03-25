<script setup>
import { ref } from 'vue';
import MainLayout from '../../layout/MainLayout.vue';
import InputTextbox from '../../components/InputTextbox.vue';
import { label } from 'framer-motion/client';

const activeTab = ref(['general']);

const memberPricingEnabled = ref(false);
const specialPricingEnabled = ref(false);
</script>

<template>
    <MainLayout>
        <!-- Breadcrumbs + Buttons -->
        <div class="flex justify-between items-center mb-4">
            <!-- Title-->
            <div class="breadcrumbs headline-text-md ">
                <h2>Services</h2>
                <span class="mx-2"> > </span>
                <h2 class="current-page"> New Service</h2>
            </div>
            <!-- Button -->
            <div class="flex gap-4">
                <!-- Filter Button -->
                <button class="flex items-center gap-1 justify-center button-sm button-default">
                    <span class="material-icons">chevron_left</span>
                    <span>Back</span>
                </button>
                <!-- Add Button -->
                <button class="flex items-center gap-1 justify-center button-md button-primary">
                    <span class="material-icons">add</span>
                    <span>Create Service</span>v
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
            <button @click="activeTab = 'pricing'"
                :class="activeTab === 'pricing' ? 'body-text-lg active-tab' : 'body-text-sm inactive-tab'"
                class="px-4 py-2">
                Pricing & Duration
            </button>
        </div>
        <div class="add-update-services-form">
            <!-- General Tab  -->
            <div v-if="activeTab === 'general'" class="grid grid-cols-12 gap-6">
                <!-- Left -->
                <div class="col-span-8">
                    <!-- Form Section Title-->
                    <h2 class="headline-text-sm"> Basic Info </h2>

                    <!-- Row 1 -->
                    <div class="grid grid-cols-2 gap-1">
                        <div>
                            <InputTextbox label="Service Code" inputType="text" placeholder="S001"
                                v-model="servicecode"></InputTextbox>
                        </div>
                        <div>
                            <InputTextbox label="Service Name *" inputType="text" placeholder="e.g. Car Wash"
                                v-model="servicename"></InputTextbox>
                        </div>
                    </div>
                    <!-- Row 2 -->
                    <div class="mt-4 flex flex-col">
                        <label class="label-text-md">Category *</label>
                        <select v-model="category" class="select-textbox">
                            <option value="">Select Category</option>
                            <option value="Repair & Fixing">Repair & Fixing</option>
                            <option value="Maintenance">Maintenance</option>
                        </select>
                    </div>
                    <!-- Row 3 -->
                    <div>
                        <InputTextbox label="Description" inputType="text"
                            placeholder="Provide a bried overview of this service..." v-model="servicename">
                        </InputTextbox>
                    </div>
                    <!-- Row 4 -->
                    <div class="mt-4 flex flex-col">
                        <label class="label-text-md">Support Locations *</label>
                        <select v-model="category" class="select-textbox">
                            <option>Select a Branch</option>
                            <option value="Ultracare Car Service">Ultracare Car Service</option>
                        </select>
                    </div>
                    <!-- Row 5 -->
                    <div class="grid grid-cols-2 gap-1">
                        <div class="flex flex-col">
                            <label class="label-text-md mt-4">Cancellation Policy</label>
                            <select v-model="cancellationPolicy" class="select-textbox">
                                <option value="">Select a cancellation policy</option>
                                <option value="2 hrs before">2 hours before</option>
                                <option value="3 days before">3 days before</option>
                            </select>
                        </div>

                        <div>
                            <InputTextbox label="Maximum Appointments Per Day" inputType="number" placeholder="20"
                                v-model="maximumAppointment">
                            </InputTextbox>
                        </div>
                    </div>
                    <!-- Row 6 -->
                    <div>
                        <InputTextbox label="Employee Requirement" inputType="number" placeholder="2"
                            v-model="employeeRequired">
                        </InputTextbox>
                    </div>
                    <!-- Row 7 -->
                    <div class="mt-4">
                        <label class="label-text-md">Feature this service?</label>
                        <div class="flex items-center space-x-4">
                            <label class="flex items-center space-x-2">
                                <input v-model="featureService" type="radio" value="yes" class="radio-input">
                                <span>Yes</span>
                            </label>
                            <label class="flex items-center space-x-2">
                                <input v-model="featureService" type="radio" value="no" class="radio-input">
                                <span>No</span>
                            </label>
                        </div>
                    </div>
                    <!-- Row 8 -->
                    <div class="mt-4 grid grid-cols-2 gap-1">
                        <div>
                            <InputTextbox label="Viewed" inputType="number" placeholder="0" v-model="viewed">
                            </InputTextbox>
                        </div>
                        <div>
                            <InputTextbox label="Purchased" inputType="number" placeholder="0" v-model="purchased">
                            </InputTextbox>
                        </div>
                    </div>
                </div>
                <!-- Right -->
                <div class="col-span-4 settings-form">
                    <!-- Settings Section Title-->
                    <h2 class="headline-text-sm"> Settings </h2>
                    <!-- Row 1 -->
                    <div class="flex flex-col">
                        <label class="label-text-md mt-4">Status</label>
                        <select v-model="status" class="select-textbox">
                            <option value="">Select a status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <!-- Row 2 -->
                    <div>
                        <InputTextbox label="Sort Order" inputType="number" placeholder="0" v-model="sortorder">
                        </InputTextbox>
                    </div>
                    <!--Row 3-->
                    <div class="flex flex-col">
                        <label class="label-text-md mt-4">Visibility</label>
                        <select v-model="visibility" class="select-textbox">
                            <option value="all">All</option>
                            <option value="member">Member Only</option>
                        </select>
                    </div>
                    <!--Row 4 -->
                    <div class="flex flex-col">
                        <label class="label-text-md mt-4">Send Reminder Before Appointment</label>
                        <select v-model="reminder" class="select-textbox">
                            <option value="1">1 day before</option>
                            <option value="3">3 days before</option>
                        </select>
                    </div>
                    <!-- Row 5 -->
                    <h2 class="body2-text-sm text-[var(--primary)] mt-4">Add Notification</h2>
                    <!-- Row 6 -->
                    <div class="mt-4">
                        <label class="label-text-md">Specific Service Bay?</label>
                        <div class="flex items-center space-x-4">
                            <label class="flex items-center space-x-2">
                                <input v-model="servicebay" type="radio" value="yes" class="radio-input">
                                <span>Yes</span>
                            </label>
                            <label class="flex items-center space-x-2">
                                <input v-model="servicebay" type="radio" value="no" class="radio-input">
                                <span>No</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pricing -->
            <div v-if="activeTab === 'pricing'" class="grid grid-cols-12 gap-6">
                <!-- Left -->
                <div class="col-span-8">
                    <!--  Section Title-->
                    <h2 class="headline-text-sm"> Pricing </h2>
                    <!-- Row 1 -->
                    <div class="mt-4">
                        <label class="label-text-md">Pricing Mode</label>
                        <div class="flex items-center space-x-4">
                            <label class="flex items-center space-x-2">
                                <input v-model="pricingmode" type="radio" value="variable" class="radio-input">
                                <span>Variable Pricing</span>
                            </label>
                            <label class="flex items-center space-x-2">
                                <input v-model="pricingmode" type="radio" value="fixed" class="radio-input">
                                <span>Fixed Price</span>
                            </label>
                        </div>
                    </div>
                    <!-- Show for fixed price only-->
                    <!-- Row 2 -->
                    <div class="mt-4">
                        <InputTextbox label="Base Price" inputType="decimal" placeholder="0.00" v-model="baseprice">
                        </InputTextbox>
                    </div>
                    <!--  Section Title-->
                    <h2 class="headline-text-sm mt-4"> Duration </h2>
                    <!-- Row 1 -->
                    <div class="grid grid-cols-2 gap-1">
                        <div class="flex flex-col">
                            <label class="label-text-md mt-4">Estimated Duration</label>
                            <select v-model="duration" class="select-textbox">
                                <option value="30">30 mins</option>
                                <option value="60">1 hour</option>
                            </select>
                        </div>
                        <div class="flex flex-col">
                            <label class="label-text-md mt-4">Buffer Time</label>
                            <select v-model="buffer" class="select-textbox">
                                <option value="10">10 mins</option>
                                <option value="15">15 mins</option>
                            </select>
                        </div>
                    </div>
                    <!-- Row 2 -->
                    <div class="mt-4 flex justify-between">
                        <div class="flex flex-col">
                            <label class="label-text-md">Enable Member Pricing ?</label>
                            <label class="label-text-sm mt-2">Turn on this option to set special pricing for members. If
                                disabled, all customers will be charged the regular price.</label>
                        </div>
                        <!-- Toggle Button -->
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="memberPricingEnabled" class="sr-only peer">
                            <div
                                class="w-10 h-6 bg-gray-300 rounded-full p-1 transition-colors peer-checked:bg-blue-500">
                                <!-- Moving Circle -->
                                <div class="w-4 h-4 bg-white rounded-full shadow-md transform transition-all duration-300"
                                    :class="memberPricingEnabled ? 'translate-x-4' : 'translate-x-0'">
                                </div>
                            </div>
                        </label>
                    </div>
                    <!-- Show when member pticing enabled  -->
                    <div>
                        <hr />
                        <table class="table-primary">
                            <thead class="body-text-md">
                                <th> Member Tier </th>
                                <th> Price </th>
                                <th> Action </th>
                            </thead>
                            <tbody class="body-text-sm">
                                <tr>
                                    <td> Bronze VIP</td>
                                    <td> 0.00 </td>
                                    <td> <button class="button-icon button-error" @click="confirmDelete(service)">
                                            <span class="material-icons "> delete </span>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td> Silver VIP</td>
                                    <td> 0.00 </td>
                                    <td> <button class="button-icon button-error" @click="confirmDelete(service)">
                                            <span class="material-icons "> delete </span>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td> Gold VIP</td>
                                    <td> 0.00 </td>
                                    <td> <button class="button-icon button-error" @click="confirmDelete(service)">
                                            <span class="material-icons "> delete </span>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td> Platinum VIP</td>
                                    <td> 0.00 </td>
                                    <td> <button class="button-icon button-error" @click="confirmDelete(service)">
                                            <span class="material-icons "> delete </span>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td> Diamond VIP</td>
                                    <td> 0.00 </td>
                                    <td> <button class="button-icon button-error" @click="confirmDelete(service)">
                                            <span class="material-icons "> delete </span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- Right -->
                <div class="col-span-4 settings-form">
                    <!--  Section Title-->
                    <h2 class="headline-text-sm mt-4"> Limited-time Offer </h2>
                    <div class="mt-4 flex justify-between">
                        <div class="flex flex-col">
                            <label class="label-text-md">Special Price</label>
                            <label class="label-text-sm mt-2">Enable this option to set a special price for a limited
                                time.</label>
                        </div>
                        <!-- Toggle Button -->
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="specialPricingEnabled" class="sr-only peer">
                            <div
                                class="w-10 h-6 bg-gray-300 rounded-full p-1 transition-colors peer-checked:bg-blue-500">
                                <!-- Moving Circle -->
                                <div class="w-4 h-4 bg-white rounded-full shadow-md transform transition-all duration-300"
                                    :class="specialPricingEnabled ? 'translate-x-4' : 'translate-x-0'">
                                </div>
                            </div>
                        </label>

                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>