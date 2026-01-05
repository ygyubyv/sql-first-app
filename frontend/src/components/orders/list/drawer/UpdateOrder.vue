<script setup lang="ts">
import BaseDrawer from "@/components/Base/BaseDrawer.vue";
import type { IOrderListItem, IUpdateOrder } from "@/types";
import { reactive, watch } from "vue";

interface Props {
  modelValue: boolean;
  initialValues: IOrderListItem;
}

interface Emits {
  (e: "update:modelValue", value: boolean): void;
  (e: "submit", payload: IUpdateOrder): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const form = reactive<IUpdateOrder>({
  status: "pending",
  paymentMethod: "card",
});

watch(
  () => props.modelValue,
  (isOpen) => {
    if (!isOpen) {
      return;
    }

    form.status = props.initialValues.status;
    form.paymentMethod = props.initialValues.paymentMethod;
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
    title="Update order"
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="space-y-4">
      <!-- Status -->
      <div>
        <label class="mb-1 block text-xs text-neutral-500"> Status </label>
        <select
          v-model="form.status"
          class="w-full rounded border px-2 py-1.5 text-sm"
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <!-- Payment method -->
      <div>
        <label class="mb-1 block text-xs text-neutral-500">
          Payment method
        </label>
        <select
          v-model="form.paymentMethod"
          class="w-full rounded border px-2 py-1.5 text-sm"
        >
          <option value="card">Card</option>
          <option value="cash">Cash</option>
          <option value="transfer">Transfer</option>
        </select>
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
