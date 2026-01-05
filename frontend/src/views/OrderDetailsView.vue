<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import type { IOrder } from "@/types";
import { getById } from "@/services/orders/order.service";
import OrderDetails from "@/components/orders/details/index.vue";
import OrderLoading from "@/components/orders/details/OrderLoading.vue";
import OrderNotFound from "@/components/orders/details/OrderNotFound.vue";

const route = useRoute();
const orderId = Number(route.params.id);

const isLoading = ref(false);
const order = ref<IOrder | null>(null);

const getOrder = async () => {
  try {
    isLoading.value = true;

    order.value = await getById(orderId);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(getOrder);
</script>

<template>
  <section class="bg-neutral-50 px-6 py-8">
    <div class="mx-auto max-w-6xl">
      <!-- Loading -->
      <OrderLoading v-if="isLoading" />

      <!-- Not Found -->
      <OrderNotFound v-else-if="!order" />

      <OrderDetails v-else :order="order" />
    </div>
  </section>
</template>
