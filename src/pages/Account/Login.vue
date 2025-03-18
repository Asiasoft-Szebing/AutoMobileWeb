<template>
    <PlainLayout>

        <!-- Error Container-->
        <div class="error-container" v-if="errorMessage">
            <p class="body2-text-lg">{{ errorMessage }}</p>
        </div>

        <!-- Login Form -->
        <form class="login-form shadow-xl" @submit.prevent="handleLogin" novalidate>
            <p class="headline-text-md mb-2"> Login </p>
            <p class="body-text-md text-[#666666] mb-4"> Continue to Automobile Management System</p>

            <!-- Email -->
            <InputTextbox label="Email" inputType="email" placeholder="Enter your email" v-model="email" icon="mail"
                :errorMessage="emailError" @update:errorMessage="emailError = $event" />

            <!--Password  -->
            <InputTextbox label="Password" inputType="password" placeholder="Enter your password" v-model="password"
                toggleIcon :errorMessage="passwordError" @update:errorMessage="passwordError = $event" />

            <!-- Remember Me -->
            <div class="my-4 flex align-items-center">
                <input type="checkbox" id="remember" v-model="rememberMe" class="checkbox-input mr-2" />
                <label for="remember" class="checkbox-label">Remember me</label>
            </div>

            <!-- Login Button -->
            <button type="submit" class="login-button button-md button-primary">Login</button>

            <!-- Forgot Password Link -->
            <RouterLink to="/Account/ForgotPassword" class="forgot-password"> Forgot Password</RouterLink>
        </form>
    </PlainLayout>
</template>

<script setup>
import { ref } from 'vue'
import PlainLayout from '/src/layout/PlainLayout.vue'
import InputTextbox from '../../components/InputTextbox.vue';

const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');
const rememberMe = ref(false);

const errorMessage = () => {
    if (emailError.value)
        errorMessage.value = emailError.value;

    if (passwordError.value)
        errorMessage.value = passwordError.value;
};

// Handle login
const handleLogin = async () => {
    // Reset error messages
    emailError.value = "";
    passwordError.value = "";
    errorMessage.value = "";

    // If any validation errors, do not proceed
    if (emailError.value || passwordError.value) return;

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
        router.push("/dashboard");
    } catch (error) {
        errorMessage.value = error.message;
    }
};
</script>

<style>
.error-container {
    background-color: var(--error-light);
    color: var(--accent-red);
    height: 50px;
    width: 450px;
    border-radius: 8px;
    padding: 8px;
    text-align: center;
    margin-bottom: 50px;
}

.login-form {
    background-color: white;
    border-radius: 8px;
    height: 400px;
    width: 450px;
    padding: 50px;
}

/* Checkbox label */
.checkbox-label {
    font-size: 14px;
    color: #333333;
    cursor: pointer;
}

/* Checkbox input */
.checkbox-input {
    margin-right: 8px;
    cursor: pointer;
    border-color: #D6D6D6;
}

.login-button {
    display: flex;
    justify-content: center;
    margin: 5px auto;
}

/* Forgot password link */
.forgot-password {
    display: flex;
    justify-content: center;
    margin: 5px auto;
    text-align: center;
    color: #0080FF;
    font-size: 14px;
    cursor: pointer;
    text-decoration: underline;
}
</style>