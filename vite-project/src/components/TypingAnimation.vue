<script setup lang="ts">
const { hasBackground = false } = defineProps<{
  hasBackground?: boolean;
}>();
</script>
<template>
  <div
    :class="[
      'dotContainer rounded-[12px] max-w-[60%] w-[fit-content] h-8',
      { 'px-3 py-1 bg-white': hasBackground },
    ]"
  >
    <div class="dot dot1"></div>
    <div class="dot dot2"></div>
    <div class="dot dot3"></div>
  </div>
</template>

<style>
.dotContainer {
  align-items: center;
  display: flex;
  height: 17px;
}

.dot {
  background-color: #90949c;
  border-radius: 50%;
  display: block;
  height: 6px;
  width: 6px;
  margin-right: 4px;
  animation: typingAnimation 1.2s infinite ease-in-out;
}

.dot:nth-child(3) {
  margin-right: 0;
}

@keyframes typingAnimation {
  0% {
    transform: translateY(0px);
  }
  28% {
    transform: translateY(-5px);
  }
  44% {
    transform: translateY(0px);
  }
}

.dot.dot1 {
  animation-delay: 200ms;
}
.dot.dot2 {
  animation-delay: 300ms;
}
.dot.dot3 {
  animation-delay: 400ms;
}
</style>
