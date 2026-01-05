<script setup lang="ts">
import { formatDateTime } from "@/utils/formatDateTime";
import type { IProductListItem } from "../../../types";

interface Props {
  product: IProductListItem;
}

interface Emits {
  (e: "addToCart", product: IProductListItem): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();
</script>

<template>
  <div
    class="group flex cursor-pointer flex-col overflow-hidden rounded border border-neutral-200 bg-white transition hover:border-neutral-300"
  >
    <!-- Image -->
    <div class="aspect-[4/3] overflow-hidden bg-neutral-100">
      <img
        :src="product.imageUrl"
        :alt="product.title"
        class="h-full w-full object-cover transition group-hover:scale-[1.02]"
      />
    </div>

    <!-- Content -->
    <div class="flex flex-1 flex-col gap-2 p-3">
      <div class="line-clamp-2 text-sm font-medium text-neutral-900">
        {{ product.title }}
      </div>

      <div class="space-y-0.5 text-xs text-neutral-500">
        <div>ID: {{ product.id }}</div>
        <div v-if="product.sku">SKU: {{ product.sku }}</div>
        <div v-if="product.brand">Brand: {{ product.brand }}</div>
        <div v-if="product.category">Category: {{ product.category }}</div>
      </div>

      <div class="mt-auto flex items-center justify-between text-sm">
        <span class="font-medium text-neutral-900"> ${{ product.price }} </span>

        <span
          class="text-xs"
          :class="product.stock === 0 ? 'text-neutral-400' : 'text-neutral-600'"
        >
          {{
            product.stock === 0 ? "Out of stock" : `${product.stock} in stock`
          }}
        </span>
      </div>

      <div class="text-xs text-neutral-400">
        Created:
        {{ formatDateTime(product.createdAt) }}
      </div>
    </div>

    <!-- Add to cart -->
    <div class="border-t px-3 py-2">
      <button
        class="w-full rounded border border-neutral-300 px-3 py-1.5 text-xs hover:bg-neutral-100 disabled:opacity-50"
        :disabled="product.stock === 0"
        @click.stop="emit('addToCart', product)"
      >
        {{ product.stock === 0 ? "Out of stock" : "Add to cart" }}
      </button>
    </div>
  </div>
</template>
