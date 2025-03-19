<template>
    <div class="p-4">
      <h2 class="text-xl font-bold mb-4">Edit Service</h2>
      <form>
        <div class="mb-4">
          <label class="block">Service Name:</label>
          <input v-model="service.name" class="w-full p-2 border" :readonly="!isEditing" />
        </div>
        <div class="mb-4">
          <label class="block">Category:</label>
          <input v-model="service.category" class="w-full p-2 border" :readonly="!isEditing" />
        </div>
        <div class="mb-4">
          <label class="block">Price:</label>
          <input v-model="service.price" class="w-full p-2 border" :readonly="!isEditing" />
        </div>
        <div class="mb-4">
          <label class="block">Duration:</label>
          <input v-model="service.duration" class="w-full p-2 border" :readonly="!isEditing" />
        </div>
        <div class="mb-4">
          <label class="block">Status:</label>
          <input v-model="service.active" class="w-full p-2 border" :readonly="!isEditing" />
        </div>
        <div class="flex space-x-4">
          <button @click.prevent="toggleEdit" class="px-4 py-2 bg-blue-500 text-white">
            {{ isEditing ? 'Save' : 'Edit' }}
          </button>
          <button @click.prevent="goBack" class="px-4 py-2 bg-gray-500 text-white">Back</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isEditing: false,
        service: {
          name: this.$route.query.name,
          category: this.$route.query.category,
          price: this.$route.query.price,
          duration: this.$route.query.duration,
          active: this.$route.query.active === 'true',
        },
      };
    },
    methods: {
      toggleEdit() {
        if (this.isEditing) {
          // Save changes logic here (API call or state update)
          console.log('Service saved:', this.service);
        }
        this.isEditing = !this.isEditing;
      },
      goBack() {
        this.$router.push('/');
      },
    },
  };
  </script>
  