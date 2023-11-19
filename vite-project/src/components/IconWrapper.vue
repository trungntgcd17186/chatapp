<script setup lang="ts">
import { ref } from "vue";

const isMouseDown = ref(false);
</script>

<template>
  <div v-if="$slots.default">
    <div v-for="component in $slots.default()">
      <div
        :class="[
          'flex items-center justify-center w-9 h-9 rounded-full cursor-pointer',
          { 'bg-[#0000002a]': isMouseDown },
          { 'bg-[#0000000a]': !isMouseDown },
          { 'hover:bg-[#0000001a]': !isMouseDown },
        ]"
        @mousedown="isMouseDown = true"
        @mouseup="isMouseDown = false"
      >
        <component :is="component" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Your style code here */
</style>
