<script setup lang="ts">
import type { IOrderCustomer } from "@/types";

interface Props {
  customer: IOrderCustomer;
}

defineProps<Props>();
</script>

<template>
  <div class="rounded-xl bg-white p-6 shadow-sm">
    <h3 class="mb-4 text-sm font-semibold uppercase text-neutral-700">
      Customer
    </h3>

    <div class="space-y-1">
      <div class="font-medium text-neutral-900">
        {{ customer.firstName }}
        {{ customer.lastName }}
      </div>
      <div class="text-sm text-neutral-500">
        {{ customer.email }}
      </div>
    </div>
  </div>
</template>
