<script setup lang="ts">
import OrdersHeader from "@/components/orders/list/OrdersHeader.vue";
import OrdersTable from "@/components/orders/list/OrdersTable.vue";
import { useOrdersListActions } from "@/composables/orders/useOrdersListActions";
import { getAll } from "@/services/orders/order.service";
import type { IOrderListItem } from "@/types";
import { onMounted, ref } from "vue";
import UpdateOrder from "@/components/orders/list/drawer/UpdateOrder.vue";
import BaseConfirmModal from "@/components/Base/BaseConfirmModal.vue";

const {
  selectedOrder,
  updateOrderDrawerIsVisible,
  deleteOrderDialogIsVisible,
  onUpdateOrder,
  onDeleteOrder,
  handleUpdateOrder,
  handleDeleteOrder,
} = useOrdersListActions();

const isLoading = ref(false);
const orders = ref<IOrderListItem[] | null>(null);

const getOrders = async () => {
  try {
    isLoading.value = true;

    orders.value = await getAll();
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(getOrders);
</script>

<template>
  <section class="space-y-6">
    <!-- Update Order -->
    <UpdateOrder
      v-if="selectedOrder"
      v-model="updateOrderDrawerIsVisible"
      :initial-values="selectedOrder"
      @submit="handleUpdateOrder"
    />

    <!-- Delete Order -->
    <BaseConfirmModal
      v-model="deleteOrderDialogIsVisible"
      title="Delete order"
      text="Are you sure you want to delete this order? This action cannot be undone."
      confirm-text="Delete"
      @confirm="handleDeleteOrder"
    />

    <!-- Header -->
    <OrdersHeader />

    <!-- Table -->
    <OrdersTable
      :orders="orders"
      :is-loading="isLoading"
      @update="onUpdateOrder"
      @delete="onDeleteOrder"
    />
  </section>
</template>
