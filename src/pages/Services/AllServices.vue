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
            <h2 class="text-2xl font-bold">Services</h2>
            <!-- Button -->
            <div class="flex gap-2">
                <!-- Filter Button -->
                <button
                    class="flex items-center gap-1 px-4 py-2 bg-white text-gray-600 rounded-lg shadow hover:bg-gray-100">
                    <ListFilter /> Filter
                </button>
                <!-- Add Button -->
                <button
                    class="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
                    <Plus /> New
                    Service
                </button>
            </div>
        </div>
        <div class="flex justify-between items-center mb-4">
            <!-- Search -->
            <div class="relative">
                <input type="text" class="form-input" placeholder="Search by service name" v-model="searchQuery">
                <Search class="input-icon" />
                </input>
            </div>
            <!-- Show results -->
            <!-- <p class="table-result"> Showing 1-10 of 36 results</p> -->
        </div>
        <div class="overflow-x-auto bg-white">
            <table class="min-w-full">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="p-2 text-left">Service Name</th>
                        <th class="p-2 text-left">Category</th>
                        <th class="p-2 text-left">Price</th>
                        <th class="p-2 text-left">Duration</th>
                        <th class="p-2 text-left">Status</th>
                        <th class="p-2 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b hover:bg-gray-50" v-for="service in filteredServices" :key="service.id">
                        <td class="p-2">{{ service.name }}</td>
                        <td class="p-2">{{ service.category }}</td>
                        <td class="p-2">From {{ service.price }}</td>
                        <td class="p-2">
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
                        <td>
                            <button class="edit-button">
                                <Edit class="edit-icon" />
                            </button>
                            <button class="delete-button">
                                <Trash2 class="delete-icon" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <hr />
        <Pagination :total="filteredServices.length" :pageSize="pageSize" :currentPage="currentPage" />
    </MainLayout>
</template>

<style>
/* Form input */
.form-input {
    width: 350px;
    height: 35px;
    padding: 13px 15px 13px 45px;
    border-radius: 3px;
    border: 1px solid #d6d6d6;
    background-color: white;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.05);
    font-size: 16px;
    color: #A0A0A0;
    outline: none;
    /* Remove default outline */
    transition: border-color 0.2s;
    /* Smooth transition */
}

/* Focused input */
.form-input:focus {
    border-color: #0080FF;
}

/* Icon in input field */
.input-icon {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: #A0A0A0;
    width: 18px;
    height: 18px;
}

.table-result {
    font-size: 14px;
    align-self: end;
}

table {
    border-collapse: collapse;
}

th,
td {
    text-align: left;
    padding: 8px;
    height: 60px;
}

th {
    background-color: #f1f1f1;
}

.edit-button {
    background-color: #FFF4D4;
    color: #FFB020;
    border: 1px solid #D6D6D6;
    border-radius: 5px;
    height: 25px;
    width: 25px;
    margin: auto 5px;
}

.delete-button {
    background-color: #FAD2D6;
    color: #B02A37;
    border: 1px solid #D6D6D6;
    border-radius: 5px;
    height: 25px;
    width: 25px;
    margin: auto;
}

.edit-icon,
.delete-icon {
    justify-self: center;
    height: 15px;
    width: 15px;
}

hr {
    color: #A0A0A0;
    padding: 0px;
    margin: 30px 0px;
}
</style>