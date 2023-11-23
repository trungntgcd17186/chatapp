<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  id: number;
  title: string;
  icon: any;
  notiCount?: number;
  isActive: boolean;
}>();

const isMouseDown = ref(false);
</script>

<template>
  <div
    :class="[
      'flex gap-2 h-[44px] items-center rounded-[8px] px-2',
      { 'hover:bg-[#0000000d]': !isMouseDown },
      { 'bg-[#0000000a]': isActive },
      { 'bg-[#0000001a]': isMouseDown },
    ]"
    @mousedown="isMouseDown = true"
    @mouseup="isMouseDown = false"
  >
    <svg
      v-html="icon"
      viewBox="0 0 36 36"
      class="x1lliihq x1k90msu x2h7rmj x1qfuztq x19dipnz"
      :fill="isActive ? '' : '#65676b'"
      height="28"
      width="28"
      style="--color: var(--placeholder-icon)"
    ></svg>

    <div class="text-[15px] font-medium">{{ title }}</div>
  </div>
</template>
<style scoped></style>
