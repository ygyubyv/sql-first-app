<script setup lang="ts">
import BaseDrawer from "@/components/Base/BaseDrawer.vue";
import type { ICreateProduct } from "@/types";
import { reactive } from "vue";

interface Props {
  modelValue: boolean;
}

interface Emits {
  (e: "update:modelValue", value: boolean): void;
  (e: "submit", payload: ICreateProduct): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const form = reactive<ICreateProduct>({
  title: "",
  imageUrl: "",
  sku: null,

  price: 0,
  stock: 0,

  brand: null,
  category: null,
  description: null,

  isActive: true,
});

const close = () => {
  emit("update:modelValue", false);
};

const submit = () => {
  emit("submit", { ...form });
  close();
};
</script>

<template>
  <BaseDrawer
    :model-value="modelValue"
    title="Create product"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="space-y-4">
      <!-- Title -->
      <div>
        <label class="mb-1 block text-xs text-neutral-500"> Title </label>
        <input
          v-model="form.title"
          type="text"
          class="w-full rounded border px-2 py-1.5 text-sm"
        />
      </div>

      <!-- Image Url -->
      <div>
        <label class="mb-1 block text-xs text-neutral-500"> Image URL </label>
        <input
          v-model="form.imageUrl"
          type="text"
          class="w-full rounded border px-2 py-1.5 text-sm"
        />
      </div>

      <!-- Image preview -->
      <div v-if="form.imageUrl" class="overflow-hidden rounded border">
        <img :src="form.imageUrl" alt="" class="h-40 w-full object-cover" />
      </div>

      <!-- Sku -->
      <div>
        <label class="mb-1 block text-xs text-neutral-500"> SKU </label>
        <input
          v-model="form.sku"
          type="text"
          class="w-full rounded border px-2 py-1.5 text-sm"
        />
      </div>

      <div class="grid grid-cols-2 gap-3">
        <!-- Brand -->
        <div>
          <label class="mb-1 block text-xs text-neutral-500"> Brand </label>
          <input
            v-model="form.brand"
            type="text"
            class="w-full rounded border px-2 py-1.5 text-sm"
          />
        </div>

        <!-- Category -->
        <div>
          <label class="mb-1 block text-xs text-neutral-500"> Category </label>
          <input
            v-model="form.category"
            type="text"
            class="w-full rounded border px-2 py-1.5 text-sm"
          />
        </div>
      </div>

      <!-- Description -->
      <div>
        <label class="mb-1 block text-xs text-neutral-500"> Description </label>
        <textarea
          v-model="form.description"
          rows="3"
          class="w-full resize-none rounded border px-2 py-1.5 text-sm"
        />
      </div>

      <div class="grid grid-cols-2 gap-3">
        <!-- Price -->
        <div>
          <label class="mb-1 block text-xs text-neutral-500"> Price </label>
          <input
            v-model.number="form.price"
            type="number"
            min="0"
            class="w-full rounded border px-2 py-1.5 text-sm"
          />
        </div>

        <!-- Stock -->
        <div>
          <label class="mb-1 block text-xs text-neutral-500"> Stock </label>
          <input
            v-model.number="form.stock"
            type="number"
            min="0"
            class="w-full rounded border px-2 py-1.5 text-sm"
          />
        </div>
      </div>

      <!-- Active -->
      <div class="flex items-center gap-2">
        <input
          id="active"
          v-model="form.isActive"
          type="checkbox"
          class="h-4 w-4"
        />
        <label for="active" class="text-sm text-neutral-700">
          Active product
        </label>
      </div>
    </div>

    <!-- Actions -->
    <template #footer>
      <div class="flex justify-end gap-2">
        <!-- Cancel -->
        <button class="rounded border px-3 py-1.5 text-sm" @click="close">
          Cancel
        </button>

        <!-- Create -->
        <button
          class="rounded border border-neutral-900 bg-neutral-900 px-3 py-1.5 text-sm text-white"
          @click="submit"
        >
          Create
        </button>
      </div>
    </template>
  </BaseDrawer>
</template>
