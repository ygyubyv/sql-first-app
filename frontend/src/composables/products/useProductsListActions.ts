import type { ICreateProduct } from "@/types";
import { create } from "@/services/products/product.service";
import { ref } from "vue";

export const useProductsListActions = () => {
  const createProductDrawerIsVisible = ref(false);

  const onCreateProduct = () => {
    createProductDrawerIsVisible.value = true;
  };

  const handleCreateProduct = async (payload: ICreateProduct) => {
    try {
      await create(payload);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    createProductDrawerIsVisible,
    onCreateProduct,
    handleCreateProduct,
  };
};
