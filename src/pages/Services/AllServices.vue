<script setup>
import { ref, computed } from 'vue';
import MainLayout from '../../layout/MainLayout.vue';
import FilterDialog from '../../components/FilterDialog.vue';
import Pagination from '../../components/Pagination.vue';

const searchQuery = ref('');
const currentPage = ref(1);
const pageSize = ref(10);

const services = ref([
    { id: 1, name: 'Car Wash', category: 'Cleaning', price: '8.00', duration: 'Click to View', active: true },
    { id: 2, name: 'Oil Change', category: 'Maintenance', price: '78.00', duration: '30 Mins', active: true },
    { id: 3, name: 'Wheel Alignment', category: 'Repair & Fixing', price: '98.00', duration: '1 Hour', active: true },
    { id: 4, name: 'Exhaust System Upgrade', category: 'Upgrades', price: '388.88', duration: '2 Hours', active: true },
    { id: 5, name: 'Windshield Crack Repair', category: 'Repair & Fixing', price: '400.00', duration: '1 Day', active: false },
]);

// Filter Function
const selectedStatus = ref(['All Status']);
const selectedCategory = ref(['All Category']);
const showFilter = ref(false);

const openFilter = () => {
    showFilter.value = true;
}

const closeFilter = () => {
    showFilter.value = false;
}

// Handle applied filter 
const applyFilter = ({ status, category }) => {
    selectedStatus.value = status;
    selectedCategory.value = category;
    closeFilter();
};

// Search Function
const filteredServices = computed(() => {
    return services.value.filter(service => {
        const matchName = !searchQuery.value || service.name.toLowerCase().includes(searchQuery.value.toLowerCase());

        const matchStatus = selectedStatus.value.length === 0 ||
            selectedStatus.value.includes('All Status') ||
            (selectedStatus.value.includes('Active') && service.active) ||
            (selectedStatus.value.includes('Inactive') && !service.active);

        const matchCategory = selectedCategory.value.length === 0 ||
            selectedCategory.value.includes('All Category') ||
            selectedCategory.value.includes(service.category);

        return matchName && matchStatus && matchCategory;
    });
});


// Calculate total pages based on filtered services
const totalPages = computed(() => {
    return Math.ceil(filteredServices.value.length / pageSize.value);
});

// Handle page change from pagination component
const onPageChange = (newPage) => {
    currentPage.value = newPage;
};
</script>

<template>
    <MainLayout>
        <!-- Filter Dialog-->
        <FilterDialog :isOpen="showFilter" :Status="selectedStatus" :Category="selectedCategory" @close="closeFilter"
            @apply="applyFilter" />
        <!-- Main -->
        <div class="flex justify-between items-center mb-4">
            <!-- Title-->
            <h2 class="headline-text-md">Services</h2>
            <!-- Button -->
            <div class="flex gap-4">
                <!-- Filter Button -->
                <button class="flex items-center gap-1 justify-center button-sm button-default" @click="openFilter">
                    <span class="material-icons">filter_list</span>
                    <span>Filter</span>
                </button>
                <!-- Add Button -->
                <button class="flex items-center gap-1 justify-center button-md button-primary">
                    <span class="material-icons">add</span>
                    <span>New Service</span>
                </button>
            </div>
        </div>
        <!-- Search -->
        <div class="relative my-8">
            <span class="material-icons search-icon">search</span>
            <input type="text" class="search-textbox" placeholder="Search by service name" v-model="searchQuery">
            </input>
        </div>
        <!--Table-->
        <table class="table-primary">
            <thead class="body-text-md">
                <tr>
                    <th>Service Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody class="body-text-sm">
                <tr v-for="service in filteredServices" :key="service.id">
                    <td>{{ service.name }}</td>
                    <td>{{ service.category }}</td>
                    <td>From {{ service.price }}</td>
                    <td>
                        <template v-if="service.duration === 'Click to View'">
                            <a href="#" class="text-[var(--primary)] underline">{{ service.duration }}</a>
                        </template>
                        <template v-else>
                            <p>{{ service.duration }}</p>
                        </template>
                    </td>
                    <td class="p-2">
                        <span
                            :class="service.active ? 'status-success-chip body-text-sm' : 'status-error-chip body-text-sm'"
                            class="px-2 py-1 rounded-sm">
                            {{ service.active ? 'Active' : 'Inactive' }}
                        </span>
                    </td>
                    <td class="flex">
                        <button class="button-icon button-warning mr-2">
                            <span class="material-icons"> edit </span>
                        </button>
                        <button class="button-icon button-error">
                            <span class="material-icons "> delete </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <hr />

        <Pagination :total="filteredServices.length" :pageSize="pageSize" :currentPage="currentPage"
            :totalPages="totalPages" @page-change="onPageChange" />
    </MainLayout>
</template>
