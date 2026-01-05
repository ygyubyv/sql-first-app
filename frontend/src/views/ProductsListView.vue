<script setup lang="ts">
import CreateProduct from "@/components/products/list/drawer/CreateProduct.vue";
import type { ICreateProduct, IProductListItem } from "@/types";
import { getAll } from "@/services/products/product.service";
import { onMounted, ref } from "vue";
import ProductsHeader from "@/components/products/list/ProductsHeader.vue";
import ProductsList from "@/components/products/list/ProductsList.vue";
import { useProductsListActions } from "@/composables/products/useProductsListActions";
import { useCartStore } from "@/stores/cart";

const { createProductDrawerIsVisible, onCreateProduct, handleCreateProduct } =
  useProductsListActions();

const { addToCart } = useCartStore();

const isLoading = ref(false);
const products = ref<IProductListItem[] | null>(null);

const getProducts = async () => {
  try {
    isLoading.value = true;

    products.value = await getAll();
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(getProducts);
</script>

<template>
  <!-- Create Product -->
  <CreateProduct
    v-model="createProductDrawerIsVisible"
    @submit="handleCreateProduct"
  />

  <section class="space-y-6">
    <!-- Header -->
    <ProductsHeader @create="onCreateProduct" />

    <!-- List -->
    <ProductsList
      :products="products"
      :is-loading="isLoading"
      @add-to-cart="addToCart"
    />
  </section>
</template>
