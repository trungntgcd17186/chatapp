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
    <div v-if="members.length === 1">
      <SingleChat
        :id="members[0]?.id"
        :avatar="members[0].avatar || ''"
        :first_name="members[0].first_name"
        :last_name="members[0].last_name"
        :lastMessage="lastMessage"
        :isTyping="isTyping"
        :conversationTyping="conversationTyping"
        :conversationId="conversationId"
        :nameUserLastMessage="nameUserLastMessage"
      />
    </div>
    <div v-else class="flex items-center gap-[10px]">
      <div class="relative w-[48px] h-[48px]">
        <img
          :src="
            members[0]?.avatar ||
            `https://i.pravatar.cc/150?img=${members[0]?.id}`
          "
          class="absolute left-0 bottom-0 w-[32px] h-[32px] rounded-full z-10"
          alt="Avatar"
        />
        <img
          :src="
            members[1]?.avatar ||
            `https://i.pravatar.cc/150?img=${members[1]?.id}`
          "
          class="absolute right-0 top-0 w-[32px] h-[32px] rounded-full z-0"
          alt="Avatar"
        />
      </div>
      <div>
        <div class="text-base font-medium capitalize">
          {{ groupName }}
        </div>

        <TypingAnimation
          v-if="isTyping && conversationTyping == conversationId"
        />

        <div v-else class="mt-1 flex gap-1">
          <div class="text-[13px] text-gray-500 capitalize">
            {{ nameUserLastMessage + ":" }}
          </div>
          <div
            class="text-[13px] text-gray-500 text-ellipsis overflow-hidden whitespace-nowrap max-w-[140px]"
          >
            {{ lastMessage }}
          </div>
        </div>
      </div>
    </div>

    <a-badge
      class="absolute right-3 top-[50%] translate-y-[-50%]"
      :count="notiCount"
    />
  </div>
</template>

<style scoped>
::v-deep .ant-scroll-number-only-unit {
  color: white;
}

::v-deep .ant-scroll-number-only {
  vertical-align: bottom;
}
</style>
