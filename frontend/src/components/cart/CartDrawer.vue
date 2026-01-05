<script setup lang="ts">
import BaseDrawer from "@/components/Base/BaseDrawer.vue";
import type { IProductWithQuantity, PaymentMethodKeys } from "@/types";
import { ref, watch } from "vue";

interface Props {
  modelValue: boolean;
  totalPrice: number;
  products: IProductWithQuantity[];
  paymentMethod: PaymentMethodKeys;
}

interface Emits {
  (e: "update:modelValue", value: boolean): void;
  (e: "checkout"): void;
  (e: "update:paymentMethod", value: PaymentMethodKeys): void;
  (e: "increase", product: IProductWithQuantity): void;
  (e: "decrease", product: IProductWithQuantity): void;
  (e: "remove", product: IProductWithQuantity): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const selectedPaymentMethod = ref<PaymentMethodKeys>(props.paymentMethod);

const close = () => {
  emit("update:modelValue", false);
};

const checkout = () => {
  emit("checkout");
  close();
};

watch(selectedPaymentMethod, (val) => {
  emit("update:paymentMethod", val);
});
</script>

<template>
  <BaseDrawer
    title="Shopping cart"
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="flex h-full flex-col">
      <div class="flex-1 space-y-4 overflow-y-auto">
        <div
          v-if="!products.length"
          class="flex h-full flex-col items-center justify-center text-center"
        >
          <div
            class="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-500"
          >
            🛒
          </div>
          <p class="text-sm font-medium text-neutral-800">Your cart is empty</p>
          <p class="mt-1 text-xs text-neutral-500">
            Add products to start an order
          </p>
        </div>

        <!-- Products -->
        <div v-else class="space-y-3">
          <div
            v-for="product in products"
            :key="product.id"
            class="flex items-center gap-4 rounded-lg border border-neutral-200 p-3"
          >
            <!-- Image Url -->
            <img
              :src="product.imageUrl"
              alt=""
              class="h-14 w-14 rounded-md object-cover"
            />

            <!-- Info -->
            <div class="flex flex-1 flex-col">
              <span class="text-sm font-medium text-neutral-900">
                {{ product.title }}
              </span>

              <!-- Quantity -->
              <div class="mt-1 flex items-center gap-2">
                <button
                  class="flex h-5 w-5 items-center justify-center rounded border text-sm hover:bg-neutral-100 disabled:opacity-40"
                  :disabled="product.quantity <= 1"
                  @click="emit('decrease', product)"
                >
                  −
                </button>

                <span class="text-sm font-medium">
                  {{ product.quantity }}
                </span>

                <button
                  class="flex h-5 w-5 items-center justify-center rounded border text-sm hover:bg-neutral-100"
                  @click="emit('increase', product)"
                >
                  +
                </button>
              </div>
            </div>

            <!-- Price -->
            <div class="flex flex-col items-end gap-1">
              <button
                class="text-neutral-400 hover:text-red-500"
                title="Remove"
                @click="emit('remove', product)"
              >
                ✕
              </button>

              <div class="text-sm font-medium text-neutral-900">
                ${{ product.price * product.quantity }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <!-- Footer -->
      <div class="flex items-center justify-between">
        <!-- Total -->
        <div>
          <div class="text-sm text-neutral-500">Total</div>
          <div class="text-lg font-semibold text-neutral-900">
            ${{ totalPrice }}
          </div>
        </div>

        <div class="flex items-center gap-3">
          <!-- Payment method -->
          <select
            v-model="selectedPaymentMethod"
            class="rounded border px-2 py-1.5 text-sm"
          >
            <option value="card">Card</option>
            <option value="cash">Cash</option>
            <option value="transfer">Transfer</option>
          </select>

          <!-- Actions -->
          <button
            class="rounded-md border px-3 py-1.5 text-sm hover:bg-neutral-100"
            @click="close"
          >
            Close
          </button>

          <button
            :disabled="!products.length"
            @click="checkout"
            class="rounded-md bg-neutral-900 px-3 py-1.5 text-sm text-white hover:bg-neutral-800 disabled:bg-neutral-300"
          >
            Checkout
          </button>
        </div>
      </div>
    </template>
  </BaseDrawer>
</template>
