<script setup lang="ts">
import type { IProductListItem } from "@/types";
import ProductCard from "./ProductCard.vue";
import ProductsLoading from "./ProductsLoading.vue";

interface Props {
  isLoading: boolean;
  products: IProductListItem[] | null;
}

interface Emits {
  (e: "addToCart", product: IProductListItem): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();
</script>

<template>
  <section>
    <!-- Products -->
    <div
      v-if="products?.length && !isLoading"
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @click="$router.push(`/products/${product.id}`)"
        @add-to-cart="emit('addToCart', $event)"
      />
    </div>

    <!-- Loading -->
    <ProductsLoading v-else-if="isLoading" />

    <!-- Empty -->
    <div
      v-else
      class="flex flex-col items-center justify-center rounded border border-dashed border-neutral-300 p-8 text-center"
    >
      <p class="text-sm font-medium text-neutral-700">No products found</p>
      <p class="mt-1 text-xs text-neutral-500">
        Try adjusting filters or create a new product
      </p>
    </div>
  </section>
</template>
