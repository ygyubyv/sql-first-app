<script setup lang="ts">
interface Emits {
  (e: "create"): void;
}

const emit = defineEmits<Emits>();
</script>

<template>
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-lg font-medium">Products</h1>
      <p class="text-sm text-neutral-500">
        Manage products, images and inventory
      </p>
    </div>

    <button
      @click="emit('create')"
      class="rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm hover:bg-neutral-100"
    >
      Add product
    </button>
  </div>
</template>
