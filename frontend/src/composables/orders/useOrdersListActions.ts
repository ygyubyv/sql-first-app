import type { IOrderListItem, IUpdateOrder } from "@/types";
import { remove, update } from "@/services/orders/order.service";
import { ref } from "vue";

export const useOrdersListActions = () => {
  const selectedOrder = ref<IOrderListItem | null>(null);

  const updateOrderDrawerIsVisible = ref(false);
  const deleteOrderDialogIsVisible = ref(false);

  const onUpdateOrder = (order: IOrderListItem) => {
    selectedOrder.value = order;
    updateOrderDrawerIsVisible.value = true;
  };

  const onDeleteOrder = (order: IOrderListItem) => {
    selectedOrder.value = order;
    deleteOrderDialogIsVisible.value = true;
  };

  const handleUpdateOrder = async (payload: IUpdateOrder) => {
    try {
      await update(selectedOrder.value!.id, payload);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteOrder = async () => {
    try {
      await remove(selectedOrder.value!.id);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    selectedOrder,
    updateOrderDrawerIsVisible,
    deleteOrderDialogIsVisible,
    onUpdateOrder,
    onDeleteOrder,
    handleUpdateOrder,
    handleDeleteOrder,
  };
};
