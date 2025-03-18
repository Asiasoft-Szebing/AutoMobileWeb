<template>
    <p class="label-text-md text-left mt-4">{{ label }}</p>
    <div class="relative">
        <input :type="computedInputType" class="textbox" :class="{ 'has-error': errorMessage }"
            :placeholder="placeholder" :value="modelValue" @input="handleInput" @focus="clearError" />

        <span v-if="icon" class="material-icons input-icon ">{{ icon }}</span>

        <button v-if="toggleIcon" @click.prevent="toggleVisibility" type="button">
            <span class="material-icons input-icon">{{ iconComponent }}</span>
        </button>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'

// Props - pass data from a parent component to a child component
// defineProps - define the properties that a component can accept
const props = defineProps({
    label: String,
    modelValue: [String, Number],
    placeholder: String,
    errorMessage: String,
    icon: String,
    toggleIcon: Boolean,
    inputType: {
        type: String,
        default: "text",
    },
    validate: Function,
});

// defineEmits - allows the child component to send data back to the parent component
const emit = defineEmits(["update:modelValue", "update:errorMessage"]);

//computed - reactively update their value when the data they depend on changes
const showPassword = ref(false);
const iconComponent = computed(() => (showPassword.value ? "visibility" : "visibility_off"));
const computedInputType = computed(() =>
    props.toggleIcon && showPassword.value ? "text" : props.inputType
);

// validate upon input
function handleInput(event) {
    const value = event.target.value;
    emit("update:modelValue", value);

    validate(value);
}

// validate
function validate(value) {
    let error = "";

    if (props.inputType === "email") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!value) {
            error = "Email is required.";
        } 
        else if (!emailPattern.test(value)) {
            error = "Invalid email format.";
        }

    } else if (props.inputType === "password") {
        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        
        if (!value) {
            error = "Password is required.";
        } 
        else if (passwordPattern.test(value)) {
            error = "Password must contain at least 8 alphanumeric with 1 uppercase letter, 1 lowercase letter, 1 number, 1 special characters ";
        }
    }
    emit("update:errorMessage", error);
}

// password visibility
function toggleVisibility() {
    showPassword.value = !showPassword.value;
}

// if onfocus, clear errorMessage
function clearError() {
    emit("update:errorMessage", "");
}
</script>

<style>
.textbox:focus {
    outline: none;
    border: 1px solid #0080FF;
}

.textbox.has-error {
    outline: none;
    border: 1px solid #ff0000;
}


/* Icon in input field */
.input-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: #A0A0A0;
    width: 20px;
    height: 20px;
}
</style>