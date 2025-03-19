<template>
    <PlainLayout>
        <!-- Error Container-->
        <div class="error-container" v-if="errorMessage">
            <span class="material-icons">warning</span>
            <p class="ml-2">{{ errorMessage }}</p>
        </div>

        <!-- Forgot Password Form -->
        <form class="account-form shadow-xl">
            <p class="headline-text-md mb-2"> Forgot Password </p>
            <p class="body-text-md text-[#666666] mb-4"> Enter your email, the verification code will be sent to your
                registered email.</p>
            <!-- Email -->
            <InputTextbox label="Email" inputType="email" placeholder="Enter your email" v-model="email" icon="mail"
                :errorMessage="emailError" class="mb-4"/>
            <!-- Confirm Button -->
            <button type="submit" class="account-button button-md button-primary">Confirm</button>
            <!-- Forgot Password Link -->
            <RouterLink to="/Account/Login" class="nav-link"> < Back to Login</RouterLink>
        </form>
    </PlainLayout>
</template>

<script setup>
import PlainLayout from '../../layout/PlainLayout.vue';
import InputTextbox from '../../components/InputTextbox.vue';
</script>