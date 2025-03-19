<template>
    <div class="flex justify-between items-center p-2">
      <span>
        Showing {{ start + 1 }} - {{ end }} of {{ total }} results
      </span>
      <select 
        :value="pageSize" 
        @change="updatePageSize($event.target.value)" 
        class="border p-1 rounded"
      >
        <option v-for="size in [10, 20, 50]" :key="size" :value="size">
          Show {{ size }}
        </option>
      </select>
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
  