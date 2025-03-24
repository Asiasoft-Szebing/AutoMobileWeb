<template>
  <div class="pagination">
    <!-- Left -->
    <span class="pagination-results">
      Showing {{ start + 1 }} - {{ end }} of {{ total }} results
    </span>

    <!-- Right -->
    <div class="pagination-page body-text-sm">
      <!-- Current Page -->
      <select :value="currentPage" @change="emitPageChange" class="view-selection">
        <option v-for="page in totalPages" :key="page" :value="page">
          {{ page < 10 ? '0' + page : page }} </option>
      </select>

      <!-- Page Count -->
      <span class="total-page">of {{ totalPages }} {{ totalPages === 1 ? 'page' : 'pages' }}</span>

      <!-- Previous Button -->
      <button @click="previousPage" :disabled="currentPage === 1"
        class="button-navigation ">
        <span class="material-icons">
          chevron_left
        </span>
      </button>

      <!-- Next Button -->
      <button @click="nextPage" :disabled="currentPage === totalPages"
        class="button-navigation button-end">
        <span class="material-icons">
          chevron_right
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  total: Number,
  pageSize: Number,
  currentPage: Number,
  totalPages: Number,
});

const emit = defineEmits(['update:currentPage', 'page-change']);
const start = computed(() => (props.currentPage - 1) * props.pageSize);
const end = computed(() => Math.min(start.value + props.pageSize, props.total));

const emitPageChange = () => {
  emit("page-change", currentPage);
};

const previousPage = () => {
  if (currentPage > 1) {
    emit("page-change", currentPage - 1);
  }
};

const nextPage = () => {
  if (currentPage < totalPages) {
    emit("page-change", currentPage + 1);
  }
};
</script>
