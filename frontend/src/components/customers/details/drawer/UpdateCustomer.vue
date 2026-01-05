<script setup lang="ts">
import BaseDrawer from "@/components/Base/BaseDrawer.vue";
import type { ICustomer, IUpdateCustomer } from "@/types";
import { reactive, watch } from "vue";

interface Props {
  modelValue: boolean;
  initialValues: ICustomer;
}

interface Emits {
  (e: "update:modelValue", value: boolean): void;
  (e: "submit", payload: IUpdateCustomer): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const form = reactive<IUpdateCustomer>({
  firstName: "",
  lastName: "",
  role: "user",
  isActive: true,
});

watch(
  () => props.modelValue,
  (isOpen) => {
    if (!isOpen) {
      return;
    }

    form.firstName = props.initialValues.firstName;
    form.lastName = props.initialValues.lastName;
    form.role = props.initialValues.role;
    form.isActive = props.initialValues.isActive;
  },
  { immediate: true }
);

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
    title="Update customer"
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

        <!-- Update -->
        <button
          class="rounded border border-neutral-900 bg-neutral-900 px-3 py-1.5 text-sm text-white"
          @click="submit"
        >
          Update
        </button>
      </div>
    </template>
  </BaseDrawer>
</template>
