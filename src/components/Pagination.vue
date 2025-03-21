<template>
  <div class="flex justify-between items-center p-2">
    <span class="pagination-results">
      Showing {{ start + 1 }} - {{ end }} of {{ total }} results
    </span>
    <div class="pagination-per-page">
      <span>
        Show
      </span>
      <select :value="pageSize" @change="updatePageSize($event.target.value)" class="view-selection">
        <option v-for="size in [10, 20, 50]" :key="size" :value="size">
          {{ size }}
        </option>
      </select>
      <span>per page</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  total: Number,
  pageSize: Number,
  currentPage: Number,
});

const emit = defineEmits(['update:currentPage', 'update:pageSize']);

const start = computed(() => (props.currentPage - 1) * props.pageSize);
const end = computed(() => Math.min(start.value + props.pageSize, props.total));

function updatePageSize(newSize) {
  emit('update:pageSize', parseInt(newSize, 10));
}
</script>

<style>
.pagination-results {
  color: var(--text-secondary);
}

.pagination-per-page {
  display: flex;
  align-items: center;
  color: var(--text-secondary);
}

.view-selection {
  background-color: var(--card-bg);
  margin: 0px 10px;
  padding: 5px 15px;
  border-radius: 5px;
  border-color: 1px solid var(--border-neutral);
}
</style>