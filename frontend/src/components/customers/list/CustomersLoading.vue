<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white">
    <table class="w-full border-collapse">
      <tbody>
        <tr
          v-for="i in 6"
          :key="i"
          class="animate-pulse border-b last:border-b-0"
        >
          <td class="px-6 py-4">
            <div class="flex items-center gap-3">
              <div class="h-9 w-9 rounded-full bg-gray-200" />
              <div class="h-4 w-32 rounded bg-gray-200" />
            </div>
          </td>

          <td class="px-6 py-4">
            <div class="h-4 w-40 rounded bg-gray-200" />
          </td>

          <td class="px-6 py-4">
            <div class="h-4 w-20 rounded bg-gray-200" />
          </td>

          <td class="px-6 py-4">
            <div class="h-4 w-16 rounded bg-gray-200" />
          </td>

          <td class="px-6 py-4">
            <div class="h-4 w-24 rounded bg-gray-200" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
