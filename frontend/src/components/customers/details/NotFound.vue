<template>
  <div class="rounded-xl border border-gray-200 bg-white p-6 text-center">
    <h2 class="text-lg font-semibold text-gray-900">Customer not found</h2>
    <p class="mt-2 text-sm text-gray-500">
      The requested customer does not exist.
    </p>

    <button
      class="mt-4 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white"
      @click="$router.push('/customers')"
    >
      Back to customers
    </button>
  </div>
</template>
