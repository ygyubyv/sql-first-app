import type {
  ICreateOrder,
  IProductListItem,
  IProductWithQuantity,
  PaymentMethodKeys,
} from "@/types";
import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";
import { create } from "@/services/cart/cart.service";

export const useCartStore = defineStore("cart", () => {
  const paymentMethod = ref<PaymentMethodKeys>("card");
  const cartProducts = ref<IProductWithQuantity[]>([]);

  const totalPrice = computed(() => {
    return cartProducts.value.reduce((acc, currentValue) => {
      return acc + currentValue.price * currentValue.quantity;
    }, 0);
  });

  const persist = () => {
    localStorage.setItem("cart", JSON.stringify(cartProducts.value));
  };

  const resetState = () => {
    paymentMethod.value = "card";
    cartProducts.value = [];
  };

  const addToCart = (product: IProductListItem) => {
    if (product.stock === 0) {
      return;
    }

    const targetIndex = cartProducts.value.findIndex((p) => {
      return p.id === product.id;
    });

    if (targetIndex !== -1) {
      cartProducts.value[targetIndex]!.quantity += 1;
    } else {
      cartProducts.value.push({
        ...product,
        quantity: 1,
      });
    }

    persist();
  };

  const increaseQuantity = (product: IProductWithQuantity) => {
    if (product.stock === 0) {
      return;
    }

    const targetIndex = cartProducts.value.findIndex((p) => {
      return p.id === product.id;
    });

    if (targetIndex !== -1) {
      cartProducts.value[targetIndex]!.quantity += 1;
    }
  };

  const decreaseQuantity = (product: IProductWithQuantity) => {
    const targetIndex = cartProducts.value.findIndex((p) => {
      return p.id === product.id;
    });

    if (targetIndex !== -1) {
      cartProducts.value[targetIndex]!.quantity -= 1;
    }
  };

  const removeFromCart = (product: IProductWithQuantity) => {
    const targetIndex = cartProducts.value.findIndex((p) => {
      return p.id === product.id;
    });

    if (targetIndex !== -1) {
      cartProducts.value.splice(targetIndex, 1);
    }

    persist();
  };

  const handleCheckout = async (onSuccess: () => void) => {
    const payload: ICreateOrder = {
      customerId: 1,
      paymentMethod: paymentMethod.value,
      products: cartProducts.value.map((product) => {
        return {
          id: product.id,
          quantity: product.quantity,
        };
      }),
    };

    try {
      await create(payload);

      resetState();
      persist();

      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  const initialize = () => {
    const raw = localStorage.getItem("cart");

    if (raw) {
      cartProducts.value = JSON.parse(raw);
    }
  };

  onMounted(initialize);

  return {
    paymentMethod,
    cartProducts,
    totalPrice,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    handleCheckout,
    initialize,
  };
});
