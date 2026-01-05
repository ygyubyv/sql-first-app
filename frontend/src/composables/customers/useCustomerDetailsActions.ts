import { remove, update } from "@/services/customers/customer.service";
import type { IUpdateCustomer } from "@/types";
import { ref } from "vue";

export const useCustomerDetailsActions = (customerId: number) => {
  const updateCustomerDrawerIsVisible = ref(false);
  const deleteCustomerDialogIsVisible = ref(false);

  const onUpdateCustomerAction = () => {
    updateCustomerDrawerIsVisible.value = true;
  };

  const onDeleteCustomerAction = () => {
    deleteCustomerDialogIsVisible.value = true;
  };

  const handleUpdateCustomer = async (payload: IUpdateCustomer) => {
    try {
      await update(customerId, payload);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCustomer = async () => {
    try {
      await remove(customerId);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    updateCustomerDrawerIsVisible,
    deleteCustomerDialogIsVisible,
    onUpdateCustomerAction,
    onDeleteCustomerAction,
    handleUpdateCustomer,
    handleDeleteCustomer,
  };
};
