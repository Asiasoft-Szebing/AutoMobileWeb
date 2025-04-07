<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import MainLayout from '../../layout/MainLayout.vue';

const router = useRouter();
const route = useRoute();
const item = ref(null);
const id = route.query.id || "";

const appointments = [
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

];


onMounted(() => {
    const id = route.query.id;
    console.log('Received ID:', id);
    console.log('All appointments:', appointments);

    item.value = appointments.find(appointment =>
        appointment.id === id
    );

    if (!item.value) {
        console.error(`Appointment with ID ${id} not found`);
    }
});
</script>

<template>
    <MainLayout>
        <div v-if="item">
            <!-- Header -->
            <div class="mb-6 flex items-center justify-between">
                <h1 class="text-2xl font-bold text-gray-900">Appointment</h1>
                <div class="flex gap-4">
                    <!-- Back Button -->
                    <button class="flex items-center gap-1 justify-center button-sm button-default"
                        @click="$router.go(-1)">
                        <span class="material-icons">chevron_left</span>
                        <span>Back</span>
                    </button>
                    <!-- Cancel -->
                    <button class="flex items-center gap-2 justify-center button-outline-error">
                        <span>Cancel</span>
                    </button>
                    <!-- Rescheduled -->
                    <button class="flex items-center gap-2 justify-center button-md button-primary">
                        <span>Rescheduled</span>
                    </button>
                    <!-- Confirm -->
                    <button class="flex items-center gap-2 justify-center button-sm button-primary">
                        <span>Confirm </span>
                    </button>
                </div>
            </div>

            <!-- Info Cards -->
            <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <!-- Appointment Card -->
                <div class="rounded-lg bg-white p-4 shadow-sm">
                    <h2 class="mb-3 text-lg font-semibold text-gray-800">
                        Appointment Info #{{ item.id }}
                    </h2>
                    <div class="space-y-2 text-sm">
                        <div>
                            <label class="text-gray-500">Date & Time</label>
                            <p class="font-medium text-gray-700">{{ item.date }}</p>
                        </div>
                        <div>
                            <label class="text-gray-500">Employee</label>
                            <p class="font-medium text-gray-700">{{ item.employee }}</p>
                        </div>
                        <div>
                            <label class="text-gray-500">Workshop</label>
                            <p class="font-medium text-gray-700">Regas Premium Auto Sdn Bhd</p>
                        </div>
                        <div class="mb-0">
                            <label class="text-gray-500">Status</label>
                        </div>
                        <div class="mt-0">
                            <span
                                class="inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>
                        </div>
                        <div>
                            <label class="text-gray-500">Provided Note</label>
                            <p class="text-gray-700">Please check the tyre pressure</p>
                        </div>
                    </div>
                </div>

                <!-- Customer Details -->
                <div class="rounded-lg bg-white p-4 shadow-sm">
                    <h2 class="mb-3 text-lg font-semibold text-gray-800">Customer Details</h2>
                    <div class="space-y-2 text-sm">
                        <div>
                            <label class="text-gray-500">ID</label>
                            <p class="font-medium text-gray-700">CUST-20240315-001</p>
                        </div>
                        <div>
                            <label class="text-gray-500">Name</label>
                            <p class="font-medium text-gray-700">{{ item.customer }}</p>
                        </div>
                        <div class="mb-0">
                            <label class="text-gray-500">Member Tier</label>
                        </div>
                        <div class="mt-0">
                            <span
                                class="inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium bg-amber-100 text-amber-800">Gold
                                VIP</span>
                        </div>
                        <div>
                            <label class="text-gray-500">Phone</label>
                            <p class="font-medium text-gray-700">016 888 8888</p>
                        </div>
                        <div>
                            <label class="text-gray-500">Email</label>
                            <p class="text-blue-600 hover:underline">joseph@gmail.com</p>
                        </div>
                    </div>
                </div>

                <!-- Vehicle Info -->
                <div class="rounded-lg bg-white p-4 shadow-sm">
                    <h2 class="mb-3 text-lg font-semibold text-gray-800">Vehicle Info</h2>
                    <div class="space-y-2 text-sm">
                        <div>
                            <label class="text-gray-500">Brand</label>
                            <p class="font-medium text-gray-700">Porsche</p>
                        </div>
                        <div>
                            <label class="text-gray-500">Model</label>
                            <p class="font-medium text-gray-700">Taycan 4S</p>
                        </div>
                        <div>
                            <label class="text-gray-500">Model Year</label>
                            <p class="font-medium text-gray-700">2023</p>
                        </div>
                        <div>
                            <label class="text-gray-500">Plate No</label>
                            <p class="font-medium text-gray-700">QAB 1234 A</p>
                        </div>
                        <div>
                            <label class="text-gray-500">Mileage</label>
                            <p class="font-medium text-gray-700">30,020</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Items Table -->
            <div class="mb-6 rounded-lg bg-white p-4 shadow-sm">
                <h2 class="mb-3 text-lg font-semibold text-gray-800">ITEMS</h2>
                <div class="overflow-x-auto">
                    <table class="w-full min-w-[600px]">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">#</th>
                                <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Items</th>
                                <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Duration</th>
                                <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Price</th>
                                <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Member Price</th>
                                <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Total</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr>
                                <td class="px-4 py-3 font-medium text-gray-700">S0004</td>
                                <td class="px-4 py-3 text-gray-600">Windshield Crack Repair (Front Windshield)</td>
                                <td class="px-4 py-3 text-gray-600">90 mins</td>
                                <td class="px-4 py-3 text-gray-600">RM 500.00</td>
                                <td class="px-4 py-3 text-gray-600">RM 480.00</td>
                                <td class="px-4 py-3 font-medium text-gray-700">RM 485.00</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-medium text-gray-700">S0002</td>
                                <td class="px-4 py-3 text-gray-600">Car Wash (Premium Hand Wash - Large)</td>
                                <td class="px-4 py-3 text-gray-600">40 mins</td>
                                <td class="px-4 py-3 text-gray-600">RM 35.00</td>
                                <td class="px-4 py-3 text-gray-600">RM 30.00</td>
                                <td class="px-4 py-3 font-medium text-gray-700">RM 30.00</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-medium text-gray-700">S0008</td>
                                <td class="px-4 py-3 text-gray-600">Interior Detailing (Standard Package)</td>
                                <td class="px-4 py-3 text-gray-600">60 mins</td>
                                <td class="px-4 py-3 text-gray-600">RM 85.00</td>
                                <td class="px-4 py-3 text-gray-600"> - </td>
                                <td class="px-4 py-3 font-medium text-gray-700">RM 85.00</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td class="px-4 py-3 text-gray-500 text-right">Items Subtotal</td>
                                <td class="px-4 py-3 font-medium ">RM 600.00</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td class="px-4 py-3 text-gray-500 text-right">Discount</td>
                                <td class="px-4 py-3 text-red-600 font-medium">- RM 15.30</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td class="px-4 py-3 text-gray-500 text-right">Total</td>
                                <td class="px-4 py-3 text-xl font-bold text-gray-900">RM 584.70</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- Payment Details -->
            <div class="col-span-4 mb-6 rounded-lg bg-white p-4 shadow-sm">
                <h2 class="mb-3 text-lg font-semibold text-gray-800">Payment Details</h2>
                <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                        <label class="text-gray-500">Payment Method</label>
                        <p class="font-medium">Direct Bank Transfer</p>
                    </div>
                    <div>
                        <div>
                            <label class="text-gray-500">Payment Status</label>
                        </div>
                        <div>
                            <span
                                class="inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
                                Pending</span>
                        </div>
                    </div>

                    <div>
                        <label class="text-gray-500">Transaction Date & Time</label>
                        <p class="font-medium">2025-03-10 20:53:41</p>
                    </div>
                    <div class="md:col-span-3">
                        <label class="text-gray-500">Transaction Ref</label>
                        <p class="font-medium text-blue-600">R2258-6685-001</p>
                    </div>
                </div>
            </div>

            <!-- Remarks Table -->
            <div class="rounded-lg bg-white p-4 shadow-sm">
                <h2 class="mb-3 text-lg font-semibold text-gray-800">Remarks</h2>
                <div class="space-y-4">
                    <table class="w-full min-w-[600px]">
                        <thead class="bg-gray-50 px-0 mx-0">
                            <tr>
                                <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Date & Time</th>
                                <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Remark</th>
                                <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Action by</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr>
                                <td class="px-4 py-3 font-medium text-gray-700">2025-03-12 09:00:06</td>
                                <td class="px-4 py-3 text-gray-600">Customer prefers early morning appointments.</td>
                                <td class="px-4 py-3 text-gray-500"> Alice</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-medium text-gray-700">2025-03-12 11:32:16</td>
                                <td class="px-4 py-3 text-gray-600">Previous complaint about delay in service on
                                    2024-12-10, resolved
                                    with
                                    a free upgrade.</td>
                                <td class="px-4 py-3 text-gray-600">Alice</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </MainLayout>
</template>

<style>
.button {
    display: inline-flex;
    align-items: items-center;
    border-radius: 8px;
    padding: 8px 4px;
    font-size: small;
    font-weight: 400;
}
</style>