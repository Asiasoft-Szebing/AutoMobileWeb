<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  filters: Array,
});


const emit = defineEmits(["close", "apply"]);

const handleCancel = () => {
  emit("close");
};

// Selected values
const selectedFilters = ref({});

// Initialize selected filters from props
watch(
  () => props.filters,
  (newFilters) => {
    if (Object.keys(selectedFilters.value).length === 0) {
      // Initialize only if selectedFilters is empty
      selectedFilters.value = newFilters.reduce((acc, filter) => {
        acc[filter.key] = filter.selected.length ? filter.selected : [filter.options[0]];
        return acc;
      }, {});
    }
  },
  { immediate: true } // Run on first load
);

// Apply filter
const applyFilter = () => {
  emit("apply", selectedFilters.value);
};

// Clear filters
const clearFilter = () => {
  Object.keys(selectedFilters.value).forEach((key) => {
    selectedFilters.value[key] = [props.filters.find((f) => f.key === key).options[0]];
  });
};
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
      <div v-for="filter in filters" :key="filter.key" class="modal-filter-content">
        
        <label class="label-text-md mb-2">{{ filter.label }}</label>
        <select v-model="selectedFilters[filter.key][0]" class="select-textbox">
          <option v-for="option in filter.options" :key="option" :value="option">
            {{ option }}
          </option>
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