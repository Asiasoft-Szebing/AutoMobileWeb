<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from '../../layout/MainLayout.vue';

const route = useRoute();
const isEditMode = ref(false);
const activeTab = ref('general');

const servicecode = ref('');
const servicename = ref('');
const category = ref('');
const description = ref('');
const pricingmode = ref("fixed");
const memberPricingEnabled = ref(false);
const specialPricingEnabled = ref(false);
const discountperiod = ref("");
const days = ref([
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
    { label: "Saturday", value: "Saturday" },
    { label: "Sunday", value: "Sunday" }
]);

const saveService = () => {
    if (isEditMode.value) {
        // Update existing service 
    } else {
        // Add new service
    }
};

onMounted(() => {
    if (route.query.id) {
        isEditMode.value = true;

        // Populate form fields
        servicecode.value = route.query.id;
        servicename.value = route.query.name;
        category.value = route.query.category;
        description.value = route.query.description;
    }
});
</script>

<template>
    <MainLayout>
        <!-- Breadcrumbs + Buttons -->
        <div class="flex justify-between items-center mb-4">
            <!-- Title-->
            <div class="breadcrumbs headline-text-md ">
                <h2>Services</h2>
                <span class="mx-2"> > </span>
                <h2 class="current-page"> {{ isEditMode ? `Edit Service > ${servicecode}` : 'New Service' }}</h2>
            </div>
            <!-- Button -->
            <div class="flex gap-4">
                <!-- Back Button -->
                <button class="flex items-center gap-1 justify-center button-sm button-default"  @click="$router.go(-1)" >
                    <span class="material-icons">chevron_left</span>
                    <span>Back</span>
                </button>
                <!-- Add Button -->
                <button class="flex items-center gap-1 justify-center button-md button-primary">
                    <span class="material-icons">{{ isEditMode ? 'save' : 'add' }}</span>
                    <span>{{ isEditMode ? 'Save Changes' : 'Create Service' }}</span>
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
            <div v-if="activeTab === 'general'" class="grid grid-cols-12 gap-12">
                <!-- Left -->
                <div class="col-span-8">
                    <!-- Form Section Title-->
                    <h2 class="headline-text-sm"> Basic Info </h2>

                    <div class="grid grid-cols-2 gap-4">
                        <!-- Row 1 -->
                        <div>
                            <p class="label-text-md text-left my-4">Service Code</p>
                            <div class="relative">
                                <input type="text" class="short-textbox" placeholder="S001" v-model="servicecode" />
                            </div>
                        </div>
                        <div>
                            <p class="label-text-md text-left my-4">Service Name *</p>
                            <div class="relative">
                                <input type="text" class="short-textbox" placeholder="e.g. Car Wash"
                                    v-model="servicename" />
                            </div>
                        </div>
                        <!-- Row 2 -->
                        <div class="flex flex-col col-span-2">
                            <label class="label-text-md my-4">Category *</label>
                            <select v-model="category" class="select-textbox">
                                <option value="">Select Category</option>
                                <option value="Repair & Fixing">Repair & Fixing</option>
                                <option value="Maintenance">Maintenance</option>
                            </select>
                        </div>
                        <!-- Row 3 -->
                        <div class="col-span-2">
                            <p class="label-text-md text-left my-4">Description</p>
                            <div class="relative">
                                <input type="text" class="short-textbox"
                                    placeholder="Provide a bried overview of this service..." v-model="description" />
                            </div>
                        </div>
                        <!-- Row 4 -->
                        <div class="flex flex-col col-span-2">
                            <label class="label-text-md my-4">Support Locations *</label>
                            <select v-model="category" class="select-textbox">
                                <option>Select a Branch</option>
                                <option value="Ultracare Car Service">Ultracare Car Service</option>
                            </select>
                        </div>
                        <!-- Row 5 -->
                        <div class="flex flex-col">
                            <label class="label-text-md my-4">Cancellation Policy</label>
                            <select v-model="cancellationPolicy" class="select-textbox">
                                <option value="">Select a cancellation policy</option>
                                <option value="2 hrs before">2 hours before</option>
                                <option value="3 days before">3 days before</option>
                            </select>
                        </div>
                        <div>
                            <p class="label-text-md text-left my-4">Maximum Appointments Per Day</p>
                            <div class="relative">
                                <input type="number" class="short-textbox" placeholder="20"
                                    v-model="maximumAppointment" />
                            </div>
                        </div>
                        <!-- Row 6 -->
                        <div class="col-span-2">
                            <p class="label-text-md text-left my-4">Employee Requirement</p>
                            <div class="relative">
                                <input type="number" class="short-textbox" placeholder="2" v-model="employeeRequired" />
                            </div>
                        </div>
                        <!-- Row 7 -->
                        <div class="mt-4 col-span-2">
                            <label class="label-text-md my-4">Feature this service?</label>
                            <div class="flex items-center space-x-4 mt-4">
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
                        <div>
                            <p class="label-text-md text-left my-4">Viewed</p>
                            <div class="relative">
                                <input type="number" class="short-textbox" placeholder="0" v-model="viewed" />
                            </div>
                        </div>
                        <div>
                            <p class="label-text-md text-left my-4">Purchased</p>
                            <div class="relative">
                                <input type="number" class="short-textbox" placeholder="0" v-model="purchased" />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Right -->
                <div class="col-span-4 settings-form">
                    <!-- Settings Section Title-->
                    <h2 class="headline-text-sm"> Settings </h2>
                    <!-- Row 1 -->
                    <div class="flex flex-col">
                        <label class="label-text-md my-4">Status</label>
                        <select v-model="status" class="select-textbox">
                            <option value="">Select a status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <!-- Row 2 -->
                    <div>
                        <p class="label-text-md text-left my-4">Sort Order</p>
                        <div class="relative">
                            <input type="number" class="short-textbox" placeholder="0" v-model="sortorder" />
                        </div>
                    </div>
                    <!--Row 3-->
                    <div class="flex flex-col">
                        <label class="label-text-md my-4">Visibility</label>
                        <select v-model="visibility" class="select-textbox">
                            <option value="all">All</option>
                            <option value="member">Member Only</option>
                        </select>
                    </div>
                    <!--Row 4 -->
                    <div class="flex flex-col">
                        <label class="label-text-md my-4">Send Reminder Before Appointment</label>
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
                            <label class="flex items-center space-x-2 my-4">
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
                        <label class="label-text-md ">Pricing Mode</label>
                        <div class="flex items-center space-x-4 mt-4 mb-2">
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
                    <!-- Show for variable pricing -->
                    <div v-if="pricingmode === 'variable'" class="mt-4 flex flex-col">
                        <label class="label-text-md mt-4 mb-2">Variation Type</label>
                        <select v-model="varationtype" class="select-textbox">
                            <option value="" disabled selected >Select a service variation</option>
                            <option value="car wash">Car Wash</option>
                            <option value="car service">Car Service</option>
                        </select>
                    </div>
                    <!-- Show for fixed price only-->
                    <div v-if="pricingmode === 'fixed'">
                        <!-- Row 2 -->
                        <div class="mt-4">
                            <p class="label-text-md text-left mt-4 mb-2">Base Price</p>
                            <div class="relative">
                                <input type="decimal" class="short-textbox" placeholder="0.00" v-model="baseprice" />
                            </div>
                        </div>
                        <!--  Section Title-->
                        <h2 class="headline-text-sm mt-4 text-[var(--text-placeholder)]"> Duration </h2>
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
                                    <option value="" disabled selected>10 mins</option>
                                    <option value="10">10 mins</option>
                                    <option value="15">15 mins</option>
                                </select>
                            </div>
                        </div>
                        <!-- Row 2 -->
                        <div class="mt-6 flex justify-between">
                            <div class="flex flex-col">
                                <label class="label-text-md">Enable Member Pricing ?</label>
                                <label class="label-text-sm mt-2 text-[var(--text-placeholder)]">Turn on this option to
                                    set
                                    special pricing for members. If
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
                        <!-- Show when member pricing enabled  -->
                        <div v-if="memberPricingEnabled === true">
                            <hr />
                            <table class="simple-table">
                                <thead class="body-text-md">
                                    <tr>
                                        <th> Member Tier </th>
                                        <th> Price </th>
                                        <th class="th-last"> Action </th>
                                    </tr>
                                </thead>
                                <tbody class="body-text-sm">
                                    <tr>
                                        <td> Bronze VIP</td>
                                        <td class="text-[var(--text-placeholder)]"> 0.00 </td>
                                        <td>
                                            <button class="button-icon button-error mx-auto"
                                                @click="confirmDelete(service)">
                                                <span class="material-icons"> delete </span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> Silver VIP</td>
                                        <td class="text-[var(--text-placeholder)]"> 0.00 </td>
                                        <td>
                                            <button class="button-icon button-error mx-auto"
                                                @click="confirmDelete(service)">
                                                <span class="material-icons "> delete </span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> Gold VIP</td>
                                        <td class="text-[var(--text-placeholder)]"> 0.00 </td>
                                        <td> <button class="button-icon button-error mx-auto"
                                                @click="confirmDelete(service)">
                                                <span class="material-icons "> delete </span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> Platinum VIP</td>
                                        <td class="text-[var(--text-placeholder)]"> 0.00 </td>
                                        <td>
                                            <button class="button-icon button-error mx-auto"
                                                @click="confirmDelete(service)">
                                                <span class="material-icons "> delete </span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> Diamond VIP</td>
                                        <td class="text-[var(--text-placeholder)]"> 0.00 </td>
                                        <td>
                                            <button class="button-icon button-error mx-auto"
                                                @click="confirmDelete(service)">
                                                <span class="material-icons "> delete </span>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- Right -->
                <div class="col-span-4 settings-form">
                    <!--  Section Title-->
                    <h2 class="headline-text-sm mt-4"> Limited-time Offer </h2>
                    <div class="mt-4 flex justify-between">
                        <div class="flex flex-col">
                            <label class="label-text-md">Special Price</label>
                            <label class="label-text-sm mt-2 text-[var(--text-placeholder)]">Enable this option to set a
                                special price for a limited
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
                    <!-- Shown when special price enabled -->
                    <div v-if="specialPricingEnabled === true">
                        <hr />
                        <div>
                            <label class="label-text-md ">Discount Type</label>
                            <div class="flex items-center space-x-4 mt-4">
                                <label class="flex items-center space-x-2">
                                    <input v-model="discounttype" type="radio" value="percentage" class="radio-input">
                                    <span>Percentage (%)</span>
                                </label>
                                <label class="flex items-center space-x-2">
                                    <input v-model="pricingmode" type="radio" value="fixed" class="radio-input">
                                    <span>Fixed Price</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <p class="label-text-md text-left mt-4 mb-2">Discount Value</p>
                            <div class="relative">
                                <input type="decimal" class="short-textbox" placeholder="0.00"
                                    v-model="discountvalue" />
                            </div>
                        </div>
                        <div>
                            <p class="label-text-md text-left mt-4 mb-2">Start Date</p>
                            <div class="relative">
                                <input type="text" class="short-textbox" placeholder="1/1/2025 00:00:00 AM"
                                    v-model="startdate" />
                                <span class="material-icons input-icon ">calendar_today</span>
                            </div>
                        </div>
                        <div>
                            <p class="label-text-md text-left mt-4 mb-2">End Date</p>
                            <div class="relative">
                                <input type="text" class="short-textbox" placeholder="1/1/2025 23:59:59 PM"
                                    v-model="enddate" />
                                <span class="material-icons input-icon ">calendar_today</span>
                            </div>
                        </div>
                        <div class="mt-4 flex flex-col">
                            <label class="label-text-md">Apply Discount On</label>
                            <select v-model="discountperiod" class="select-textbox">
                                <option value="" disabled selected>Entire Period (Default)</option>
                                <option value="specificday">Specific Days</option>
                                <option value="specifictime">Specific Time Slots</option>
                            </select>
                        </div>
                        <!-- Show for specific days only -->
                        <div v-if="discountperiod === 'specificday'" class="mt-4">
                            <label class="label-text-md">Specific Days</label>
                            <div class="grid grid-cols-3 gap-4">
                                <label v-for="(day, index) in days" :key="index"
                                    class="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" v-model="selectedDays" :value="day.value"
                                        class="form-checkbox w-4 h-4 text-blue-500 focus:ring-blue-500" />
                                    <span class="text-gray-800">{{ day.label }}</span>
                                </label>
                            </div>
                        </div>
                        <!-- Show for specific time only -->
                        <div v-if="discountperiod === 'specifictime'" class="">
                            <div>
                                <p class="label-text-md text-left mt-4">Start Time</p>
                                <div class="relative">
                                    <input class="short-textbox" placeholder="00:00" />
                                    <span class="material-icons input-icon">schedule</span>
                                </div>
                            </div>
                            <div>
                                <p class="label-text-md text-left mt-4">End Time</p>
                                <div class="relative">
                                    <input class="short-textbox" placeholder="00:00" />
                                    <span class="material-icons input-icon">schedule</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p class="label-text-md text-left mt-4">Minimum Spend</p>
                            <div class="relative">
                                <input class="short-textbox" placeholder="0.00" v-model="minimumspend" />
                            </div>
                        </div>
                        <div>
                            <p class="label-text-md text-left mt-4">Limit Usage</p>
                            <div class="relative">
                                <input class="short-textbox" placeholder="0" v-model="limitusage" />
                            </div>
                        </div>
                        <div class="mt-4">
                            <label class="label-text-md">Eligible for Members Only</label>
                            <div class="flex items-center space-x-4 mt-4">
                                <label class="flex items-center space-x-2">
                                    <input v-model="formembers" type="radio" value="yes" class="radio-input">
                                    <span>Yes</span>
                                </label>
                                <label class="flex items-center space-x-2">
                                    <input v-model="formembers" type="radio" value="no" class="radio-input">
                                    <span>No</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>