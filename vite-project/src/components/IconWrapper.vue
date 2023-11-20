<script setup lang="ts">
import { ref } from "vue";

const isMouseDown = ref(false);

const {
  width = 9,
  height = 9,
  rounded = "rounded-full",
  isHideBg = false,
} = defineProps<{
  width?: number | string;
  height?: number | string;
  rounded?: number | string;
  isHideBg?: boolean;
}>();
</script>

<template>
  <div class="h-full" v-if="$slots.default">
    <div class="h-full" v-for="component in $slots.default()">
      <div
        :class="[
          `flex items-center justify-center ${rounded} cursor-pointer w-${width} h-${height}`,
          { 'bg-[#0000002a]': isMouseDown },
          { 'bg-[#0000000a]': !isMouseDown },
          { 'bg-[unset]': isHideBg && !isMouseDown },
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
