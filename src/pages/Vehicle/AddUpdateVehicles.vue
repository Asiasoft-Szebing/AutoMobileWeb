<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from '../../layout/MainLayout.vue';
import ConfirmationDialog from '../../components/ConfirmationDialog.vue';

const route = useRoute();
const isEditMode = ref(false);
const isConfirmationVisible = ref(false);

const vehicle = ref({
    vehicleid: "",
    plateNo: "",
    vin: "",
    brand: "",
    model: "",
    year: "",
    color: "",
    fuelType: "",
    bodyType: "",
    status: "",
    mileage: "",
    lastservicedate: "",
    nextservicedate: "",
    insuranceexpiry: "",
    brakestatus: "",
    brakeservicemileage: "",
    brakelastservicedate: "",
    brakeadditonalinfo: "",
    tyrestatus: "",
    tyreservicemileage: "",
    tyrelastservicedate: "",
    tyreadditonalinfo: "",
    batterystatus: "",
    batteryservicemileage: "",
    batterylastservicedate: "",
    batteryadditonalinfo: "",
    oillevelstatus: "",
    oillevelservicemileage: "",
    oillevellastservicedate: "",
    oilleveladditonalinfo: "",
    hasOwner: "Yes",
    ownerType: "",
    ownername: "",

});

const brands = ref(["Toyota", "Honda", "Ford"]);
const models = ref(["Corolla", "Civic", "Mustang"]);

const autocalculate = ref();

const enableautocalculate = () => {
    isConfirmationVisible = false;
    autocalculate = true;
}


onMounted(() => {
    if (route.query.vehicleid) {
        isEditMode.value = true;
        // Populate form fields
        vehicle.value.vehicleid = route.query.vehicleid;
    }
});

</script>

<template>
    <MainLayout>
        <!-- Confirmation Modal -->
        <ConfirmationDialog v-if="isConfirmationVisible" :isOpen="true" title="Enable auto calculate "
            message="Enabling auto calculation will overwrite your manual selection when mileage or service date updates. Continue?"
            @close="isConfirmationVisible = false" @confirm="enableautocalculate" />
        <!-- Breadcrumbs + Buttons -->
        <div class="flex justify-between items-center mb-4">
            <!-- Title-->
            <div class="breadcrumbs headline-text-md ">
                <h2>Vehicles</h2>
                <span class="mx-2"> > </span>
                <h2 class="current-page"> {{ isEditMode ? `Edit Vehicle > ${vehicle.vehicleid}` : 'New Vehicle' }}</h2>
            </div>
            <!-- Button -->
            <div class="flex gap-4">
                <!-- Back Button -->
                <button class="flex items-center gap-1 justify-center button-sm button-default" @click="$router.go(-1)">
                    <span class="material-icons">chevron_left</span>
                    <span>Back</span>
                </button>
                <!-- Add Button -->
                <button class="flex items-center gap-1 justify-center button-md button-primary">
                    <span class="material-icons">{{ isEditMode ? 'save' : 'add' }}</span>
                    <span>{{ isEditMode ? 'Save Changes' : 'Create Vehicle' }}</span>
                </button>
            </div>
        </div>

        <!-- Content -->
        <div class="add-update-vehicles-form grid grid-cols-12 gap-12">
            <!-- Left  -->
            <div class="col-span-8">
                <!-- Basic Info -->
                <div>
                    <div class="title-backgorund">
                        <h2 class="headline-text-sm"> Basic Info </h2>
                    </div>
                    <!-- Row 1-->
                    <div class="grid grid-cols-2 gap-4 mt-6">
                        <div>
                            <div class="inline-flex">
                                <p class="label-text-md text-left mb-2">Plate No</p>
                                <p class="label-text-md text-error ml-1"> * </p>
                            </div>

                            <div class="relative">
                                <input type="text" class="short-textbox" placeholder="Enter plate no (e.g. FF 9)"
                                    v-model="vehicle.plateNo" />
                            </div>
                        </div>
                        <div>
                            <div class="inline-flex">
                                <p class="label-text-md text-left mb-2">VIN</p>
                                <p class="label-text-md text-error ml-1"> * </p>
                            </div>

                            <div class="relative">
                                <input type="text" class="short-textbox" placeholder="e.g. PM2L000S000000000"
                                    v-model="vehicle.vin" />
                            </div>
                        </div>
                    </div>
                    <!-- Row 2-->
                    <div class="grid grid-cols-2 gap-4 mt-6">
                        <div>
                            <div class="inline-flex">
                                <p class="label-text-md text-left mb-2">Brand</p>
                                <p class="label-text-md text-error ml-1"> * </p>
                            </div>

                            <div class="relative">
                                <select type="text" class="short-textbox" v-model="vehicle.brand">
                                    <option disabled selected>Select vehicle brand</option>
                                    <option v-for="brand in brands" :key="brand" :value="brand"> {{ brand }}</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <div class="inline-flex">
                                <p class="label-text-md text-left mb-2">Model</p>
                                <p class="label-text-md text-error ml-1"> * </p>
                            </div>

                            <div class="relative">
                                <select type="text" class="short-textbox" v-model="vehicle.model">
                                    <option disabled selected>Select vehicle model</option>
                                    <option v-for="model in models" :key="model" :value="model"> {{ model }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <!-- Row 3-->
                    <div class="grid grid-cols-2 gap-4 mt-6">
                        <div>
                            <div class="inline-flex">
                                <p class="label-text-md text-left mb-2">Year</p>
                                <p class="label-text-md text-error ml-1"> * </p>
                            </div>

                            <div class="relative">
                                <input type="text" class="short-textbox" placeholder="Select manufacturing year"
                                    v-model="vehicle.year" />
                            </div>
                        </div>

                        <div>
                            <div class="inline-flex">
                                <p class="label-text-md text-left mb-2">Color</p>
                                <p class="label-text-md text-error ml-1"> * </p>
                            </div>

                            <div class="relative">
                                <input type="text" class="short-textbox"
                                    placeholder="Enter vehicle color (e.g. Black, White)" v-model="vehicle.color" />
                            </div>
                        </div>
                    </div>
                    <!-- Row 4 -->
                    <div class="grid grid-cols-2 gap-4 mt-6">
                        <div>
                            <div class="inline-flex">
                                <p class="label-text-md text-left mb-2">Fuel Type</p>
                                <p class="label-text-md text-error ml-1"> * </p>
                            </div>

                            <div class="relative">
                                <select type="text" class="short-textbox" v-model="vehicle.fuelType">
                                    <option disabled selected>Select fuel type</option>
                                    <option value="petrol"> Petrol </option>
                                    <option value="diesel"> Diesel </option>
                                    <option value="electric"> Electric </option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <p class="label-text-md text-left mb-2">Body Type</p>

                            <div class="relative">
                                <select type="text" class="short-textbox" v-model="vehicle.bodyType">
                                    <option disabled selected> Auto Filled </option>
                                    <option> Four-door Sedan</option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Status & Usage (edit) -->
                <div v-if="isEditMode">
                    <div class="title-backgorund mt-8">
                        <h2 class="headline-text-sm"> Status & Usage </h2>
                    </div>
                    <!-- Row 1 -->
                    <div class="grid grid-cols-2 gap-4 mt-6">
                        <div>
                            <div class="inline-flex">
                                <p class="label-text-md text-left mb-2"> Status </p>
                                <p class="label-text-md text-error ml-1"> * </p>
                            </div>

                            <div class="relative">
                                <select type="text" class="short-textbox" v-model="vehicle.status">
                                    <option disabled selected>Select vehicle status</option>
                                    <option value="active"> Active </option>
                                    <option value="inactive"> Inactive </option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <p class="label-text-md text-left mb-2">Mileage</p>
                            <div class="relative">
                                <input type="text" class="short-textbox"
                                    placeholder="Enter current mileage (e.g. 50,000)" v-model="vehicle.plateNo" />
                            </div>
                        </div>
                    </div>
                    <!-- Row 2 -->
                    <div class="grid grid-cols-2 gap-4 mt-6">
                        <div>
                            <p class="label-text-md text-left mb-2">Last Service Date</p>
                            <div class="relative">
                                <input type="text" class="short-textbox" placeholder="e.g. 2024-07-25"
                                    v-model="vehicle.lastservicedate" />
                                <span class="material-icons input-icon ">calendar_today</span>
                            </div>
                        </div>
                        <div>
                            <p class="label-text-md text-left mb-2">Next Service Date</p>
                            <div class="relative">
                                <input type="text" class="short-textbox" placeholder="e.g. 2024-07-25"
                                    v-model="vehicle.nextservicedate" />
                                <span class="material-icons input-icon ">calendar_today</span>
                            </div>
                            <div class="flex items-center mt-2" @click="isConfirmationVisible = true">
                                <input type="checkbox" class="form-checkbox w-4 h-4 text-blue-500 focus:ring-blue-500"
                                    value="autocalculate" />
                                <span class="label-text-md ml-2">Auto calculate </span>
                            </div>
                        </div>
                    </div>
                    <!-- Row 3 -->
                    <div class="mt-2">
                        <p class="label-text-md text-left mb-2">Insurance Expiry</p>
                        <div class="relative">
                            <input type="text" class="short-textbox" placeholder="e.g. 2025-02-10"
                                v-model="vehicle.insuranceexpiry" />
                            <span class="material-icons input-icon">calendar_today</span>
                        </div>
                    </div>
                </div>

                <!-- Vehicle Condition (edit) -->
                <div v-if="isEditMode">
                    <div class="title-backgorund mt-8">
                        <h2 class="headline-text-sm"> Vehicle Condition </h2>
                    </div>
                    <!-- Brake Status -->
                    <div class="mt-6">
                        <h2 class="headline-text-sm"> Brake Condition </h2>
                    </div>
                    <hr />
                    <!-- Row 1 -->
                    <div class="grid grid-cols-2 gap-4 mt-6">
                        <div>
                            <div class="inline-flex">
                                <p class="label-text-md text-left mb-2"> Status </p>
                                <p class="label-text-md text-error ml-1"> * </p>
                            </div>

                            <div class="relative">
                                <select type="text" class="short-textbox" v-model="vehicle.brakestatus">
                                    <option disabled selected>Select brake status</option>
                                    <option value="active"> Active </option>
                                    <option value="inactive"> Inactive </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <!-- Row 2 -->
                    <div class="grid grid-cols-2 gap-4 mt-6">
                        <div>
                            <p class="label-text-md text-left mb-2">Last Service Date</p>
                            <div class="relative">
                                <input type="text" class="short-textbox" placeholder="e.g. 2024-07-25"
                                    v-model="vehicle.brakelastservicedate" />
                                <span class="material-icons input-icon ">calendar_today</span>
                            </div>
                        </div>
                        <div>
                            <p class="label-text-md text-left mb-2">Mileage at last service</p>
                            <div class="relative">
                                <input type="text" class="short-textbox" placeholder="9000"
                                    v-model="vehicle.brakeservicemileage" />
                            </div>
                        </div>
                    </div>
                    <!-- Row 3-->
                    <div class="mt-6">
                        <p class="label-text-md text-left mb-2"> Additional Notes (optional) </p>
                        <input type="text" class="short-textbox"
                            placeholder="Provide extra details about the vehicle's status"
                            v-model="vehicle.brakeadditonalinfo" />
                    </div>
                    <!-- Tyre Condition -->
                    <div class="mt-6">
                        <h2 class="headline-text-sm"> Tyre Condition </h2>
                    </div>
                    <hr />
                    <!-- Row 1 -->
                    <div class="grid grid-cols-2 gap-4 mt-6">
                        <div>
                            <div class="inline-flex">
                                <p class="label-text-md text-left mb-2"> Status </p>
                                <p class="label-text-md text-error ml-1"> * </p>
                            </div>

                            <div class="relative">
                                <select type="text" class="short-textbox" v-model="vehicle.tyrestatus">
                                    <option disabled selected>Select tyre status</option>
                                    <option value="active"> Active </option>
                                    <option value="inactive"> Inactive </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <!-- Row 2 -->
                    <div class="grid grid-cols-2 gap-4 mt-6">
                        <div>
                            <p class="label-text-md text-left mb-2">Last Service Date</p>
                            <div class="relative">
                                <input type="text" class="short-textbox" placeholder="e.g. 2024-07-25"
                                    v-model="vehicle.tyrelastservicedate" />
                                <span class="material-icons input-icon ">calendar_today</span>
                            </div>
                        </div>
                        <div>
                            <p class="label-text-md text-left mb-2">Mileage at last service</p>
                            <div class="relative">
                                <input type="text" class="short-textbox" placeholder="9000"
                                    v-model="vehicle.tyreservicemileage" />
                            </div>
                        </div>
                    </div>
                    <!-- Row 3-->
                    <div class="mt-6">
                        <p class="label-text-md text-left mb-2"> Additional Notes (optional) </p>
                        <input type="text" class="short-textbox"
                            placeholder="Provide extra details about the vehicle's status"
                            v-model="vehicle.tyreadditonalinfo" />
                    </div>
                    <!-- Battery Condition -->
                    <div class="mt-6">
                        <h2 class="headline-text-sm"> Battery Condition </h2>
                    </div>
                    <hr />
                    <!-- Row 1 -->
                    <div class="grid grid-cols-2 gap-4 mt-6">
                        <div>
                            <div class="inline-flex">
                                <p class="label-text-md text-left mb-2"> Status </p>
                                <p class="label-text-md text-error ml-1"> * </p>
                            </div>

                            <div class="relative">
                                <select type="text" class="short-textbox" v-model="vehicle.batterystatus">
                                    <option disabled selected>Select battery status</option>
                                    <option value="active"> Active </option>
                                    <option value="inactive"> Inactive </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <!-- Row 2 -->
                    <div class="grid grid-cols-2 gap-4 mt-6">
                        <div>
                            <p class="label-text-md text-left mb-2">Last Service Date</p>
                            <div class="relative">
                                <input type="text" class="short-textbox" placeholder="e.g. 2024-07-25"
                                    v-model="vehicle.batterylastservicedate" />
                                <span class="material-icons input-icon ">calendar_today</span>
                            </div>
                        </div>
                        <div>
                            <p class="label-text-md text-left mb-2">Mileage at last service</p>
                            <div class="relative">
                                <input type="text" class="short-textbox" placeholder="9000"
                                    v-model="vehicle.batteryservicemileage" />
                            </div>
                        </div>
                    </div>
                    <!-- Row 3-->
                    <div class="mt-6">
                        <p class="label-text-md text-left mb-2"> Additional Notes (optional) </p>
                        <input type="text" class="short-textbox"
                            placeholder="Provide extra details about the vehicle's status"
                            v-model="vehicle.batteryadditonalinfo" />
                    </div>
                    <!-- Oil Level Condition -->
                    <div class="mt-6">
                        <h2 class="headline-text-sm"> Oil Level Condition </h2>
                    </div>
                    <hr />
                    <!-- Row 1 -->
                    <div class="grid grid-cols-2 gap-4 mt-6">
                        <div>
                            <div class="inline-flex">
                                <p class="label-text-md text-left mb-2"> Status </p>
                                <p class="label-text-md text-error ml-1"> * </p>
                            </div>

                            <div class="relative">
                                <select type="text" class="short-textbox" v-model="vehicle.oillevelstatus">
                                    <option disabled selected>Select tyre status</option>
                                    <option value="active"> Active </option>
                                    <option value="inactive"> Inactive </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <!-- Row 2 -->
                    <div class="grid grid-cols-2 gap-4 mt-6">
                        <div>
                            <p class="label-text-md text-left mb-2">Last Service Date</p>
                            <div class="relative">
                                <input type="text" class="short-textbox" placeholder="e.g. 2024-07-25"
                                    v-model="vehicle.oillevellastservicedate" />
                                <span class="material-icons input-icon ">calendar_today</span>
                            </div>
                        </div>
                        <div>
                            <p class="label-text-md text-left mb-2">Mileage at last service</p>
                            <div class="relative">
                                <input type="text" class="short-textbox" placeholder="9000"
                                    v-model="vehicle.oillevellastservicedate" />
                            </div>
                        </div>
                    </div>
                    <!-- Row 3-->
                    <div class="mt-6">
                        <p class="label-text-md text-left mb-2"> Additional Notes (optional) </p>
                        <input type="text" class="short-textbox"
                            placeholder="Provide extra details about the vehicle's status"
                            v-model="vehicle.oilleveladditonalinfo" />
                    </div>
                </div>

                <!-- Owner Info -->
                <div>
                    <div class="title-backgorund mt-8">
                        <h2 class="headline-text-sm "> Owner Info </h2>
                    </div>
                    <!-- Row 1-->
                    <div class="mt-6">
                        <div class="inline-flex">
                            <p class="label-text-md text-left mb-2"> Owner </p>
                            <p class="label-text-md text-error ml-1"> * </p>
                        </div>

                        <label class="flex items-center mt-2">
                            <input type="radio" v-model="vehicle.hasOwner" value="Yes" class="mr-2"> Yes </input>
                            <input type="radio" v-model="vehicle.hasOwner" value="No" class="ml-4 mr-2"> No </input>
                        </label>
                    </div>
                    <!-- Row 2-->
                    <div class="grid grid-cols-2 gap-4 mt-6">
                        <div>
                            <div class="inline-flex">
                                <p class="label-text-md text-left mb-2">Owner Type</p>
                                <p class="label-text-md text-error ml-1"> * </p>
                            </div>

                            <div class="relative">
                                <select type="text" class="short-textbox" v-model="vehicle.ownerType">
                                    <option disabled selected>Select owner type</option>
                                    <option value="individual"> Individual </option>
                                    <option value="company"> Company </option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <div class="inline-flex">
                                <p class="label-text-md text-left mb-2">Owner Name</p>
                                <p class="label-text-md text-error ml-1"> * </p>
                            </div>
                            <div class="relative">
                                <input type="text" class="short-textbox" placeholder="e.g. John Doe"
                                    v-model="vehicle.ownername" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--Right-->
            <div class="col-span-4 settings-form">
                <!-- Settings -->
                <div>
                    <div>
                        <h2 class="headline-text-sm"> Settings </h2>
                    </div>
                    <!-- Row 1 -->
                    <div class="mt-6">
                        <div class="inline-flex">
                            <p class="label-text-md text-left mb-2"> Status </p>
                            <p class="label-text-md text-error ml-1"> * </p>
                        </div>

                        <div class="relative">
                            <select type="text" class="short-textbox" v-model="vehicle.status">
                                <option disabled selected>Select vehicle status</option>
                                <option value="active"> Active </option>
                                <option value="inactive"> Inactive </option>
                            </select>
                        </div>
                    </div>
                </div>
                <!-- Vehicle History -->
                <div>
                    <div v-if="isEditMode">
                        <h2 class="headline-text-sm"> Vehicle History </h2>
                        <div class="flex items-center justify-center text-secondary my-80">
                            <span class="material-symbols-outlined mr-2">
                                info
                            </span>
                            <p class="body-text-sm"> This vehicle has no recorded service history</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </MainLayout>
</template>