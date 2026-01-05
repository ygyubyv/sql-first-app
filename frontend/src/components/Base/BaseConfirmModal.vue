<script setup lang="ts">
interface Props {
  modelValue: boolean;
  title: string;
  text: string;
  confirmText?: string;
  cancelText?: string;
}

interface Emits {
  (e: "update:modelValue", value: boolean): void;
  (e: "confirm"): void;
  (e: "cancel"): void;
}

const props = withDefaults(defineProps<Props>(), {
  confirmText: "Confirm",
  cancelText: "Cancel",
});

const emit = defineEmits<Emits>();

const close = () => {
  emit("update:modelValue", false);
  emit("cancel");
};

const confirm = () => {
  emit("confirm");
  emit("update:modelValue", false);
};
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/30" @click="close" />

      <!-- Modal -->
      <div
        class="relative z-10 w-full max-w-sm rounded border border-neutral-200 bg-white shadow-xl"
      >
        <!-- Header -->
        <div class="border-b px-4 py-3">
          <h3 class="text-sm font-medium text-neutral-900">
            {{ title }}
          </h3>
        </div>

        <!-- Content -->
        <div class="px-4 py-3 text-sm text-neutral-600">
          {{ text }}
        </div>

        <!-- Footer -->
        <div class="flex justify-end gap-2 border-t px-4 py-3">
          <button
            class="rounded border px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100"
            @click="close"
          >
            {{ cancelText }}
          </button>

          <button
            class="rounded border border-neutral-900 bg-neutral-900 px-3 py-1.5 text-sm text-white"
            @click="confirm"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
