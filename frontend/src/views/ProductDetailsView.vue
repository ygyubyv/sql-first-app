<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getById } from "@/services/products/product.service";
import type { IProduct } from "@/types";
import UpdateProduct from "@/components/products/details/drawer/UpdateProduct.vue";
import BaseConfirmModal from "@/components/Base/BaseConfirmModal.vue";
import { useProductDetailsActions } from "@/composables/products/useProductDetailsActions";
import ProductDetails from "@/components/products/details/ProductDetails.vue";
import NotFound from "@/components/products/details/NotFound.vue";

const route = useRoute();
const productId = Number(route.params.id);

const {
  updateProductDrawerIsVisible,
  deleteProductDialogIsVisible,
  handleUpdateProduct,
  handleDeleteProduct,
  onDeleteProduct,
  onUpdateProduct,
} = useProductDetailsActions(productId);

const isLoading = ref(false);
const product = ref<IProduct | null>(null);

const getProduct = async () => {
  try {
    isLoading.value = true;

    product.value = await getById(productId);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(getProduct);
</script>

<template>
  <div class="p-6">
    <!-- Loading -->
    <div v-if="isLoading" class="text-sm text-neutral-500">
      Loading product...
    </div>

    <NotFound v-if="!isLoading && !product" />

    <!-- Details -->
    <ProductDetails
      v-else-if="product"
      :product="product"
      @update="onUpdateProduct"
      @delete="onDeleteProduct"
    />
  </div>

  <!-- Update Product -->
  <UpdateProduct
    v-if="product"
    v-model="updateProductDrawerIsVisible"
    :initial-values="product"
    @submit="handleUpdateProduct"
  />

  <!-- Delete Product -->
  <BaseConfirmModal
    v-model="deleteProductDialogIsVisible"
    title="Delete product"
    text="Are you sure you want to delete this product? This action cannot be undone."
    confirm-text="Delete"
    @confirm="handleDeleteProduct"
  />
</template>
