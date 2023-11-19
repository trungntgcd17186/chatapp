<script setup lang="ts">
import { defineProps } from "vue";
import TypingAnimation from "./TypingAnimation.vue";

defineProps<{
  id: string | number;
  avatar: string;
  lastMessage: string | undefined;
  first_name: string;
  last_name: string;
  isTyping: boolean;
  conversationTyping: number | null;
  conversationId: number;
  nameUserLastMessage: string;
}>();
</script>

<template>
  <div class="flex items-center gap-[10px]">
    <img
      :src="avatar || `https://i.pravatar.cc/150?img=${id}`"
      class="w-[48px] h-[48px] rounded-full"
      alt="Avatar"
    />
    <div>
      <p class="text-sm font-medium capitalize">
        {{ first_name + " " + last_name }}
      </p>
      <TypingAnimation
        v-if="isTyping && conversationTyping == conversationId"
      />
      <div v-else class="mt-1 flex gap-1">
        <div class="text-[13px] text-gray-500 capitalize">
          {{ nameUserLastMessage + ":" }}
        </div>
        <div class="text-[13px] text-gray-500">
          {{ lastMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Your style code here */
</style>
