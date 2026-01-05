<template>
  <div
    class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  >
    <div
      v-for="i in 8"
      :key="i"
      class="animate-pulse overflow-hidden rounded border border-neutral-200 bg-white"
    >
      <div class="aspect-[4/3] bg-neutral-200" />
      <div class="space-y-2 p-3">
        <div class="h-4 w-3/4 rounded bg-neutral-200" />
        <div class="h-3 w-1/2 rounded bg-neutral-200" />
        <div class="h-3 w-1/3 rounded bg-neutral-200" />
      </div>
    </div>
  </div>
</template>
