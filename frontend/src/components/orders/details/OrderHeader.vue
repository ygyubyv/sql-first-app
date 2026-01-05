<script setup lang="ts">
import type { IOrder } from "@/types";
import { formatDateTime } from "@/utils/formatDateTime";

interface Props {
  order: IOrder;
}

defineProps<Props>();
</script>

<template>
  <header class="flex items-start justify-between">
    <div>
      <h1 class="text-2xl font-semibold text-neutral-900">
        Order #{{ order.id }}
      </h1>
      <p class="mt-1 text-sm text-neutral-500">
        Created {{ formatDateTime(order.createdAt) }}
      </p>
    </div>

    <span
      class="rounded-full px-3 py-1 text-xs font-medium capitalize"
      :class="{
        'bg-yellow-100 text-yellow-800': order.status === 'pending',
        'bg-green-100 text-green-700': order.status === 'paid',
        'bg-red-100 text-red-700': order.status === 'cancelled',
        'bg-blue-100 text-blue-700': order.status === 'completed',
      }"
    >
      {{ order.status }}
    </span>
  </header>
</template>
