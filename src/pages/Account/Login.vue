<template>

</template>

<script setup>
import {ref} from 'vue'

import PlainLayout from '/src/layout/PlainLayout.vue'

// State for form fields and error messages
const email = ref("");
const password = ref("");
const showPassword = ref(false);
const rememberMe = ref(false);
const emailError = ref("");
const passwordError = ref("");
const loginError = ref("");

// Show Password
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

</script>