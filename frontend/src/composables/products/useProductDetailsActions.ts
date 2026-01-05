import type { IUpdateProduct } from "@/types";
import { remove, update } from "@/services/products/product.service";
import { ref } from "vue";

export const useProductDetailsActions = (productId: number) => {
  const updateProductDrawerIsVisible = ref(false);
  const deleteProductDialogIsVisible = ref(false);

  const onUpdateProduct = () => {
    updateProductDrawerIsVisible.value = true;
  };

  const onDeleteProduct = () => {
    deleteProductDialogIsVisible.value = true;
  };

  const handleUpdateProduct = async (payload: IUpdateProduct) => {
    try {
      await update(productId, payload);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await remove(productId);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    updateProductDrawerIsVisible,
    deleteProductDialogIsVisible,
    onUpdateProduct,
    onDeleteProduct,
    handleUpdateProduct,
    handleDeleteProduct,
  };
};
