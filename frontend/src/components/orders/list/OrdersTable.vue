<script setup lang="ts">
import type { IOrderListItem } from "@/types";
import OrdersLoading from "./OrdersLoading.vue";

interface Props {
  orders: IOrderListItem[] | null;
  isLoading: boolean;
}

interface Emits {
  (e: "update", order: IOrderListItem): void;
  (e: "delete", order: IOrderListItem): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const statusClasses: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
};
</script>

<template>
  <OrdersLoading v-if="isLoading" />

  <div v-else-if="!isLoading && !orders?.length">No orders found</div>

  <div
    class="overflow-hidden rounded-lg border border-neutral-200 bg-white"
    v-else
  >
    <table class="w-full border-collapse text-sm">
      <thead class="bg-neutral-50">
        <tr>
          <th class="px-4 py-3 text-left font-medium text-neutral-600">
            Order #
          </th>
          <th class="px-4 py-3 text-left font-medium text-neutral-600">
            Customer
          </th>
          <th class="px-4 py-3 text-left font-medium text-neutral-600">
            Status
          </th>
          <th class="px-4 py-3 text-left font-medium text-neutral-600">
            Payment
          </th>
          <th class="px-4 py-3 text-left font-medium text-neutral-600">
            Created
          </th>
          <th class="px-4 py-3 text-left font-medium text-neutral-600">
            Actions
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-neutral-200">
        <tr
          v-for="order in orders"
          @click="$router.push(`orders/${order.id}`)"
          :key="order.id"
          class="transition hover:bg-neutral-50"
        >
          <!-- Id -->
          <td class="px-4 py-3 font-medium text-neutral-900">
            #{{ order.id }}
          </td>

          <!-- Customer -->
          <td class="px-4 py-3">
            <div class="flex flex-col">
              <span class="font-medium text-neutral-900">
                {{ order.customer.firstName }}
                {{ order.customer.lastName }}
              </span>
              <span class="text-xs text-neutral-500">
                {{ order.customer.email }}
              </span>
            </div>
          </td>

          <!-- Status -->
          <td class="px-4 py-3">
            <span
              class="inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize"
              :class="statusClasses[order.status]"
            >
              {{ order.status }}
            </span>
          </td>

          <!-- Payment Method -->
          <td class="px-4 py-3 capitalize text-neutral-700">
            {{ order.paymentMethod }}
          </td>

          <!-- Created -->
          <td class="px-4 py-3 text-neutral-500">
            {{ new Date(order.createdAt).toLocaleDateString() }}
          </td>

          <!-- Actions -->
          <td class="px-4 py-3">
            <div class="flex gap-2">
              <!-- Update -->
              <button
                class="rounded border px-2.5 py-1 text-xs hover:bg-neutral-100"
                @click="emit('update', order)"
              >
                Edit
              </button>

              <!-- Delete -->
              <button
                class="rounded border border-red-200 px-2.5 py-1 text-xs text-red-600 hover:bg-red-50"
                @click="emit('delete', order)"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
