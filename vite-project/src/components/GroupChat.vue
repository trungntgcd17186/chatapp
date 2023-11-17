<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  id: string | number;
  avatar: string;
  lastMessage: string | undefined;
  first_name: string;
  last_name: string;
  groupName: string;
}>();
</script>

<template>
  <img
    :src="props?.avatar || `https://i.pravatar.cc/150?img=${props?.id}`"
    class="w-12 h-12 rounded-full"
    alt="Avatar"
  />
</template>

<style scoped>
/* Your style code here */
</style>
