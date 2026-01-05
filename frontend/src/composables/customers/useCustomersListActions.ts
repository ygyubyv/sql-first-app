import { create } from "@/services/customers/customer.service";
import type { ICreateCustomer } from "@/types";
import { ref } from "vue";

export const useCustomersListActions = () => {
  const createCustomerDrawerIsVisible = ref(false);

  const onCreateCustomer = () => {
    createCustomerDrawerIsVisible.value = true;
  };

  const handleCreateCustomer = async (payload: ICreateCustomer) => {
    try {
      await create(payload);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    createCustomerDrawerIsVisible,
    onCreateCustomer,
    handleCreateCustomer,
  };
};
