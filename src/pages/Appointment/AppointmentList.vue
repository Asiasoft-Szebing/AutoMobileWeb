<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Pagination from '../../components/Pagination.vue';
import StatusBadge from '../../components/StatusBadge.vue';
import MainLayout from '../../layout/MainLayout.vue';
import { Edit, ListFilter, Plus, Search, Trash2 } from 'lucide-vue-next';

const router = useRouter();
const searchQuery = ref('');
const currentPage = ref(1);
const pageSize = ref(10);

const appointments = ref([
    {
        id: '00001',
        customer: 'Johnson',
        service: 'Car Wash',
        date: "03/14/2025 09:00 AM",
        employee: 'Felicia Jong',
        payment: 'Paid',
        status: 'Completed'
    },
    {
        id: '00002',
        customer: 'Mario',
        service: 'Car Service',
        date: "03/14/2025 11:00 AM",
        employee: 'Bob Lee',
        payment: 'Pending',
        status: 'Completed'
    },
    {
        id: '00003',
        customer: 'Dickson',
        service: 'Car Maintenance',
        date: "03/14/2025 12:00 PM",
        employee: 'Anna Wong',
        payment: 'Paid',
        status: 'Completed'
    },
    {
        id: '00004',
        customer: 'Kenny',
        service: 'Car Wash',
        date: "03/14/2025 01:00 PM",
        employee: 'Mike Tan',
        payment: 'Unpaid',
        status: 'Completed'
    },
    {
        id: '00005',
        customer: 'Gary',
        service: 'Car Maintenance',
        date: "03/14/2025 04:00 PM",
        employee: 'Linda Chan',
        payment: 'Paid',
        status: 'Confirmed'
    },
    { id: '00006', customer: 'Johnny ', service: 'Car Wash', date: '03/17/2025 09:00 AM', employee: 'Felicia Jong', payment: 'Pending', status: 'Confirmed' },
    { id: '00007', customer: 'Joseph Lim', service: 'Oil Change, Wheel Alignment', date: '03/19/2025 09:00 AM', employee: 'Felicia Jong', payment: 'Pending', status: 'Confirmed' },
    { id: '00008', customer: 'Jane Smith', service: 'Battery Replacement', date: '03/25/2025 11:00 AM', employee: 'Bob Lee', payment: 'Pending', status: 'Confirmed' },

]);

const filteredAppointments = computed(() => {
    if (!searchQuery.value) {
        return appointments.value;
    }
    return appointments.value.filter(appointment =>
        appointment.customer.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

function handleRowClick(appointment) {
    try {
        console.log(appointment.id);
        // Navigate to the AppointmentDetails page with the item ID as a route parameter
        router.push({ name: 'AppointmentDetails', query: { id: appointment.id } });
    }
    catch (error) {
        appointment.id = error.message;
    }
}
</script>

<template>
    <MainLayout>
        <div class="flex justify-between items-center mb-4">
            <!-- Title-->
            <h2 class="text-2xl font-bold">Appointments</h2>
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
                    <Plus /> New Appointment
                </button>
            </div>
        </div>
        <div class="flex justify-between items-center mb-4">
            <!-- Search -->
            <div class="relative">
                <input type="text" class="form-input" placeholder="Search by customer name" v-model="searchQuery">
                <Search class="input-icon" />
                </input>
            </div>
            <!-- Show results -->
            <!-- <p class="table-result"> Showing 1-10 of 36 results</p> -->
        </div>
        <table class="w-full bg-white rounded-lg shadow-md">
            <thead>
                <tr class="bg-gray-100">
                    <th class="p-2">ID</th>
                    <th class="p-2">Customer</th>
                    <th class="p-2">Service</th>
                    <th class="p-2">Date & Time</th>
                    <th class="p-2">Employee</th>
                    <th class="p-2">Payment</th>
                    <th class="p-2">Status</th>
                    <th class="p-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b hover:bg-gray-50" v-for="appointment in filteredAppointments" :key="appointment.id"
                    @click="handleRowClick(appointment)">
                    <td class="px-4 py-3">{{ appointment.id }}</td>
                    <td class="px-4 py-3">{{ appointment.customer }}</td>
                    <td class="px-4 py-3">{{ appointment.service }}</td>
                    <td class="px-4 py-3">{{ appointment.date }}</td>
                    <td class="px-4 py-3">{{ appointment.employee }}</td>
                    <td class="px-4 py-3">
                        <StatusBadge :status="appointment.payment" />
                    </td>
                    <td class="px-4 py-3">
                        <StatusBadge :status="appointment.status" />
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
        <hr />
        <Pagination :total="filteredAppointments.length" :pageSize="pageSize" v-model:currentPage="currentPage" />
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

tr:hover {
    background-color: #f1f5f9;
}

.cursor-pointer {
    cursor: pointer;
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