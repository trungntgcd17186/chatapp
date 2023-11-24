<script setup lang="ts">
// import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
</script>

<template>
  <Suspense>
    <router-view></router-view>
  </Suspense>
  <!-- <VueQueryDevtools position="right" /> -->
</template>
