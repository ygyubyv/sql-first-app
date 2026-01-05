<script setup lang="ts">
interface Emits {
  (e: "create"): void;
}

const emit = defineEmits<Emits>();
</script>

<template>
  <div class="mb-6 flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-semibold text-gray-900">Customers</h1>
      <p class="mt-1 text-sm text-gray-500">
        View registered customers and their basic information
      </p>
    </div>

    <button
      class="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
      @click="emit('create')"
    >
      + Create customer
    </button>
  </div>
</template>
