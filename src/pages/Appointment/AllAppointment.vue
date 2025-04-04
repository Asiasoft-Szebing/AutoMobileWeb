<script setup>
import { ref, computed } from 'vue';
import MainLayout from '../../layout/MainLayout.vue';
import FilterDialog from '../../components/FilterDialog.vue';
import NewAppointmentDialog from '../../components/Appointment/NewAppointmentDialog.vue';
import UpdateAppointmentStatusDialog from '../../components/Appointment/UpdateAppointmentStatusDialog.vue';
import Pagination from '../../components/Pagination.vue';

const searchQuery = ref('');
const currentPage = ref(1);
const pageSize = ref(10);

const appointmentList = ref([
    {
        id: '00001',
        customer: 'Johnson',
        service: 'Car Wash',
        date: "03/14/2025",
        time: "09:00 AM",
        employee: 'Felicia Jong',
        paymentstatus: 'Paid',
        appointmentstatus: 'Completed'
    },
    {
        id: '00002',
        customer: 'Mario',
        service: 'Car Service',
        date: "03/14/2025",
        time: "11:00 AM",
        employee: 'Bob Lee',
        paymentstatus: 'Pending',
        appointmentstatus: 'Completed'
    },
    {
        id: '00003',
        customer: 'Dickson',
        service: 'Car Maintenance',
        date: "03/14/2025 ",
        time: "12:00 PM",
        employee: 'Anna Wong',
        paymentstatus: 'Paid',
        appointmentstatus: 'Completed'
    },
    {
        id: '00004',
        customer: 'Kenny',
        service: 'Car Wash',
        date: "03/14/2025 ",
        time: "01:00 PM",
        employee: 'Mike Tan',
        paymentstatus: 'Failed',
        appointmentstatus: 'Completed'
    },
    {
        id: '00005',
        customer: 'Gary',
        service: 'Car Maintenance',
        date: "03/14/2025 ",
        time: "04:00 PM",
        employee: 'Linda Chan',
        paymentstatus: 'Paid',
        appointmentstatus: 'Confirmed'
    },
    {
        id: '00006',
        customer: 'Johnny ',
        service: 'Car Wash', date: '03/17/2025 ',
        time: "09:00 AM",
        employee: 'Felicia Jong',
        paymentstatus: 'Pending',
        appointmentstatus: 'Confirmed'
    },
    {
        id: '00007',
        customer: 'Joseph Lim',
        service: 'Oil Change, Wheel Alignment',
        date: '03/19/2025',
        time: "09:00 AM",
        employee: 'Felicia Jong',
        paymentstatus: 'Pending',
        appointmentstatus: 'Confirmed'
    },
    {
        id: '00008',
        customer: 'Jane Smith',
        service: 'Battery Replacement',
        date: '03/25/2025 ',
        time: "11:00 AM",
        employee: 'Bob Lee',
        paymentstatus: 'Pending',
        appointmentstatus: 'Confirmed'
    },
]);

// Filter Function
const selectedAppointmentStatus = ref(['All Status']);
const selectedPaymentStatus = ref(['All Status']);
const selectedWorkshop = ref(['All Workshop']);
const showFilter = ref(false);

const openFilter = () => {
    showFilter.value = true;
}

const closeFilter = () => {
    showFilter.value = false;
}

// Handle applied filter 
const applyFilter = ({ appointmentstatus, paymentstatus, workshop }) => {
    selectedAppointmentStatus.value = appointmentstatus.length ? appointmentstatus : ['All Status'];
    selectedPaymentStatus.value = paymentstatus.length ? paymentstatus : ['All Status'];
    selectedWorkshop.value = workshop.length ? workshop : ['All Workshop'];
    closeFilter();;
};

// Search Function
const filteredAppointment = computed(() => {
    return appointmentList.value.filter(appointment => {
        const matchName = !searchQuery.value || appointment.customer.toLowerCase().includes(searchQuery.value.toLowerCase());

        const matchAppointmentStatus = selectedAppointmentStatus.value.includes('All Status') ||
            selectedAppointmentStatus.value.includes(appointment.appointmentstatus);

        const matchPaymentStatus = selectedPaymentStatus.value.includes('All Status') ||
            selectedAppointmentStatus.value.includes(appointment.paymentstatus);

        const matchWorkshop = selectedWorkshop.value.includes('All Workshop') ||
            selectedWorkshop.value.includes(appointment.Workshop);

        return matchName && matchAppointmentStatus && matchPaymentStatus && matchWorkshop;
    });
});

// Sorting Function
const sortColumn = ref('');
const sortDirection = ref('asc');

const applySorting = computed(() => {
    if (!sortColumn)
        return filteredAppointment.value;

    return [...filteredAppointment.value].sort((a, b) => {
        let valA = a[sortColumn.value];
        let valB = b[sortColumn.value];

        if (sortColumn === 'status') {
            valA = a.status ? 1 : 0;
            valB = b.status ? 1 : 0;
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

// Add New Appointment
const addNewAppointment = ref(false);

const openAddNewAppointment = () => {
    addNewAppointment.value = true;
}

const closeAddNewAppointment = () => {
    addNewAppointment.value = false;
}

// Update Appointment Status
const updateAppointmentStatus = ref(false);

const openUpdateAppointmentStatus = (appointment) => {
    if (appointment.appointmentstatus === "Completed") {
        return;
    }

    updateAppointmentStatus.value = true;
}

const closeUpdateAppointmentStatus = () => {
    updateAppointmentStatus.value = false;
}

// Calculate total pages based on filtered services
const totalPages = computed(() => {
    return Math.ceil(filteredAppointment.value.length / pageSize.value);
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
            { label: 'Appointment Status', key: 'appointmentstatus', options: ['All Status', 'Cancelled', 'Closed', 'Completed', 'Confirmed', 'Not Present', 'Pending', 'Rescheduled', 'Upcooming'], selected: ['All Status'] },
            { label: 'Payment Status', key: 'paymentstatus', options: ['All Status', 'Cancelled', 'Failed', 'Paid', 'Pending', 'Refund'], selected: ['All Status'] },
            { label: 'Workshop', key: 'workshop', options: ['All Workshop', 'Workshop 1', 'Workshop 2'], selected: ['All Workshop'] },
        ]" @close="closeFilter" @apply="applyFilter">
        </FilterDialog>
        <!-- Add New Appointment -->
        <NewAppointmentDialog :isOpen="addNewAppointment" @close="closeAddNewAppointment" />
        <!-- Update Appointment Status -->
        <UpdateAppointmentStatusDialog :isOpen="updateAppointmentStatus" @close="closeUpdateAppointmentStatus" />
        <!-- Main -->
        <div class="flex justify-between items-center mb-4">
            <!-- Title-->
            <h2 class="headline-text-md">Appointment</h2>
            <!-- Button -->
            <div class="flex gap-4">
                <!-- Filter Button -->
                <button class="flex items-center gap-1 justify-center button-sm button-default" @click="openFilter">
                    <span class="material-icons">filter_list</span>
                    <span>Filter</span>
                </button>
                <!-- Add Button -->
                <button class="flex items-center gap-1 justify-center button-md button-primary"
                    @click="openAddNewAppointment">
                    <span>New Appointment</span>
                </button>
            </div>
        </div>
        <!-- Search -->
        <div class="relative my-8">
            <span class="material-icons search-icon">search</span>
            <input type="text" class="search-textbox" placeholder="Search by customer name" v-model="searchQuery">
            </input>
        </div>
        <!--Table-->
        <table class="table-primary">
            <thead class="body-text-md">
                <tr>
                    <th> ID </th>
                    <th @click="sortBy('customer')" class="sorting-th">
                        Customer
                        <span class="material-icons ml-3" v-if="sortColumn === 'customer'">unfold_more</span>
                    </th>
                    <th> Service </th>
                    <th @click="sortBy('datetime')" class="sorting-th">
                        Date & Time
                        <span class="material-icons ml-3" v-if="sortColumn === 'datetime'">unfold_more</span>
                    </th>
                    <th> Technician </th>
                    <th> Pay. Status </th>
                    <th> Status </th>
                    <th> Actions </th>
                </tr>
            </thead>
            <tbody class="body-text-sm">
                <tr v-if="applySorting.length === 0">
                    <td colspan="8" class="empty-list-td body2-text-md ">Empty List</td>
                </tr>
                <tr v-for="appointment in applySorting" :key="applySorting.id">
                    <td> {{ appointment.id }} </td>
                    <td> {{ appointment.customer }} </td>
                    <td> {{ appointment.service }} </td>
                    <td>
                        <p> {{ appointment.date }} </p>
                        <p> {{ appointment.time }}</p>
                    </td>
                    <td> {{ appointment.employee }} </td>
                    <td>
                        <div v-if="appointment.paymentstatus === 'Paid'">
                            <span class="status-success-chip body-text-sm px-2 py-1 rounded-md"> Paid </span>
                        </div>
                        <div v-if="appointment.paymentstatus === 'Failed'">
                            <span class="status-error-chip body-text-sm px-2 py-1 rounded-md"> Failed </span>
                        </div>
                        <div v-if="appointment.paymentstatus === 'Pending'">
                            <span class="status-warning-chip  body-text-sm px-2 py-1 rounded-md"> Pending </span>
                        </div>
                        <div v-if="appointment.paymentstatus === 'Refund'">
                            <span class="status-default-chip body-text-sm px-2 py-1 rounded-md"> Refund </span>
                        </div>
                        <div v-if="appointment.paymentstatus === 'Cancelled'">
                            <span class="status-info-chip body-text-sm px-2 py-1 rounded-md"> Cancelled </span>
                        </div>
                    </td>
                    <td class="p-2">
                        <div v-if="appointment.appointmentstatus === 'Completed'">
                            <span class="status-green-chip body-text-sm px-2 py-1 rounded-md"> Completed </span>
                        </div>
                        <div v-if="appointment.appointmentstatus === 'Confirmed'">
                            <span class="status-success-chip body-text-sm px-2 py-1 rounded-md"> Confirmed </span>
                        </div>
                        <div v-if="appointment.appointmentstatus === 'Cancelled'">
                            <span class="status-error-chip body-text-sm px-2 py-1 rounded-md"> Cancelled </span>
                        </div>
                        <div v-if="appointment.appointmentstatus === 'Pending'">
                            <span class="status-warning-chip body-text-sm px-2 py-1 rounded-md"> Pending </span>
                        </div>
                        <div v-if="appointment.appointmentstatus === 'Not Present'">
                            <span class="status-default-chip body-text-sm px-2 py-1 rounded-md"> Not Present </span>
                        </div>
                        <div v-if="appointment.appointmentstatus === 'Rescheduled'">
                            <span class="status-info-chip body-text-sm px-2 py-1 rounded-md"> Rescheduled </span>
                        </div>
                    </td>
                    <td class="flex space-x-2 items-center h-full" style="padding: 25px;">
                        <button class="button-icon button-icon-primary">
                            <span class="material-symbols-outlined"> visibility </span>
                        </button>
                        <button class="button-icon button-warning" @click="openUpdateAppointmentStatus(appointment)"  :disabled="appointment.appointmentstatus === 'Completed' ">
                            <span class="material-symbols-outlined"> edit </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <hr />
        <Pagination :total="applySorting.length" :pageSize="pageSize" :currentPage="currentPage"
            :totalPages="totalPages" @page-change="onPageChange" />
    </MainLayout>
</template>