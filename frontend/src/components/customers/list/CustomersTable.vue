<script setup lang="ts">
import type { ICustomerListItem } from "@/types";
import CustomersLoading from "./CustomersLoading.vue";

interface Props {
  isLoading: boolean;
  customers: ICustomerListItem[] | null;
}

defineProps<Props>();
</script>

<template>
  <section>
    <!-- Table -->
    <div
      v-if="customers?.length && !isLoading"
      class="overflow-hidden rounded-xl border border-gray-200 bg-white"
    >
      <table class="w-full border-collapse">
        <thead class="bg-gray-50">
          <tr>
            <!-- User -->
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500">
              User
            </th>

            <!-- Email -->
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500">
              Email
            </th>

            <!-- Role -->
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500">
              Role
            </th>

            <!-- Status -->
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500">
              Status
            </th>

            <!-- Created At -->
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500">
              Created At
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="customer in customers"
            :key="customer.id"
            class="cursor-pointer transition hover:bg-gray-50"
            @click="$router.push(`/customers/${customer.id}`)"
          >
            <!-- User -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div
                  class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700"
                >
                  {{ customer.firstName[0] }}{{ customer.lastName[0] }}
                </div>

                <div class="flex flex-col">
                  <span class="font-medium text-gray-900">
                    {{ customer.firstName }} {{ customer.lastName }}
                  </span>
                </div>
              </div>
            </td>

            <!-- Email -->
            <td class="px-6 py-4 text-sm text-gray-700">
              {{ customer.email }}
            </td>

            <!-- Role -->
            <td class="px-6 py-4">
              <span
                class="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize"
                :class="{
                  'bg-red-100 text-red-700': customer.role === 'admin',
                  'bg-indigo-100 text-indigo-700': customer.role === 'manager',
                  'bg-gray-100 text-gray-700': customer.role === 'user',
                }"
              >
                {{ customer.role }}
              </span>
            </td>

            <!-- Status -->
            <td class="px-6 py-4">
              <span
                class="text-sm font-medium"
                :class="customer.isActive ? 'text-green-600' : 'text-gray-400'"
              >
                {{ customer.isActive ? "Active" : "Inactive" }}
              </span>
            </td>

            <!-- Created At -->
            <td class="px-6 py-4 text-sm text-gray-500">
              {{ new Date(customer.createdAt).toLocaleDateString() }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Loading -->
    <CustomersLoading v-else-if="isLoading" />

    <!-- Empty -->
    <div
      v-else
      class="flex flex-col items-center justify-center rounded border border-dashed border-gray-300 p-8 text-center"
    >
      <p class="text-sm font-medium text-gray-700">No customers found</p>
      <p class="mt-1 text-xs text-gray-500">Create a customer to get started</p>
    </div>
  </section>
</template>
