<template>
  <div
    class="animate-pulse overflow-hidden rounded-lg border border-neutral-200 bg-white"
  >
    <table class="w-full border-collapse">
      <thead class="bg-neutral-50">
        <tr>
          <th v-for="i in 6" :key="i" class="px-4 py-3">
            <div class="h-3 w-16 rounded bg-neutral-200" />
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-neutral-200">
        <tr v-for="i in 6" :key="i">
          <td class="px-4 py-3">
            <div class="h-3 w-12 rounded bg-neutral-200" />
          </td>
          <td class="px-4 py-3">
            <div class="space-y-1">
              <div class="h-3 w-32 rounded bg-neutral-200" />
              <div class="h-2 w-40 rounded bg-neutral-100" />
            </div>
          </td>
          <td class="px-4 py-3">
            <div class="h-4 w-20 rounded-full bg-neutral-200" />
          </td>
          <td class="px-4 py-3">
            <div class="h-3 w-16 rounded bg-neutral-200" />
          </td>
          <td class="px-4 py-3">
            <div class="h-3 w-20 rounded bg-neutral-200" />
          </td>
          <td class="px-4 py-3">
            <div class="h-6 w-20 rounded bg-neutral-200" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
