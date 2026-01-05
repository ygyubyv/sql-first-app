<script setup lang="ts">
import type { IProduct } from "@/types";
import { formatDateTime } from "@/utils/formatDateTime";

interface Props {
  product: IProduct;
}

interface Emits {
  (e: "update"): void;
  (e: "delete"): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-start justify-between">
      <div class="flex items-start gap-4">
        <!-- Image -->
        <div class="h-20 w-20 overflow-hidden rounded border bg-neutral-100">
          <img
            :src="product.imageUrl"
            :alt="product.title"
            class="h-full w-full object-cover"
          />
        </div>

        <!-- Title -->
        <div>
          <h1 class="text-xl font-semibold text-neutral-900">
            {{ product.title }}
          </h1>

          <!-- Sku -->
          <p class="mt-1 text-sm text-neutral-500">
            SKU: {{ product.sku ?? "—" }}
          </p>

          <!-- Stock -->
          <p class="mt-1 text-sm text-neutral-500">
            ${{ product.price }} ·
            <span
              :class="
                product.stock === 0 ? 'text-neutral-400' : 'text-neutral-600'
              "
            >
              {{
                product.stock === 0
                  ? "Out of stock"
                  : `${product.stock} in stock`
              }}
            </span>
          </p>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <!-- Update -->
        <button
          class="rounded border px-3 py-1.5 text-sm hover:bg-neutral-100"
          @click="emit('update')"
        >
          Edit
        </button>

        <!-- Delete -->
        <button
          class="rounded border border-red-600 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
          @click="emit('delete')"
        >
          Delete
        </button>
      </div>
    </div>

    <div class="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-600">
      <!-- Brand -->
      <div>Brand: {{ product.brand ?? "—" }}</div>

      <!-- Category -->
      <div>Category: {{ product.category ?? "—" }}</div>

      <!-- Status -->
      <div>
        Status:
        <span :class="product.isActive ? 'text-green-600' : 'text-neutral-400'">
          {{ product.isActive ? "Active" : "Inactive" }}
        </span>
      </div>
    </div>

    <!-- Description -->
    <div
      v-if="product.description"
      class="rounded border border-neutral-200 bg-white p-4 text-sm text-neutral-700"
    >
      {{ product.description }}
    </div>

    <div class="rounded border border-neutral-200 bg-white p-4">
      <dl class="space-y-2 text-sm">
        <!-- Id -->
        <div class="flex justify-between">
          <dt class="text-neutral-400">ID</dt>
          <dd class="text-neutral-900">{{ product.id }}</dd>
        </div>

        <!-- Created At -->
        <div class="flex justify-between">
          <dt class="text-neutral-400">Created at</dt>
          <dd class="text-neutral-900">
            {{ formatDateTime(product.createdAt) }}
          </dd>
        </div>

        <!-- Updated At -->
        <div class="flex justify-between">
          <dt class="text-neutral-400">Updated at</dt>
          <dd class="text-neutral-900">
            {{ formatDateTime(product.updatedAt) }}
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>
