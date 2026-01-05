<script setup lang="ts">
import BaseDrawer from "@/components/Base/BaseDrawer.vue";
import type { ICreateCustomer } from "@/types";
import { reactive } from "vue";

interface Props {
  modelValue: boolean;
}

interface Emits {
  (e: "update:modelValue", value: boolean): void;
  (e: "submit", payload: ICreateCustomer): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const form = reactive<ICreateCustomer>({
  firstName: "",
  lastName: "",
  email: "",
  phone: null,
  password: "",
  role: "user",
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
    title="Create customer"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="space-y-4">
      <!-- First name -->
      <div>
        <label class="mb-1 block text-xs text-neutral-500"> First name </label>
        <input
          v-model="form.firstName"
          type="text"
          class="w-full rounded border px-2 py-1.5 text-sm"
        />
      </div>

      <!-- Last name -->
      <div>
        <label class="mb-1 block text-xs text-neutral-500"> Last name </label>
        <input
          v-model="form.lastName"
          type="text"
          class="w-full rounded border px-2 py-1.5 text-sm"
        />
      </div>

      <!-- Email -->
      <div>
        <label class="mb-1 block text-xs text-neutral-500"> Email </label>
        <input
          v-model="form.email"
          type="email"
          class="w-full rounded border px-2 py-1.5 text-sm"
        />
      </div>

      <!-- Phone -->
      <div>
        <label class="mb-1 block text-xs text-neutral-500"> Phone </label>
        <input
          v-model="form.phone"
          type="tel"
          placeholder="+380..."
          class="w-full rounded border px-2 py-1.5 text-sm"
        />
      </div>

      <!-- Password -->
      <div>
        <label class="mb-1 block text-xs text-neutral-500"> Password </label>
        <input
          v-model="form.password"
          type="password"
          class="w-full rounded border px-2 py-1.5 text-sm"
        />
      </div>

      <!-- Role -->
      <div>
        <label class="mb-1 block text-xs text-neutral-500"> Role </label>
        <select
          v-model="form.role"
          class="w-full rounded border px-2 py-1.5 text-sm"
        >
          <option value="user">User</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
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
          Active customer
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
