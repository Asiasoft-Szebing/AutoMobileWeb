<!--Reusable Component (Dashbooard Overview Card)-->
<script setup>
import { watch, computed, onMounted } from "vue";
import { Angry, CalendarDays, ChartNoAxesColumn, CheckCheck, GripVertical, Hourglass, Pickaxe, Smile, ThumbsUp, TrendingDown, Siren, TrendingUp, X, UserRoundCog, UsersRound, UserRoundCheck, Warehouse } from "lucide-vue-next";

const emit = defineEmits(['updateMetrics']);
// Define props
const props = defineProps({
  name: String,
  value: {
    type: Number,
    default: 0,
  },
  previousValue: {
    type: Number,
    default: 0,
  },
});

// Log the props to verify data passed from the dashboard
console.log("Received props:", props);

// Watch the "value" prop for changes
watch(
  () => props.value,
  (newValue, oldValue) => {
    console.log(`Value changed from ${oldValue} to ${newValue}`);
  }
);

const handleDragHandleClick = (e) => {
  e.stopPropagation()
}

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

const title = computed(() => {
  if (props.name === "totalSales") {
    return "Total Sales";
  } else if (props.name === "totalAppointments") {
    return "Total Appointments";
  } else if (props.name === "totalMembers") {
    return "Total Members";
  } else if (props.name === "pendingAppointments") {
    return "Pending Appointments";
  } else if (props.name === "negativeFeedback") {
    return "Negative Feedback";
  } else if (props.name === "availableServiceBays") {
    return "Available Service Bay";
  } else if (props.name === "availableTechnicians") {
    return "Available Technician";
  } else if (props.name === "stockAlert") {
    return "Stock Alert";
  }
});



// Map icon names to actual icon components
const iconMap = {
  Hourglass,
  ThumbsUp,
  TrendingUp,
  TrendingDown,
  X,
  UserRoundCheck
};

const icon = computed(() => {
  if (props.name === "totalSales") {
    return ChartNoAxesColumn;
  } else if (props.name === "totalAppointments") {
    return CalendarDays;
  } else if (props.name === "totalMembers") {
    return UsersRound;
  } else if (props.name === "pendingAppointments") {
    return UserRoundCog;
  } else if (props.name === "negativeFeedback") {
    return props.value < 10 ? Smile : Angry;
  } else if (props.name === "availableServiceBays") {
    return Warehouse;
  } else if (props.name === "availableTechnicians") {
    return Pickaxe;
  } else if (props.name === "stockAlert") {
    return props.value >= 5 ? Siren : CheckCheck;
  }
});

const changeText = computed(() => {
  if (props.name === "totalSales") {
    if (props.previousValue !== null) {
      if (props.previousValue !== null) {
        if (props.previousValue > props.value) {
          return `Down by RM ${props.previousValue - props.value} from last month.`;// red
        }
        else {
          return `Up by RM ${props.value - props.previousValue} from last month.`; //blue
        }
      }
      else {
        return `Up by RM ${props.value - props.previousValue} from last month.`; //blue
      }
    }
  }
  else if (props.name === "totalAppointments") {
    if (props.previousValue !== null) {
      if (props.previousValue > props.value) {
        return `Down by ${props.previousValue - props.value} members from last month.`;// red
      }
      else {
        return `Up by ${props.value - props.previousValue} members from last month.`; //blue
      }
    }
    else {
      return `Up by ${props.value - props.previousValue} members from last month.`; //blue
    }
  }
  else if (props.name === "totalMembers") {
    if (props.previousValue !== null) {
      if (props.previousValue > props.value) {
        return "Low member count.";// red
      }
      else {
        return "Good member count!"; //blue
      }
    }
    else {
      return "Good member count!"; //blue
    }
  }
  else if (props.name === "pendingAppointments") {
    if (props.value <= 5) {
      return "Waiting for confirmation"; //blue
    }
    else if (props.value > 5 && props.value <= 10) {
      return "Please Review"; //yellow
    }
    else if (props.value > 10) {
      return "Action required";// red
    }
  }
  else if (props.name === "negativeFeedback") {
    if (props.value < 10) {
      return "Keep up the good work!"; //blue
    }
    else {
      return "Immediate action required";// red
    }
  }
  else if (props.name === "availableServiceBays") {
    if (props.value > 0) {
      return "Ready to assist"; //blue
    }
    else {
      return "No technicians available";// red
    }
  }
  else if (props.name === "availableTechnicians") {
    if (props.value > 0) {
      return "Ready for use"; //blue
    }
    else {
      return "No service bays available";// red
    }
  }
  else if (props.name === "stockAlert") {
    if (props.value >= 5) {
      return "Restock needed for key items";// red
    }
    else {
      return "All items in stock"; //blue
    }
  }
});

const statusbarcolor = computed(() => {
  if (props.name === "totalSales" || props.name === "totalAppointments" || props.name === "totalMembers") {
    if (props.previousValue !== null) {
      if (props.previousValue < props.value) {
        return "flex items-center justify-between bg-linear-to-r from-[#0080FF] to-[#79BCFF] text-white mt-4 px-3 py-2";// red
      }
      else {
        return "flex items-center justify-between bg-linear-to-r from-[#FF0000] to-[#FF8383] text-white mt-4 px-3 py-2"; //blue
      }
    }
    else {
      return "flex items-center justify-between bg-linear-to-r from-[#FF0000] to-[#FF8383] text-white mt-4 px-3 py-2"; //blue
    }
  }
  else if (props.name === "pendingAppointments") {
    if (props.value > 10) {
      return "flex items-center justify-between bg-linear-to-r from-[#FF0000] to-[#FF8383] text-white mt-4 px-3 py-2"; //blue
    }
    else if (props.value > 5 && props.value <= 10) {
      return "flex items-center justify-between bg-linear-to-r from-[#FF8000] to-[#FFC080] text-white mt-4 px-3 py-2"; //yellow
    }
    else if (props.value <= 5) {
      return "flex items-center justify-between bg-linear-to-r from-[#0080FF] to-[#79BCFF] text-white mt-4 px-3 py-2";// red
    }
  }
  else if (props.name === "negativeFeedback") {
    if (props.value >= 10) {
      return "flex items-center justify-between bg-linear-to-r from-[#FF0000] to-[#FF8383] text-white mt-4 px-3 py-2"; //blue
    }
    else {
      return "flex items-center justify-between bg-linear-to-r from-[#0080FF] to-[#79BCFF] text-white mt-4 px-3 py-2";// red
    }
  }
  else if (props.name === "availableServiceBays") {
    if (props.value <= 0) {
      return "flex items-center justify-between bg-linear-to-r from-[#FF0000] to-[#FF8383] text-white mt-4 px-3 py-2"; //blue
    }
    else {
      return "flex items-center justify-between bg-linear-to-r from-[#0080FF] to-[#79BCFF] text-white mt-4 px-3 py-2";// red
    }
  }
  else if (props.name === "availableTechnicians") {
    if (props.value <= 0) {
      return "flex items-center justify-between bg-linear-to-r from-[#FF0000] to-[#FF8383] text-white mt-4 px-3 py-2"; //blue
    }
    else {
      return "flex items-center justify-between bg-linear-to-r from-[#0080FF] to-[#79BCFF] text-white mt-4 px-3 py-2";// red
    }
  }
  else if (props.name === "stockAlert") {
    if (props.value < 5) {
      return "flex items-center justify-between bg-linear-to-r from-[#0080FF] to-[#79BCFF] text-white mt-4 px-3 py-2";// red
    }
    else {
      return "flex items-center justify-between bg-linear-to-r from-[#FF0000] to-[#FF8383] text-white mt-4 px-3 py-2"; //blue
    }
  }
});

const iconcolor = computed(() => {
  if (props.name === "totalSales" || props.name === "totalAppointments" || props.name === "totalMembers") {
    if (props.previousValue !== null) {
      if (props.previousValue < props.value) {
        return "text-[#0080FF]"; //red
      }
      else {
        return "text-[#FF0000]"; // blue
      }
    }
    else {
      return "text-[#FF0000]"; //blue
    }
  }
  else if (props.name === "pendingAppointments") {
    if (props.value > 10) {
      return "text-[#FF0000]"; //blue
    }
    else if (props.value > 5 && props.value <= 10) {
      return "text-[#FF8000]"; //yellow
    }
    else if (props.value <= 5) {
      return "text-[#0080FF]"; //red
    }
  }
  else if (props.name === "negativeFeedback") {
    if (props.value >= 10) {
      return "text-[#FF0000]"; //blue
    }
    else {
      return "text-[#0080FF]"; //red
    }
  }
  else if (props.name === "availableServiceBays") {
    if (props.value <= 0) {
      return "text-[#FF0000]"; //blue
    }
    else {
      return "text-[#0080FF]"; //red
    }
  }
  else if (props.name === "availableTechnicians") {
    if (props.value <= 0) {
      return "text-[#FF0000]"; //blue
    }
    else {
      return "text-[#0080FF]"; //red
    }
  }
  else if (props.name === "stockAlert") {
    if (props.value <= 5) {
      return "text-[#0080FF]"; //red
    }
    else {
      return "text-[#FF0000]"; //blue
    }
  }
});

const badgeBg = computed(() => {
  if (props.name === "totalSales" || props.name === "totalAppointments" || props.name === "totalMembers") {
    if (props.previousValue > props.value) {
      return "TrendingDown";
    }
    else {
      return "TrendingUp";
    }
  }
  else if (props.name === "pendingAppointments") {
    return "Hourglass";
  }
  else if (props.name === "negativeFeedback") {
    if (props.value < 10) {
      return "ThumbsUp";
    }
    else {
      return "";
    }
  }
  else if (props.name === "availableServiceBays") {
    if (props.value > 0) {
      return "ThumbsUp";
    }
    else {
      return "X";
    }
  }
  else if (props.name === "availableTechnicians") {
    if (props.value > 0) {
      return "UserRoundCheck";
    }
    else {
      return "X";
    }
  }
  else if (props.name === "stockAlert") {
    return "";
  }
});
</script>

<template>
  <div class="relative bg-white shadow-lg rounded-md p-0 w-full min-w-[250px] max-w-lg flex flex-col h-full">
    <div class="p-5 pb-1">
      <!-- Drag Handle -->
      <div class="absolute top-2 right-2 cursor-move" @mousedown.stop="handleDragHandleClick">
        <GripVertical class="text-gray-400 w-4 h-4" />
      </div>
      <!-- name -->
      <h3 class="text-black text-lg font-semibold">{{ title }}</h3>
      <!-- Value -->
      <div class="flex items-center justify-between mt-1" :class="iconcolor">
        <p class="text-5xl font-bold">{{ value }}</p>
        <component :is="icon" class="w-20 h-20" />
      </div>
    </div>
    <!-- Status/Change -->
    <div :class="statusbarcolor">
      <p class="text-xs">
        {{ changeText }}
      </p>
      <component v-if="badgeBg" :is="iconMap[badgeBg]" class="w-5 h-5" />
      <div v-else class="w-5 h-5" />
    </div>
  </div>
</template>

<style>
.vue-grid-item {
  transition: all 0.3s ease;
}

.vue-grid-item:not(.vue-grid-placeholder) {
  background: transparent;
  border-radius: 8px;
  overflow: visible;
  will-change: transform;
}
</style>