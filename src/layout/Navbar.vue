<template>
    <nav class="navbar">
        <!--Right-->
        <div class="flex items-center space-x-4">
            <!-- Menu -->
            <div class="relative">
                <button @click="toggleUserMenu" class="flex items-center space-x-2 text-white">
                    <img v-if="user.avatar" :src="user.avatar" class="w-8 h-8 rounded-full" alt="User Avatar" />
                    <span v-else
                        class="w-8 h-8 flex items-center justify-center text-lg bg-transparent rounded-full border-2 border-white text-white">{{
                            userInitial }}</span>
                    <span>{{ user.name || "User" }}</span>
                    <span class="material-icons w-4 h-4 mr-8">
                        keyboard_arrow_down
                    </span>
                </button>
                <div v-if="isUserMenuOpen" class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-0">
                    <button class="flex items-center w-full px-3 py-2 hover:bg-gray-100">
                        <span class="material-icons mr-2">
                            account_circle
                        </span>
                        Profile
                    </button>
                    <!-- <button class="flex items-center w-full px-3 py-2 hover:bg-gray-100">
                <Mail class="w-5 h-5 mr-2" alt="Inbox" />Inbox
                <span class="ml-auto bg-dark text-white text-xs px-2 rounded-full">9</span>
              </button> -->
                    <button @click="logoutUser" class="flex items-center w-full px-3 py-2 hover:bg-[#D9D9D9]">
                        <span class="material-icons mr-2">
                            logout
                        </span> Log Out
                    </button>
                </div>
            </div>
        </div>
    </nav>

</template>

<script setup>
import { ref } from 'vue'
// import { useRouter } from 'vue-router';
// import { ConfirmationDialog } from '../components/ConfirmationDialog.vue';

// const router = useRouter();

// const isConfirmationVisible = ref(false);
// const confirmationTitle = ref("");
// const confirmationMessage = ref("");
// const onConfirmAction = ref(() => { });

// const showConfirmationDialog = (title, message, onConfirm) => {
//     confirmationTitle.value = title;
//     confirmationMessage.value = message;
//     onConfirmAction.value = onConfirm;
//     isConfirmationVisible.value = true;
// };

const user = ref({ name: "Alice Smith", avatar: "" });
const userInitial = user.value.name.charAt(0);

const isUserMenuOpen = ref(false);
const toggleUserMenu = () => {
    isUserMenuOpen.value = !isUserMenuOpen.value;
};

const logoutUser = () => {
    // showConfirmationDialog("Log Out", "Are you sure you want to log out?", () => {
    //     // Navigate to the Login page
    //     router.push("/Account/Login");
    //     isConfirmationVisible.value = false;
    // });
};
</script>