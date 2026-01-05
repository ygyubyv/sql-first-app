<script setup lang="ts">
import type { ICustomer } from "@/types";
import { formatDateTime } from "@/utils/formatDateTime";

interface Props {
  customer: ICustomer;
}

interface Emits {
  (e: "update", id: number): void;
  (e: "delete", id: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <!-- Avatar -->
        <div
          class="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200 text-lg font-semibold text-gray-700"
        >
          {{ customer.firstName[0] }}{{ customer.lastName[0] }}
        </div>

        <!-- Overview -->
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">
            {{ customer.firstName }} {{ customer.lastName }}
          </h1>
          <p class="text-sm text-gray-500">
            {{ customer.email }}
          </p>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3">
        <!-- Update -->
        <button
          class="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          @click="emit('update', customer.id)"
        >
          Edit
        </button>

        <!-- Delete -->
        <button
          class="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          @click="emit('delete', customer.id)"
        >
          Delete
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <!-- Role -->
      <div class="rounded-xl border border-gray-200 bg-white p-4">
        <p class="text-xs font-medium uppercase text-gray-400">Role</p>
        <span
          class="mt-2 inline-flex rounded-full px-3 py-1 text-sm font-medium capitalize"
          :class="{
            'bg-red-100 text-red-700': customer.role === 'admin',
            'bg-indigo-100 text-indigo-700': customer.role === 'manager',
            'bg-gray-100 text-gray-700': customer.role === 'user',
          }"
        >
          {{ customer.role }}
        </span>
      </div>

      <!-- Status -->
      <div class="rounded-xl border border-gray-200 bg-white p-4">
        <p class="text-xs font-medium uppercase text-gray-400">Status</p>
        <p
          class="mt-2 text-sm font-medium"
          :class="customer.isActive ? 'text-green-600' : 'text-gray-400'"
        >
          {{ customer.isActive ? "Active" : "Inactive" }}
        </p>
      </div>

      <!-- Last login -->
      <div class="rounded-xl border border-gray-200 bg-white p-4">
        <p class="text-xs font-medium uppercase text-gray-400">Last login</p>
        <p class="mt-2 text-sm text-gray-700">
          {{
            customer.lastLoginAt
              ? formatDateTime(customer.lastLoginAt)
              : "Never"
          }}
        </p>
      </div>
    </div>

    <!-- Details -->
    <div class="rounded-xl border border-gray-200 bg-white">
      <div class="border-b border-gray-200 px-6 py-4">
        <h2 class="text-sm font-semibold text-gray-900">Customer details</h2>
      </div>

      <!-- Phone -->
      <div class="divide-y divide-gray-100">
        <div class="grid grid-cols-3 px-6 py-4 text-sm">
          <span class="text-gray-500">Phone</span>
          <span class="col-span-2 text-gray-900">
            {{ customer.phone ?? "—" }}
          </span>
        </div>

        <!-- Created At -->
        <div class="grid grid-cols-3 px-6 py-4 text-sm">
          <span class="text-gray-500">Created at</span>
          <span class="col-span-2 text-gray-900">
            {{ formatDateTime(customer.createdAt) }}
          </span>
        </div>

        <!-- Updated At -->
        <div class="grid grid-cols-3 px-6 py-4 text-sm">
          <span class="text-gray-500">Updated at</span>
          <span class="col-span-2 text-gray-900">
            {{ formatDateTime(customer.updatedAt) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
