<script setup>
import { ref } from 'vue';

const props = defineProps({
    isOpen: Boolean,
})

const emit = defineEmits(["close", "apply"]);

const appointment = ref({
    appointmentid: "",
    appointmenttype: "",
    onholditems: "",
    customertype: "Guest",
    customername: "",
    customercontact: "",
    appointmentdate: "",
    vehicleplateno: "",
    vehiclebrand: "",
    vehiclemodel: "",
    vehiclemanufactureyear: "",
    services: "",
})

const brands = ref(["Toyota", "Honda", "Ford"]);
const models = ref(["Corolla", "Civic", "Mustang"]);

const handleCancel = () => {
    emit("close");
};

</script>

<template>
    <div v-if="isOpen" class="modal-overlay">
        <div class="add-appointment-modal-container">
            <div class="flex justify-between mb-2">
                <!-- Modal Title-->
                <h2 class="headline-text-md ">New Appointment</h2>
                <!-- Close Button -->
                <button @click="handleCancel">
                    <span class="material-icons"> close </span>
                </button>
            </div>
            <!-- line -->
            <hr class="modal-hr" />
            <!--Content-->
            <!-- Appointment Type -->
            <div class="my-4">
                <p class="label-text-md text-left mb-2">Appointment Type</p>
                <div class="relative">
                    <select class="short-textbox" v-model="appointment.appointmenttype">
                        <option disabled selected>Select appointment type</option>
                        <option value="follow-up"> Follow-Up Appointment </option>
                        <option value="new"> New Appointment </option>
                    </select>
                </div>
            </div>
            <!-- Show when follow-up selected only-->
            <div v-if="appointment.appointmenttype === 'follow-up'">
                <!-- Original Appointment -->
                <div>
                    <p class="label-text-md text-left mb-2">Original Appointment</p>
                    <div class="relative">
                        <select class="short-textbox" v-model="appointment.appointmentid">
                            <option disabled selected>Select original appointment</option>
                            <option value="1">#0001 - 1 item(s) On Hold</option>
                        </select>
                    </div>
                </div>
                <!-- On Hold Items -->
                <div class="my-4">
                    <p class="label-text-md text-left mb-2">On Hold Items: </p>
                    <div class="flex items-center mt-2">
                        <input type="checkbox" class="form-checkbox w-4 h-4 text-blue-500 focus:ring-blue-500"
                            value="onholditems" />
                        <span class="label-text-md ml-2"> Wheel Alignment </span>
                    </div>
                </div>
            </div>
            <!-- Show when new selected only-->
            <div v-if="appointment.appointmenttype === 'new'">
                <!-- Customer Type -->
                <div class="mt-6">
                    <p class="label-text-md text-left mb-2"> Customer Type </p>

                    <label class="flex items-center mt-2">
                        <input type="radio" v-model="appointment.customertype" value="customer" class="mr-2"> Existing
                        Customer </input>
                        <input type="radio" v-model="appointment.customertype" value="guest" class="ml-4 mr-2"> Guest
                        </input>
                    </label>
                </div>
                <!-- show for existing customer -->
                <div v-if="appointment.customertype === 'customer'">
                    <!-- Services -->
                    <div class="mt-6">
                        <p class="label-text-md text-left mb-2"> Services </p>
                        <div class="relative">
                            <select class="short-textbox" v-model="appointment.services">
                                <option disabled selected>Select services needed</option>
                                <option value="oil change"> Oil Change</option>
                            </select>
                        </div>
                    </div>

                    <!-- Owner & Vehicle -->
                    <div class="grid grid-cols-2 gap-4 mt-6">
                        <div>
                            <p class="label-text-md text-left mb-2"> Name </p>
                            <input type="text" class="short-textbox" placeholder="Customer Name"
                                v-model="appointment.customername" />
                        </div>
                        <div>
                            <p class="label-text-md text-left mb-2"> Plate No </p>
                            <input type="text" class="short-textbox" placeholder="Plate No"
                                v-model="appointment.vehicleplateno" />
                        </div>
                    </div>
                    <!-- Appointment Date -->
                    <div class="my-6">
                        <p class="label-text-md text-left mb-2">Date</p>
                        <div class="relative">
                            <input type="text" class="short-textbox" placeholder="e.g. 2025-07-25"
                                v-model="appointment.appointmentdate" />
                            <span class="material-icons input-icon ">calendar_today</span>
                        </div>
                    </div>
                </div>
                <!-- show for guest -->
                <div v-if="appointment.customertype === 'guest'">
                    <!-- Customer Name  -->
                    <div class="grid grid-cols-2 gap-4 mt-6">
                        <div>
                            <p class="label-text-md text-left mb-2"> Name </p>
                            <input type="text" class="short-textbox" placeholder="Customer Name"
                                v-model="appointment.customername" />
                        </div>
                        <div>
                            <p class="label-text-md text-left mb-2"> Phone Number </p>
                            <input type="text" class="short-textbox" placeholder="Phone Number"
                                v-model="appointment.customercontact" />
                        </div>
                    </div>
                    <!-- Appointment Date -->
                    <div class="mt-4">
                        <p class="label-text-md text-left mb-2">Date</p>
                        <div class="relative">
                            <input type="text" class="short-textbox" placeholder="e.g. 2025-07-25"
                                v-model="appointment.appointmentdate" />
                            <span class="material-icons input-icon ">calendar_today</span>
                        </div>
                    </div>
                    <hr />
                    <!-- Vehicle Info -->
                    <h2 class="headline-text-sm"> Vehicle Info </h2>
                    <!-- Row 1 -->
                    <div class="grid grid-cols-2 gap-4 mt-6">
                        <div>
                            <p class="label-text-md text-left mb-2"> Plate No </p>
                            <input type="text" class="short-textbox" placeholder="Plate No"
                                v-model="appointment.vehicleplateno" />
                        </div>
                        <div>
                            <p class="label-text-md text-left mb-2">Brand</p>
                            <div class="relative">
                                <select class="short-textbox" v-model="appointment.vehiclebrand">
                                    <option disabled selected>Select vehicle brand</option>
                                    <option v-for="brand in brands" :key="brand" :value="brand"> {{ brand }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <!-- Row 2 -->
                    <div class="grid grid-cols-2 gap-4 my-6">
                        <div>
                            <p class="label-text-md text-left mb-2">Model</p>
                            <select class="short-textbox" v-model="appointment.vehiclemodel">
                                <option disabled selected>Select vehicle model</option>
                                <option v-for="model in models" :key="model" :value="model"> {{ model }}</option>
                            </select>
                        </div>
                        <div>
                            <p class="label-text-md text-left mb-2">Year</p>
                            <input type="text" class="short-textbox" placeholder="Select manufacturing year"
                                v-model="appointment.vehiclemanufactureyear" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- line -->
            <hr class="modal-hr" />
            <!-- button -->
            <div class="flex justify-center items-center mt-4">
                <!-- Apply button -->
                <button class="button-sm button-primary">Apply</button>
            </div>


        </div>
    </div>
</template>