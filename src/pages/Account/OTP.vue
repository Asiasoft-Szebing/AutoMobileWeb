<template>
    <PlainLayout>
        <!-- Error Container-->
        <div class="error-container" v-if="errorMessage">
            <span class="material-icons">warning</span>
            <p class="ml-2">{{ errorMessage }}</p>
        </div>

        <!-- Forgot Password Form -->
        <form class="account-form shadow-xl">
            <p class="headline-text-md mb-2"> Verify Your Account </p>
            <p class="body-text-md text-[#666666] mb-4"> Enter your verification code we sent to <b>{{ email }}</b></p>
            <!-- OTP -->
            <InputTextbox label="OTP" inputType="text" placeholder="One Time Password" v-model="otp"
                :errorMessage="OTPError" class="mb-4" />
            <!-- Confirm Button -->
            <button type="submit" class="account-button button-md button-primary">Confirm</button>
            <!-- Back to Login & Timer -->
            <div class="flex justify-between items-center mt-2">

                <!-- Login Link -->
                <RouterLink to="/Account/Login" class="nav-link">
                    < Back to Login</RouterLink>

                        <!--Timer-->
                        <div v-if="!showResendButton" class="timer">
                            Time Remaining: {{ countdown }}s
                        </div>
                        <button v-else @click="handleResendOTP" class="resend">
                            Resend
                        </button>
            </div>


        </form>
    </PlainLayout>
</template>

<script setup>
import PlainLayout from '../../layout/PlainLayout.vue';
import InputTextbox from '../../components/InputTextbox.vue';
import {ref, onMounted} from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const email = route.query.email || "";

const countdown = ref(30);
const showResendButton = ref(false);

let timerInterval = null;
let lastResendTime = null;

// Start Countdown Timer
const startCountdown = () => {
  countdown.value = 59;
  showResendButton.value = false;

  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      clearInterval(timerInterval);
      showResendButton.value = true;
    }
  }, 1000);
};

// Start the timer when the component is mounted
onMounted(() => {
  startCountdown();
});
</script>