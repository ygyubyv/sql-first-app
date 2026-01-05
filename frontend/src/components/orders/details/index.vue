<script setup lang="ts">
import type { IOrder } from "@/types";
import OrderProducts from "./OrderProducts.vue";
import OrderCustomer from "./OrderCustomer.vue";
import OrderMainInfo from "./OrderMainInfo.vue";
import OrderHeader from "./OrderHeader.vue";

interface Props {
  order: IOrder;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <OrderHeader :order="order" />

    <div class="grid grid-cols-3 gap-6">
      <!-- Products -->
      <OrderProducts :items="order.items" />

      <div class="space-y-6">
        <!-- Main Info -->
        <OrderMainInfo :order="order" />

        <!-- Customer -->
        <OrderCustomer :customer="order.customer" />
      </div>
    </div>
  </div>
</template>
