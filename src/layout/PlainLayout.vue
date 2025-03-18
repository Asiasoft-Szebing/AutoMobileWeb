<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-[#EBF5FF]">
        <!-- Logo -->
        <img :src="logo" class="w-24 h-24 mb-6" />
        <!-- Form -->
        <slot />
    </div>
</template>

<script setup lang="ts">
import logo from '/src/assets/logo.png';
</script>