<template>
<PlainLayout>
        <!-- Error Container-->
        <div class="error-container" v-if="errorMessage">
            <span class="material-icons">warning</span>
            <p class="ml-2">{{ errorMessage }}</p>
        </div>

        <!-- Reset Password Form -->
        <form class="account-form shadow-xl">
            <p class="headline-text-md mb-2"> Reset Your Password </p>
            <p class="body-text-md text-[#666666] mb-4"> Enter a new password </p>
            <!-- New Password -->
            <InputTextbox label="New Password" inputType="password" placeholder="Enter your new password" v-model="password"
                :errorMessage="newpasswordError" toggleIcon />
            <!--Confirm Password  -->
            <InputTextbox label="Confirm Password" inputType="password" placeholder="Re-enter your password" v-model="password"
                :errorMessage="confirmpasswordError" toggleIcon />
            <!-- Confirm Button -->
            <button type="submit" class="account-button button-md button-primary">Confirm</button>
        </form>
    </PlainLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import PlainLayout from '/src/layout/PlainLayout.vue'
import InputTextbox from '../../components/InputTextbox.vue';

</script>