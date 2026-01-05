<script setup lang="ts">
import CreateCustomer from "@/components/customers/list/drawer/CreateCustomer.vue";
import CustomersTable from "@/components/customers/list/CustomersTable.vue";
import CustomersHeader from "@/components/customers/list/CustomersHeader.vue";
import { useCustomersListActions } from "@/composables/customers/useCustomersListActions";
import { onMounted, ref } from "vue";
import type { ICustomerListItem } from "@/types";
import { getAll } from "@/services/customers/customer.service";

const {
  createCustomerDrawerIsVisible,
  onCreateCustomer,
  handleCreateCustomer,
} = useCustomersListActions();

const isLoading = ref(false);
const customers = ref<ICustomerListItem[] | null>(null);

const getCustomers = async () => {
  try {
    isLoading.value = true;

    customers.value = await getAll();
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(getCustomers);
</script>

<template>
  <!-- Create Customer -->
  <CreateCustomer
    v-model="createCustomerDrawerIsVisible"
    @submit="handleCreateCustomer"
  />

  <div class="p-6">
    <!-- Header -->
    <CustomersHeader @create="onCreateCustomer" />

    <!-- List -->
    <CustomersTable :customers="customers" :is-loading="isLoading" />
  </div>
</template>
