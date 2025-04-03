<script setup>
import { ref, computed } from 'vue';
import MainLayout from '../../layout/MainLayout.vue';
import FilterDialog from '../../components/FilterDialog.vue';
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
        payment: 'Paid',
        status: 'Completed'
    },
    {
        id: '00002',
        customer: 'Mario',
        service: 'Car Service',
        date: "03/14/2025",
        time: "11:00 AM",
        employee: 'Bob Lee',
        payment: 'Pending',
        status: 'Completed'
    },
    {
        id: '00003',
        customer: 'Dickson',
        service: 'Car Maintenance',
        date: "03/14/2025 ",
        time: "12:00 PM",
        employee: 'Anna Wong',
        payment: 'Paid',
        status: 'Completed'
    },
    {
        id: '00004',
        customer: 'Kenny',
        service: 'Car Wash',
        date: "03/14/2025 ",
        time: "01:00 PM",
        employee: 'Mike Tan',
        payment: 'Unpaid',
        status: 'Completed'
    },
    {
        id: '00005',
        customer: 'Gary',
        service: 'Car Maintenance',
        date: "03/14/2025 ",
        time: "04:00 PM",
        employee: 'Linda Chan',
        payment: 'Paid',
        status: 'Confirmed'
    },
    {
        id: '00006',
        customer: 'Johnny ',
        service: 'Car Wash', date: '03/17/2025 ',
        time: "09:00 AM",
        employee: 'Felicia Jong',
        payment: 'Pending',
        status: 'Confirmed'
    },
    {
        id: '00007',
        customer: 'Joseph Lim',
        service: 'Oil Change, Wheel Alignment',
        date: '03/19/2025',
        time: "09:00 AM",
        employee: 'Felicia Jong',
        payment: 'Pending',
        status: 'Confirmed'
    },
    {
        id: '00008',
        customer: 'Jane Smith',
        service: 'Battery Replacement',
        date: '03/25/2025 ',
        time: "11:00 AM",
        employee: 'Bob Lee',
        payment: 'Pending',
        status: 'Confirmed'
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
    selectedAppointmentStatus.value = Appointmentstatus.length ? appointmentstatus : ['All Status'];
    selectedPaymentStatus.value = Paymentstatus.length ? paymentstatus : ['All Status'];
    selectedWorkshop.value = Workshop.length ? workshop : ['All Workshop'];
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
        <!-- Main -->
        <div class="flex justify-between items-center mb-4">
            <!-- Title-->
            <h2 class="headline-text-md">Appointment</h2>
            <!-- Button -->
            <div class="flex gap-4">
                <!-- Filter Button -->
                <button class="flex items-center gap-1 justify-center button-sm button-default">
                    <span class="material-icons">filter_list</span>
                    <span>Filter</span>
                </button>
                <!-- Add Button -->
                <button class="flex items-center gap-1 justify-center button-md button-primary">
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
                        <span
                            :class="appointment.payment ? 'status-success-chip body-text-sm' : 'status-error-chip body-text-sm'"
                            class="px-2 py-1 rounded-sm">
                            {{ appointment.payment ? 'Paid' : 'Failed' }}
                        </span>
                    </td>
                    <td class="p-2">
                        <span
                            :class="appointment.status ? 'status-success-chip body-text-sm' : 'status-error-chip body-text-sm'"
                            class="px-2 py-1 rounded-sm">
                            {{ appointment.status ? 'Confirmed' : 'Cancelled' }}
                        </span>
                    </td>
                    <td class="flex">
                        <button class="button-icon button-primary mr-2">
                            <span class="material-icons"> visibility </span>
                        </button>
                        <button class="button-icon button-warning">
                            <span class="material-icons "> edit </span>
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