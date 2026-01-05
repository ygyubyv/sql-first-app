<script setup lang="ts">
interface Props {
  modelValue: boolean;
  title?: string;
}

interface Emits {
  (e: "update:modelValue", value: boolean): void;
  (e: "close"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const close = () => {
  emit("update:modelValue", false);
  emit("close");
};
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 z-50 flex justify-end">
      <div class="absolute inset-0 bg-black/30" @click="close" />

      <div
        class="relative z-10 flex h-full w-full max-w-sm flex-col bg-white shadow-xl"
      >
        <div class="flex items-center justify-between border-b px-4 py-3">
          <h2 class="font-medium">
            {{ title }}
          </h2>

          <button
            class="text-neutral-400 hover:text-neutral-700"
            @click="close"
          >
            ✕
          </button>
        </div>

        <div class="flex-1 overflow-auto p-4">
          <slot />
        </div>

        <div class="border-t p-4">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
