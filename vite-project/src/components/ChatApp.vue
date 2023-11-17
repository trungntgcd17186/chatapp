<script setup lang="ts">
import { io } from "socket.io-client";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { get, post } from "../api";
import { loggedUserInfo, setLoggedUserInfo } from "../globalState";
import useGetListConversation from "../hooks/useGetListConversation";
import { Message } from "../type";
import LeftSide from "./LeftSide.vue";
import RightSide from "./RightSide.vue";

const route = useRoute();

const listConversation = useGetListConversation();

const messages = ref<Message[]>([]);

const socket = io("ws://localhost:9091");
onMounted(async () => {
  const res = await get("/auth/me", true);
  setLoggedUserInfo(res.data);

  // listConversation?.value?.forEach(x =>  socket.emit("joinRoom", x.id))
  socket.emit("joinRoom", 6);
  socket.emit("joinRoom", 7);
  socket.on(
    "recMessage",
    (message: { text: string; conversation_id: number; user: any }) => {
      if (message.conversation_id == +route.params.id)
        messages.value.push(message);
    }
  );
});

const members = computed(() => {
  return (
    listConversation?.value
      ?.find((x: any) => x.id == route.params.id)
      ?.members?.filter((member) => member.id != loggedUserInfo.value.id) || []
  );
});

watch(
  () => route.params.id,
  async (newVal) => {
    const listMessage = await post("/chat/list-message", {
      conversation_id: newVal,
    });
    messages.value = listMessage.data;
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div class="chat-app flex bg-white min-h-[100dvh]">
    <LeftSide />
    <RightSide
      :conversationId="+route.params.id"
      :members="members"
      :messages="messages"
    />
  </div>
</template>
<style scoped></style>
