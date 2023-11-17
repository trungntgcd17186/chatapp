<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  id: string | number;
  avatar: string;
  lastMessage: string | undefined;
  first_name: string;
  last_name: string;
}>();
</script>

<template>
  <div class="flex gap-4">
    <img
      :src="avatar || `https://i.pravatar.cc/150?img=${id}`"
      class="w-12 h-12 rounded-full"
      alt="Avatar"
    />
    <div>
      <p class="text-sm font-medium capitalize">
        {{ first_name + " " + last_name }}
      </p>
      <p class="text-xs text-gray-500">{{ lastMessage || "" }}</p>
    </div>
  </div>
</template>

<style scoped>
/* Your style code here */
</style>
