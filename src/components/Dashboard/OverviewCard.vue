<script setup>
import { watch, computed, onMounted } from 'vue';

const props = defineProps({
    name: String,
    value: { type: Number, default: 0 },
    previousValue: { type: Number, default: 0 },
});

const metricsConfig = {
    totalSales: {
        title: "Total Sales",
        icon: "monitoring",
        changeText: (prev, current) => `RM ${Math.abs(current - prev)} from last month.`,
        statusbarcolor: (prev, current) => (current >= prev ? "card-primary" : "card-error"),
        iconColor: (prev, current) => (current >= prev ? "text-primary" : "text-error"),
        badgeBg: (prev, current) => (current >= prev ? "trending_up" : "trending_down"),
    },
    totalAppointments: {
        title: "Total Appointments",
        icon: "date_range",
        changeText: (prev, current) => `${Math.abs(current - prev)} from last month.`,
        statusbarcolor: (prev, current) => (current >= prev ? "card-primary" : "card-error"),
        iconColor: (prev, current) => (current >= prev ? "text-primary" : "text-error"),
        badgeBg: (prev, current) => (current >= prev ? "trending_up" : "trending_down"),
    },
    totalMembers: {
        title: "Total Members",
        icon: "group",
        changeText: (prev, current) => (current > prev ? "Good member count!" : "Low member count."),
        statusbarcolor: (prev, current) => (current > prev ? "card-primary" : "card-error"),
        iconColor: (prev, current) => (current > prev ? "text-primary" : "text-error"),
        badgeBg: (prev, current) => (current > prev ? "thumb_up" : "close_small"),
    },
    pendingAppointments: {
        title: "Pending Appointments",
        icon: "manage_accounts",
        changeText: (current) =>
            current > 10 ? "Action required" : current > 5 ? "Please Review" : "Waiting for confirmation",
        statusbarcolor: (current) =>
            current > 10 ? "card-error" : current > 5 ? "card-warning" : "card-primary ",
        iconColor: (current) =>
            current > 10 ? "text-error" : current > 5 ? "text-warning" : "text-primary",
        badgeBg: "hourglass_top",
    },
    negativeFeedback: {
        title: "Negative Feedback",
        icon: computed(() => (props.value < 10 ? "sentiment_satisfied" : "sentiment_dissatisfied")),
        changeText: (current) =>
            current < 10 ? "Keep up the good work!" : "Immediate action required",
        statusbarcolor: (current) => (current < 10 ? "card-primary" : "card-error"),
        iconColor: (current) => (current < 10 ? "text-primary" : "text-error"),
    },
    availableServiceBays: {
        title: "Available Service Bays",
        icon: "warehouse",
        changeText: (current) => (current > 0 ? "Ready for use" : "No service bays available"),
        statusbarcolor: (current) => (current > 0 ? "card-primary" : "card-error"),
        iconColor: (current) => (current > 0 ? "text-primary" : "text-error"),
        badgeBg: (current) => (current > 0 ? "done_all" : "close_small"),
    },
    availableTechnicians: {
        title: "Available Technicians",
        icon: "engineering",
        changeText: (current) => (current > 0 ? "Ready to assist" : "No technicians available"),
        statusbarcolor: (current) => (current > 0 ? "card-primary" : "card-error"),
        iconColor: (current) => (current > 0 ? "text-primary" : "text-error"),
        badgeBg: (current) => (current > 0 ? "person_check" : "close_small"),
    },
    stockAlert: {
        title: "Stock Alert",
        icon: computed(() => (props.value >= 5 ? "siren" : "done_all")),
        changeText: (current) => (current >= 5 ? "Restock needed" : "All items in stock"),
        statusbarcolor: (current) => (current >= 5 ? "card-error" : "card-primary"),
        iconColor: (current) => (current >= 5 ? "text-error" : "text-primary"),
    },
};


// Get dynamic properties
const config = computed(() => metricsConfig[props.name] || {});
const title = computed(() => config.value.title || "Unknown Metric");
const icon = computed(() => (typeof config.value.icon === "function" ? config.value.icon() : config.value.icon));
const changeText = computed(() => {
    if (typeof config.value.changeText === "function") {
        return config.value.changeText(props.value);
    }
});
const statusbarcolor = computed(() => {
    if (typeof config.value.statusbarcolor === "function") {
        return config.value.statusbarcolor(props.value);
    }
});
const iconcolor = computed(() => {
    if (typeof config.value.iconColor === "function") {
        return config.value.iconColor(props.value);
    }
});
const badgeBg = computed(() => {
    if (typeof config.value.badgeBg === "function") {
        return config.value.badgeBg(props.value);
    }
});

const handleDragHandleClick = (e) => {
    e.stopPropagation()
}

// Watch the "value" prop for changes
watch(
    () => props.value,
    (newValue, oldValue) => {
        console.log(`Value changed from ${oldValue} to ${newValue}`);
    }
);

onMounted(() => {
    const cards = document.querySelectorAll('.dashboard-card')
    cards.forEach(card => {
        card.querySelectorAll('*').forEach(child => {
            if (!child.classList.contains('cursor-move')) {
                child.style.pointerEvents = 'none'
            }
        })
    })
})
</script>

<template>
    <div class="shadow-lg overview-card">
        <div class="p-5 pb-1">
            <!-- Drag Handle -->
            <div class="drag-indicator" @mousedown.stop="handleDragHandleClick">
                <span class="material-symbols-outlined">
                    drag_indicator
                </span>
            </div>
            <!-- name -->
            <h3 class="body2-text-md">{{ title }}</h3>
            <!-- Value -->
            <div class="flex items-center justify-between my-4">
                <p class="display-text-sm">{{ value }}</p>
                <span class="material-symbols-outlined card-icon" :class="iconcolor"
                    :style="{fontVariationSettings: `'FILL' 1` }">
                    {{ icon }}
                </span>
            </div>
        </div>
        <!-- Status/Change -->
        <div :class="statusbarcolor">
            <p class="body-text-sm ">
                {{ changeText }}
            </p>
            <span v-if="badgeBg" class="material-symbols-outlined">
                {{ badgeBg }}
            </span>
            <span v-else class="h-6 w-5"></span>
        </div>
    </div>
</template>