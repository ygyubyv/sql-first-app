<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import CartDrawer from "@/components/cart/CartDrawer.vue";
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();

const cartDrawerIsVisible = ref(false);

const cartStore = useCartStore();
const { cartProducts, totalPrice, paymentMethod } = storeToRefs(cartStore);
const { increaseQuantity, decreaseQuantity, removeFromCart, handleCheckout } =
  cartStore;

const links = [
  { label: "Products", to: "/products" },
  { label: "Customers", to: "/customers" },
  { label: "Orders", to: "/orders" },
];
</script>

<template>
  <!-- Cart -->
  <CartDrawer
    v-model="cartDrawerIsVisible"
    v-model:payment-method="paymentMethod"
    :products="cartProducts"
    :total-price="totalPrice"
    @checkout="() => handleCheckout(() => router.push('/orders'))"
    @increase="increaseQuantity"
    @decrease="decreaseQuantity"
    @remove="removeFromCart"
  />

  <header class="border-b border-neutral-200 bg-white">
    <div class="mx-auto flex h-14 max-w-7xl items-center justify-between px-8">
      <div class="text-sm font-semibold tracking-tight">Mini OMS</div>

      <nav class="flex items-center gap-6 text-sm">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="transition-colors"
          :class="
            route.path === link.to
              ? 'text-neutral-900 font-medium'
              : 'text-neutral-500 hover:text-neutral-900'
          "
        >
          {{ link.label }}
        </RouterLink>

        <!-- Open Cart -->
        <button
          class="relative rounded border border-neutral-300 px-3 py-1.5 text-sm hover:bg-neutral-100"
          @click="cartDrawerIsVisible = true"
        >
          Cart
        </button>
      </nav>
    </div>
  </header>
</template>
