<script setup lang="ts">
import { defineProps, ref } from "vue";
import { UserInfo } from "../type";
import SingleChat from "./SingleChat.vue";
import TypingAnimation from "./TypingAnimation.vue";

const { members } = defineProps<{
  conversationId: number;
  lastMessage: string | undefined;
  isActive: boolean;
  members: UserInfo[];
  notiCount: number;
  isTyping: boolean;
  conversationTyping: number | null;
  nameUserLastMessage: string;
}>();

const isMouseDown = ref(false);
const groupName = members?.map((x: UserInfo) => x.first_name).join(", ");
</script>

<template>
  <div
    class="flex relative"
    @mousedown="isMouseDown = true"
    @mouseup="isMouseDown = false"
    :class="[
      'flex gap-4 px-[10px] py-[10px] rounded-[8px]',
      { 'hover:bg-[#0000000d]': !isMouseDown },
      { 'bg-[#0000000a]': isActive },
      { 'bg-[#0000001a]': isMouseDown },
    ]"
  >
    <div v-for="item in members" :key="item.id">
      <SingleChat
        v-if="members.length === 1"
        :id="item.id"
        :avatar="item.avatar || ''"
        :first_name="item.first_name"
        :last_name="item.last_name"
        :lastMessage="lastMessage"
        :isTyping="isTyping"
        :conversationTyping="conversationTyping"
        :conversationId="conversationId"
        :nameUserLastMessage="nameUserLastMessage"
      />

      <img
        v-else
        :src="item?.avatar || `https://i.pravatar.cc/150?img=${item.id}`"
        class="w-12 h-12 rounded-full"
        alt="Avatar"
      />
    </div>
    <div v-if="members.length > 1">
      <div class="text-base font-medium capitalize">
        {{ groupName }}
      </div>

      <TypingAnimation
        v-if="isTyping && conversationTyping == conversationId"
      />

      <div v-else class="flex gap-1">
        <div class="text-xs text-gray-500 capitalize">
          {{ nameUserLastMessage + ":" }}
        </div>
        <div class="text-xs text-gray-500 text-ellipsis overflow-hidden whitespace-nowrap max-w-[140px]">
          {{ lastMessage }}
        </div>
      </div>
    </div>

    <a-badge
      class="absolute right-3 top-[50%] translate-y-[-50%]"
      :count="notiCount"
    />
  </div>
</template>

<style scoped></style>
