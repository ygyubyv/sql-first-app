<script setup lang="ts">
import Header from "../components/Header/Header.vue";
import Footer from "../components/Footer/Footer.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col bg-neutral-50 text-neutral-900">
    <Header />

    <main class="flex-1">
      <div class="mx-auto max-w-7xl px-8 py-6">
        <RouterView />
      </div>
    </main>

    <Footer />
  </div>
</template>
