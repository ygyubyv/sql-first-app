<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import type { ICustomer } from "@/types";
import NotFound from "@/components/customers/details/NotFound.vue";
import CustomerDetails from "@/components/customers/details/index.vue";
import UpdateCustomer from "@/components/customers/details/drawer/UpdateCustomer.vue";
import BaseConfirmModal from "@/components/Base/BaseConfirmModal.vue";
import { useCustomerDetailsActions } from "@/composables/customers/useCustomerDetailsActions";
import { getById } from "@/services/customers/customer.service";

const route = useRoute();
const customerId = Number(route.params.id);

const {
  updateCustomerDrawerIsVisible,
  deleteCustomerDialogIsVisible,
  handleUpdateCustomer,
  handleDeleteCustomer,
  onDeleteCustomerAction,
  onUpdateCustomerAction,
} = useCustomerDetailsActions(customerId);

const isLoading = ref(false);
const customer = ref<ICustomer | null>(null);

const getCustomer = async () => {
  try {
    isLoading.value = true;

    customer.value = await getById(customerId);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(getCustomer);
</script>

<template>
  <!-- Update customer -->
  <UpdateCustomer
    v-if="customer"
    v-model="updateCustomerDrawerIsVisible"
    :initial-values="customer"
    @submit="handleUpdateCustomer"
  />

  <!-- Delete customer -->
  <BaseConfirmModal
    v-model="deleteCustomerDialogIsVisible"
    title="Delete customer"
    text="Are you sure you want to delete this customer? This action cannot be undone."
    confirm-text="Delete"
    @confirm="handleDeleteCustomer"
  />

  <div class="p-6">
    <div v-if="isLoading" class="text-sm text-neutral-500">
      Loading customer...
    </div>

    <NotFound v-if="!customer && !isLoading" />

    <!-- Details -->
    <CustomerDetails
      v-else-if="customer && !isLoading"
      :customer="customer"
      @update="onUpdateCustomerAction"
      @delete="onDeleteCustomerAction"
    />
  </div>
</template>
