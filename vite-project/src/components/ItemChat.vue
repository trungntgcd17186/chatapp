<script setup lang="ts">
import { defineProps } from "vue";
import router from "../router";
import { UserInfo } from "../type";
import GroupChat from "./GroupChat.vue";
import SingleChat from "./SingleChat.vue";

const props = defineProps<{
  conversationId: number;
  lastMessage: string | undefined;
  activeId: number | string;
  members: UserInfo[];
}>();

const emit = defineEmits<{
  (e: "update:activeId", id: number): void;
}>();

const groupName = props?.members?.map((x: UserInfo) => x.first_name).join(", ");
</script>

<template>
  <div
    class="flex"
    @click="
      () => {
        $emit('update:activeId', conversationId);
        router.push(`/${conversationId}`);
      }
    "
    :class="[
      'flex',
      'gap-4',
      'px-4',
      'py-[12px]',
      { 'bg-[#F5F5F5]': activeId == conversationId },
    ]"
  >
    <div v-for="item in members" :key="item.id">
      <SingleChat
        v-if="members.length === 1"
        :id="item.id"
        :avatar="item.avatar"
        :first_name="item.first_name"
        :last_name="item.last_name"
        :lastMessage="''"
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
      <div class="text-xs">{{ members?.length }} members</div>
    </div>
  </div>
</template>

<style scoped>
/* Your style code here */
</style>
