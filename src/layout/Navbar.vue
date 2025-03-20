<template>
    <nav class="navbar">
        <!-- Right -->
        <button @click="toggleUserMenu" class="button-group">
            <!-- User Avatar/ User Name -->
            <img v-if="user.avatar" :src="user.avatar" class="avatar" alt="User Avatar" />
            <span v-else class="initial-avatar">{{ userInitial }}</span>
            <span class="ml-2">{{ user.name || "User" }}</span>
            <!-- Chevron -->
            <span class="material-icons chevron mr-5"> keyboard_arrow_down </span>
        </button>
        <!-- Menu -->
        <div v-if="isUserMenuOpen" class="navbar-menu shadow-lg">
            <button class="navbar-menu-item">
                <span class="material-icons mr-2"> account_circle </span>
                Profile
            </button>
            <button @click="isUserMenuOpen=false; isConfirmationVisible = true" class="navbar-menu-item">
                <span class="material-icons mr-2"> logout </span>
                Log Out
            </button>
        </div>
    </nav>
    <!-- Confirmation Modal -->
    <ConfirmationDialog v-if="isConfirmationVisible" :isOpen="true" title="Log Out " 
        message="Are you sure you want to log out?" @close="isConfirmationVisible = false" @confirm="logout" />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ConfirmationDialog from '../components/ConfirmationDialog.vue'

const router = useRouter();

const isConfirmationVisible = ref(false);

const user = ref({ name: "Alice", avatar: "" });
const userInitial = user.value.name.charAt(0);

const isUserMenuOpen = ref(false);
const toggleUserMenu = () => {
    isUserMenuOpen.value = !isUserMenuOpen.value;
};

const logout = () => {
    isUserMenuOpen.value = false;
    console.log("Logout successful!");
    
    router.push("/Account/Login");
    isConfirmationVisible = false;
}
</script>