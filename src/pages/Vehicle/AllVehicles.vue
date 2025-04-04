<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import MainLayout from '../../layout/MainLayout.vue';
import ConfirmationDialog from '../../components/ConfirmationDialog.vue'
import Pagination from '../../components/Pagination.vue';
import FilterDialog from '../../components/FilterDialog.vue';

const router = useRouter();
const searchQuery = ref('');
const currentPage = ref(1);
const pageSize = ref(10);

const vehiclesList = ref([
    { id: 'V00001', plateNo: 'QAB134A', owner: 'Joseph Lim', brand: 'Porsche', model: 'Taycan 4S', year: 2023, status: 'Active', servicedOn: '2024-08-31' },
    { id: 'V00002', plateNo: 'FF 888', owner: 'Melvin Ong', brand: 'Toyota', model: 'Corolla', year: 2022, status: 'Active', servicedOn: '2024-05-15' },
    { id: 'V00003', plateNo: 'SWK 9001', owner: 'Johnson', brand: 'Ford', model: 'F-150', year: 2020, status: 'Active', servicedOn: '2022-06-01' },
    { id: 'V00004', plateNo: 'UNIMAS 5516', owner: 'Gary Yeo', brand: 'Honda', model: 'Civic', year: 2021, status: 'Active', servicedOn: '2022-03-08' },
    { id: 'V00005', plateNo: 'QS 6661 A', owner: 'Adeline Kwong Shu Ling', brand: 'Honda', model: 'Civic', year: 2021, status: 'Active', servicedOn: '2020-07-30' }
])

// Filter Function
const selectedBrand = ref(['All Brand']);
const selectedModel = ref(['All Model']);
const selectedStatus = ref(['All Status']);
const showFilter = ref(false);

const openFilter = () => {
    showFilter.value = true;
}

const closeFilter = () => {
    showFilter.value = false;
}

// Handle applied filter 
const applyFilter = ({ brand, model, status }) => {
    selectedBrand.value = brand.length ? brand : ['All Brand'];
    selectedModel.value = model.length ? model : ['All Model'];
    selectedStatus.value = status.length ? status : ['All Status'];
    closeFilter();;
};


// Search Function
const filteredVehicles = computed(() => {
    return vehiclesList.value.filter(vehicle => {
        const matchName = !searchQuery.value || vehicle.plateNo.toLowerCase().includes(searchQuery.value.toLowerCase());

        const matchBrand = selectedBrand.value.includes('All Brand') ||
            selectedBrand.value.includes(vehicle.brand);

        const matchModel = selectedModel.value.includes('All Model') ||
            selectedModel.value.includes(vehicle.model);

        const matchStatus = selectedStatus.value.includes('All Status') ||
            (selectedStatus.value.includes('Active') && vehicle.active) ||
            (selectedStatus.value.includes('Inactive') && !vehicle.active);

        return matchName && matchBrand && matchModel && matchStatus;
    });
});

// Sorting Function
const sortColumn = ref('');
const sortDirection = ref('asc');

const applySorting = computed(() => {
    if (!sortColumn)
        return filteredVehicles.value;

    return [...filteredVehicles.value].sort((a, b) => {
        let valA = a[sortColumn.value];
        let valB = b[sortColumn.value];

        if (sortColumn === 'status') {
            valA = a.status ? 1 : 0;
            valB = b.status ? 1 : 0;
        }

        if (sortColumn === 'brand') {
            valA = Number(valA);
            valB = Number(valB);
        }

        if (sortColumn === 'year') {
            valA = Number(valA);
            valB = Number(valB);
        }

        if (sortColumn === 'status') {
            valA = Number(valA);
            valB = Number(valB);
        }

        if (sortColumn === 'lastservice') {
            valA = Number(valA);
            valB = Number(valB);
        }

        if (valA < valB) return sortDirection.value === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection.value === 'asc' ? 1 : -1;
        return 0;
    });
});

const sortBy = (column) => {
    if (sortColumn.value === column) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortColumn.value = column;
        sortDirection.value = 'asc';
    }
};

// New Vehicles
const addVehicles = () => {
    // navigation
    router.push("/Vehicle/AddUpdateVehicles");
}

const selectedVehicle = ref(null);
// Edit Vehicles 
const editVehicles = (vehicle) => {

    // navigation 
    router.push({
        path: "/Vehicle/AddUpdateVehicles",
        query: {
            vehicleid: vehicle.id,
        }
    });
}

// Remove Services
const isConfirmationVisible = ref(false);

const confirmDelete = (vehicle) => {
    selectedVehicle.value = vehicle; // Store the selected vehicle
    isConfirmationVisible.value = true; // Show the confirmation dialog
};

const remove = () => {
    if (selectedVehicle.value) {
        // Remove from list 
        vehiclesList.value = vehiclesList.value.filter(vehicle => vehicle.id !== selectedVehicle.value.id);
        console.log(`Removing vehicle: ${selectedVehicle.value.name}`);

        //Show toast notification

    }
    selectedVehicle.value = null;
    isConfirmationVisible.value = false;
}

// Calculate total pages based on filtered services
const totalPages = computed(() => {
    return Math.ceil(filteredVehicles.value.length / pageSize.value);
});

// Handle page change from pagination component
const onPageChange = (newPage) => {
    currentPage.value = newPage;
};
</script>

<template>
    <MainLayout>
        <!-- Filter-->
        <FilterDialog :isOpen="showFilter" :filters="[
            { label: 'Brand', key: 'brand', options: ['All Brand', 'Toyota', 'Honda', 'Ford', 'Porsche'], selected: ['All Brand'] },
            { label: 'Model', key: 'model', options: ['All Model', 'Corolla', 'Civic', 'Mustang'], selected: ['All Model'] },
            { label: 'Status', key: 'status', options: ['All Status', 'Active', 'Inactive'], selected: ['All Status'] },
        ]" @close="closeFilter" @apply="applyFilter"></FilterDialog>
        <!-- Main -->
        <div class="flex justify-between items-center mb-4">
            <!-- Title-->
            <h2 class="headline-text-md">Vehicles</h2>
            <!-- Button -->
            <div class="flex gap-4">
                <!-- Filter Button -->
                <button class="flex items-center gap-1 justify-center button-sm button-default" @click="openFilter">
                    <span class="material-icons">filter_list</span>
                    <span>Filter</span>
                </button>
                <!-- Add Button -->
                <button class="flex items-center gap-1 justify-center button-md button-primary" @click="addVehicles">
                    <span class="material-icons">add</span>
                    <span>New Vehicle</span>
                </button>
            </div>
        </div>
        <!-- Search -->
        <div class="relative my-8">
            <span class="material-icons search-icon">search</span>
            <input type="text" class="search-textbox" placeholder="Search by plate no." v-model="searchQuery">
            </input>
        </div>
        <!-- Table-->
        <table class="table-primary">
            <thead class="body-text-md">
                <tr>
                    <th> # </th>
                    <th> Plate No </th>
                    <th> Owner </th>
                    <th @click="sortBy('brand')" class="sorting-th">
                        Brand
                        <span class="material-icons ml-3" v-if="sortColumn === 'brand'">unfold_more</span>
                    </th>
                    <th>Model</th>
                    <th>
                        Year
                    </th>
                    <th @click="sortBy('status')" class="sorting-th">
                        Status
                        <span class="material-icons ml-3" v-if="sortColumn === 'status'">unfold_more</span>
                    </th>
                    <th>
                        Serviced On
                    </th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody class="body-text-sm">
                <tr v-if="applySorting.length === 0">
                    <td colspan="9" class="empty-list-td body2-text-md ">Empty List</td>
                </tr>
                <tr v-for="vehicle in applySorting" :key="vehicle.id">
                    <td>{{ vehicle.id }}</td>
                    <td>{{ vehicle.plateNo }}</td>
                    <td>{{ vehicle.owner }}</td>
                    <td>{{ vehicle.brand }}</td>
                    <td>{{ vehicle.model }}</td>
                    <td>{{ vehicle.year }}</td>
                    <td class="p-2">
                        <span
                            :class="vehicle.active ? 'status-success-chip body-text-sm' : 'status-error-chip body-text-sm'"
                            class="px-2 py-1 rounded-sm">
                            {{ vehicle.active ? 'Active' : 'Inactive' }}
                        </span>
                    </td>
                    <td>{{ vehicle.servicedOn }}</td>
                    <td class="flex">
                        <button class="button-icon button-warning mr-2" @click="editVehicles(vehicle)">
                            <span class="material-icons"> edit </span>
                        </button>
                        <button class="button-icon button-error" @click="confirmDelete(vehicle)">
                            <span class="material-icons"> delete </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <hr />
        <!-- Confirmation Dialog-->
        <ConfirmationDialog v-if="isConfirmationVisible" :isOpen="true"
            :title="`Remove ${selectedVehicle?.plateNo || ''}`" message="Are you sure you want to delete this vehicle?"
            @close="isConfirmationVisible = false" @confirm="remove" />

        <Pagination :total="applySorting.length" :pageSize="pageSize" :currentPage="currentPage"
            :totalPages="totalPages" @page-change="onPageChange" />
    </MainLayout>
</template>