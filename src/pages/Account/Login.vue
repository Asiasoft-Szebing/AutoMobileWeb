<template>
    <PlainLayout>

        <!-- Error Container-->
        <div class="error-container" v-if="errorMessage">
            <span class="material-icons">warning</span>
            <p class="ml-2">{{ errorMessage }}</p>
        </div>

        <!-- Login Form -->
        <form class="login-form shadow-xl" @submit.prevent="handleLogin" novalidate>
            <p class="headline-text-md mb-2"> Login </p>
            <p class="body-text-md text-[#666666] mb-4"> Continue to Automobile Management System</p>

            <!-- Email -->
            <InputTextbox label="Email" inputType="email" placeholder="Enter your email" v-model="email" icon="mail"
                :errorMessage="emailError" />

            <!--Password  -->
            <InputTextbox label="Password" inputType="password" placeholder="Enter your password" v-model="password"
                :errorMessage="passwordError" toggleIcon />

            <!-- Remember Me -->
            <div class="my-4 flex align-items-center">
                <input type="checkbox" id="remember" v-model="rememberMe" class="checkbox-input mr-2" />
                <label for="remember" class="checkbox-label">Remember me</label>
            </div>

            <!-- Login Button -->
            <button type="submit" class="login-button button-md button-primary">Login</button>

            <!-- Forgot Password Link -->
            <RouterLink to="/Account/ForgotPassword" class="nav-link"> Forgot Password</RouterLink>
        </form>
    </PlainLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import PlainLayout from '/src/layout/PlainLayout.vue'
import InputTextbox from '../../components/InputTextbox.vue';

const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');
const rememberMe = ref(false);

const errorMessage = computed(() => {
    return emailError.value || passwordError.value || ""
});

// Handle login
const handleLogin = async () => {
    // Reset error messages
    emailError.value = "";
    passwordError.value = "";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    //check email
    if (!email.value) {
        emailError.value = "Email is required.";
    }
    else if (!emailPattern.test(email.value)) {
        emailError.value = "Invalid email format.";
    }
    //check password
    else if (!password.value) {
        passwordError.value = "Password is required.";
    }
    else if (!passwordPattern.test(password.value)) {
        passwordError.value = "Password must contain at least 8 alphanumeric with 1 uppercase letter, 1 lowercase letter, 1 number, 1 special characters ";
    }

    // If any validation errors, do not proceed
    if (errorMessage.value) return;

    try {
        // API call to login endpoint
        // const response = await fetch("/api/auth/login", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ email: email.value, password: password.value }),
        // });

        // if (!response.ok) {
        //   throw new Error("Login failed. Please check your credentials.");
        // }

        // const data = await response.json();

        // Navigate to dashboard on successful login
        //router.push("/Dashboard");
    } catch (error) {
        console.log(error);
    }
};
</script>
