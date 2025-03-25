<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  Status: Array,
  Category: Array,
});


const emit = defineEmits(["close", "apply"]);

const handleCancel = () => {
  emit("close");
};

const applyFilter = () => {
  emit("apply", {
    status: selectedStatus.value,
    category: selectedCategory.value,
  });
};

const availableStatus = ref(['All Status', 'Active', 'Inactive']);
const availableCategory = ref(['All Category', 'Cleaning', 'Maintenance', 'Repair & Fixing', 'Upgrades']);

// Selected values
const selectedStatus = ref(props.Status && props.Status.length ? props.Status : ['All Status']);
const selectedCategory = ref(props.Category && props.Category.length ? props.Category : ['All Category']);

// Watch for prop changes (if parent updates the values)
watch(() => props.Status, (newValue) => {
  selectedStatus.value = newValue && newValue.length ? newValue : ['All Status'];
});
watch(() => props.Category, (newValue) => {
  selectedCategory.value = newValue && newValue.length ? newValue : ['All Category'];
});


// clear filter 
const clearFilter = () => {
  selectedStatus.value = ['All Status'];
  selectedCategory.value = ['All Category'];
}
</script>

<style>
/* Prevent modal click from propagating to the background */
div[role="dialog"] {
  position: relative;
}
</style>

<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal-container">
      <div class="flex justify-between mb-2">
        <!-- Modal Title-->
        <h2 class="headline-text-md ">Filter</h2>
        <!-- Close Button -->
        <button @click="handleCancel">
          <span class="material-icons"> close </span>
        </button>
      </div>
      <!-- line -->
      <hr class="modal-hr" />
      <!--Content-->
      <div class="modal-filter-content">
        <label class="label-text-md mb-2"> Status </label>
        <select v-model="selectedStatus[0]" class="select-textbox">
          <option v-for="status in availableStatus" :key="status" :value="status"> {{ status }} </option>
        </select>

        <label class="label-text-md mt-4 mb-2"> Category </label>
        <select v-model="selectedCategory[0]" class="select-textbox">
          <option v-for="category in availableCategory" :key="category" :value="category"> {{ category }} </option>
        </select>
      </div>
      <!-- line -->
      <hr class="modal-hr" />
      <!-- button -->
      <div class="flex justify-between items-center mt-4">
        <!-- Clear Filter -->
        <a @click.prevent="clearFilter" class="reset-button">Clear Filter</a>
        <!-- Apply button -->
        <button @click="applyFilter" class="button-sm button-primary">Apply</button>
      </div>
    </div>
  </div>
</template>