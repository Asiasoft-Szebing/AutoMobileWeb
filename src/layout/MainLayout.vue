<template>
    <div class="min-h-screen flex">
      <Sidebar />
      <div class="flex-1">
        <Navbar />
        <div class="p-4 bg-[#EBF5FF] min-h-[calc(100vh-4rem)]">
          <slot />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Navbar from "./Navbar.vue";
  import Sidebar from "./Sidebar.vue";
  </script>
  