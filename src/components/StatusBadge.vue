<template>
    <span :class="[
        'px-2 py-1 text-white',
        statusClasses[status] || 'bg-gray-400'
    ]">
        {{ status }}
    </span>
</template>

<script setup>
const props = defineProps({
    status: String,
});

const statusClasses = {
    Paid: 'bg-green-500',
    Pending: 'bg-yellow-500',
    Failed: 'bg-red-500',
    Completed: 'bg-green-500',
    'No Show': 'bg-gray-400',
    Cancelled: 'bg-red-500',
    Confirmed: 'bg-green-500',
    Rescheduled: 'bg-blue-400',
};
</script>