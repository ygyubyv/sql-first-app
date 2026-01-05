<script setup lang="ts">
import type { IOrderItem } from "@/types";
import { computed } from "vue";

interface Props {
  items: IOrderItem[];
}

const props = defineProps<Props>();

const totalPrice = computed(() => {
  if (!props.items) {
    return 0;
  }

  return props.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
});
</script>

<template>
  <div class="col-span-2 rounded-xl bg-white p-6 shadow-sm">
    <h2 class="mb-4 text-sm font-semibold uppercase text-neutral-700">
      Products
    </h2>

    <table class="w-full text-sm">
      <thead class="border-b text-xs uppercase text-neutral-500">
        <tr>
          <!-- Product -->
          <th class="py-2 text-left">Product</th>

          <!-- Price -->
          <th class="py-2 text-right">Price</th>

          <!-- Quantity -->
          <th class="py-2 text-right">Quantity</th>

          <!-- Total -->
          <th class="py-2 text-right">Total</th>
        </tr>
      </thead>

      <tbody class="divide-y">
        <tr v-for="item in items" :key="item.id" class="hover:bg-neutral-50">
          <td class="py-3">
            <!-- Title -->
            <div class="font-medium text-neutral-900">
              {{ item.product.title }}
            </div>

            <!-- Sku -->
            <div class="text-xs text-neutral-400">
              {{ item.product.sku }}
            </div>
          </td>

          <!-- Price -->
          <td class="py-3 text-right">${{ item.price }}</td>

          <!-- Quantity -->
          <td class="py-3 text-right">
            {{ item.quantity }}
          </td>

          <!-- Total -->
          <td class="py-3 text-right font-medium">
            ${{ item.price * item.quantity }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Total Price -->
    <div class="mt-6 flex justify-end border-t pt-4">
      <div class="text-right">
        <div class="text-xs text-neutral-500">Total</div>
        <div class="text-xl font-semibold text-neutral-900">
          ${{ totalPrice }}
        </div>
      </div>
    </div>
  </div>
</template>
