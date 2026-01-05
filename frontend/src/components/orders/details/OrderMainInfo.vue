<script setup lang="ts">
import type { IOrder } from "@/types";
import { formatDateTime } from "@/utils/formatDateTime";

interface Props {
  order: IOrder;
}

defineProps<Props>();
</script>

<template>
  <div class="rounded-xl bg-white p-6 shadow-sm">
    <h3 class="mb-4 text-sm font-semibold uppercase text-neutral-700">
      Order info
    </h3>

    <!-- Order Status -->
    <div class="space-y-3 text-sm">
      <div class="flex justify-between">
        <span class="text-neutral-500">Status</span>
        <span class="font-medium">
          {{ order.status }}
        </span>
      </div>

      <!-- Payment Method -->
      <div class="flex justify-between">
        <span class="text-neutral-500">Payment</span>
        <span class="font-medium capitalize">
          {{ order.paymentMethod }}
        </span>
      </div>

      <!-- Updated At -->
      <div class="flex justify-between">
        <span class="text-neutral-500">Updated</span>
        <span class="font-medium">
          {{ formatDateTime(order.updatedAt) }}
        </span>
      </div>
    </div>
  </div>
</template>
