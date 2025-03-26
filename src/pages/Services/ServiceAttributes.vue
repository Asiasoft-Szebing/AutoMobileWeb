<script setup>
import { computed, ref } from 'vue';
import MainLayout from '../../layout/MainLayout.vue';
import ConfirmationDialog from '../../components/ConfirmationDialog.vue'
import AddServiceAttributeDialog from './AddServiceAttributeDialog.vue';
import AddTermsDialog from './AddTermsDialog.vue';
import Pagination from '../../components/Pagination.vue';

const searchQuery = ref('');
const currentPage = ref(1);
const pageSize = ref(10);

const attributeslist = ref([
    { id: 1, name: 'Car Size', type: 'Single Choice', terms: 'Small, Medium, Large, Extra Large' }
]);


const showAddDialog = ref(false);

const openAddDialog = () => {
    showAddDialog.value = true;
}

const closeAddDialog = () => {
    showAddDialog.value = false;
}

const showAddTermsDialog = ref(false);

const openAddTermsDialog = () => {
    showAddTermsDialog.value = true;
}

const closeAddTermsDialog = () => {
    showAddTermsDialog.value = false;
}

const filteredAttributes = computed(() => {
    return attributeslist.value.filter(attributeslist => {
        const matchName = !searchQuery.value || attributeslist.name.toLowerCase().includes(searchQuery.value.toLowerCase());
        return matchName;
    });
})

const selectedAttribute = ref(null);
// Remove Services
const isConfirmationVisible = ref(false);

const confirmDelete = (attribute) => {
    selectedAttribute.value = attribute;
    isConfirmationVisible.value = true;
};

const remove = () => {
    if (selectedAttribute.value) {
        // Remove from list 
        attributeslist.value = attributeslist.value.filter(attribute => attribute.name !== selectedAttribute.value.name);
        console.log(`Removing attribute: ${selectedAttribute.value.name}`);

        //Show toast notification

    }
    selectedAttribute.value = null;
    isConfirmationVisible.value = false;
}

// Calculate total pages based on filtered services
const totalPages = computed(() => {
    return Math.ceil(filteredAttributes.value.length / pageSize.value);
});

// Handle page change from pagination component
const onPageChange = (newPage) => {
    currentPage.value = newPage;
};
</script>

<template>
    <MainLayout>
        <!-- Add  Dialog -->
        <AddServiceAttributeDialog :isOpen="showAddDialog" @close="closeAddDialog" />
        <!-- Add Terms Dialog-->
        <AddTermsDialog :isOpen="showAddTermsDialog" @close="closeAddTermsDialog" />
        <!-- Title -->
        <div class="flex justify-between items-center mb-4">
            <!-- Title-->
            <div class="headline-text-md ">
                <h2>Service Attributes</h2>
            </div>
            <!-- Button -->
            <div class="flex gap-4">
                <!-- Filter Button -->
                <button class="flex items-center gap-1 justify-center button-sm button-default">
                    <span class="material-icons">chevron_left</span>
                    <span>Back</span>
                </button>
                <!-- Add Button -->
                <button class="flex items-center gap-1 justify-center button-md button-primary" @click="openAddDialog">
                    <span class="material-icons">add</span>
                    <span>New Attribute</span>
                </button>
            </div>
        </div>
        <!-- Search -->
        <div class="relative my-8">
            <span class="material-icons search-icon">search</span>
            <input type="text" class="search-textbox" placeholder="Search by attributes name" v-model="searchQuery">
            </input>
        </div>
        <!--Table-->
        <table class="table-primary">
            <thead class="body-text-md">
                <tr>
                    <th> Name </th>
                    <th> Type </th>
                    <th> Terms </th>
                    <th> Action </th>
                </tr>
            </thead>
            <tbody class="body-text-sm">
                <tr v-if="filteredAttributes.length === 0">
                    <td colspan="6" class="empty-list-td body2-text-md ">Empty List</td>
                </tr>
                <tr v-for="attribute in filteredAttributes" :key="attribute.id">
                    <td>{{ attribute.name }}</td>
                    <td>{{ attribute.type }}</td>
                    <td>{{ attribute.terms }}</td>
                    <td class="flex">
                        <button class="button-icon button-warning mr-2">
                            <span class="material-icons"> edit </span>
                        </button>
                        <button class="button-icon button-default mr-2">
                            <span class="material-icons" @click="openAddTermsDialog"> settings </span>
                        </button>
                        <button class="button-icon button-error" @click="confirmDelete(attribute)">
                            <span class="material-icons "> delete </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <hr />
        <!-- Confirmation Dialog-->
        <ConfirmationDialog v-if="isConfirmationVisible" :isOpen="true"
            :title="`Remove ${selectedAttribute?.name || ''}`" message="Are you sure you want to delete this attribute?"
            @close="isConfirmationVisible = false" @confirm="remove" />

        <Pagination :total="filteredAttributes.length" :pageSize="pageSize" :currentPage="currentPage"
            :totalPages="totalPages" @page-change="onPageChange" />
    </MainLayout>
</template>