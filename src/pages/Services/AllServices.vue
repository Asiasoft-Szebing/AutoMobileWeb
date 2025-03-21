<script setup>
import { ref, computed } from 'vue';
import MainLayout from '../../layout/MainLayout.vue';
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

const filteredServices = computed(() => {
    if (!searchQuery.value) {
        return services.value;
    }
    return services.value.filter(service =>
        service.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});
</script>

<template>
    <MainLayout>
        <div class="flex justify-between items-center mb-4">
            <!-- Title-->
            <h2 class="headline-text-md">Services</h2>
            <!-- Button -->
            <div class="flex gap-4">
                <!-- Filter Button -->
                <button class="flex items-center gap-1 justify-center button-sm button-default">
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
        <div class="flex justify-between items-center my-8">
            <!-- Search -->
            <div class="relative">
                <span class="material-icons search-icon">search</span>
                <input type="text" class="search-textbox" placeholder="Search by service name" v-model="searchQuery">
                </input>
            </div>
            <!-- Show results -->
            <!-- <p class="table-result"> Showing 1-10 of 36 results</p> -->
        </div>

        <table>
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
                            <a href="#" class="text-blue-500 underline">{{ service.duration }}</a>
                        </template>
                        <template v-else>
                            <p>{{ service.duration }}</p>
                        </template>
                    </td>
                    <td class="p-2">
                        <span :class="service.active ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'"
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

        <Pagination :total="filteredServices.length" :pageSize="pageSize" :currentPage="currentPage" />
    </MainLayout>
</template>

<style>
/* Textbox */
.search-textbox {
    background-color: white;
    border: 1px solid var(--border-neutral);
    height: 40px;
    width: 350px;
    padding: 20px 50px;
}

.search-textbox:focus {
    outline: none;
    border: 1px solid #0080FF;
}

/* Icon in input field */
.search-icon {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: #A0A0A0;
    width: 20px;
    height: 20px;
}

table {
    border-collapse: collapse;
    outline: 1px solid var(--border-neutral);
    min-width: 100%;
}

th {
    text-align: left;
    background-color: var(--background-light);
    padding: 24px;
    border-bottom: 1px solid var(--border-neutral);
}

td {
    text-align: left;
    background-color: var(--card-bg);
    padding: 24px;
    border-bottom: 1px solid var(--border-neutral);
}

.edit-icon,
.delete-icon {
    height: 5px;
    width: 5px;
}

hr {
    color: var(--border-neutral);
    padding: 0px;
    margin: 30px 0px;
}
</style>