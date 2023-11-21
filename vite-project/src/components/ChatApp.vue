<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { io } from "socket.io-client";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { get, post } from "../api";
import LeftNav from "../components/LevNav/LeftNav.vue";
import { loggedUserInfo, setLoggedUserInfo } from "../globalState";
import useGetListConversation from "../hooks/useGetListConversation";
import { Conversation, Message, UserInfo } from "../type";
import ConversationInfo from "./ConversationInfo.vue";
import LeftSide from "./LeftSide.vue";
import RightSide from "./RightSide.vue";

type NotificationData = Record<
  number,
  { count: number; lastMessage: string; userFirstName: string }
>;
const route = useRoute();

const listConversation = useGetListConversation();

const messages = ref<Message[]>([]);
const noti = ref<NotificationData>({});
const typingData = ref({ isTyping: false, userId: null, conversationId: null });

const socket = io("ws://localhost:9091");
onMounted(async () => {
  const res = await get("/auth/me", true);
  setLoggedUserInfo(res.data);

  listConversation?.value?.forEach((x: Conversation) =>
    socket.emit("joinRoom", x.id)
  );
  socket.on("recMessage", (message: Message) => {
    noti.value[message?.conversation_id] = {
      count: (noti.value[message?.conversation_id]?.count || 0) + 1,
      lastMessage: message.text,
      userFirstName: message?.user?.first_name,
    };
    if (message.conversation_id == +route.params.id)
      messages.value.push(message);
  });

  socket.on("onTypingMessage", (data: any) => {
    if (data.userId != loggedUserInfo.value.id) typingData.value = data;
  });
});

const members = computed(() => {
  return (
    listConversation?.value
      ?.find((x: any) => x.id == route.params.id)
      ?.members?.filter(
        (member: UserInfo) => member.id != loggedUserInfo.value.id
      ) || []
  );
});

const routeId = computed(() => route.params.id);
useQuery({
  queryKey: ["getListMessage", routeId],
  queryFn: () =>
    post("/chat/list-message", {
      conversation_id: +route.params.id,
    }),
  select: (response) => {
    messages.value = response.data;
    return response.data;
  },
  refetchOnMount: false,
  staleTime: Infinity,
});
</script>

<template>
  <div class="chat-app flex bg-white">
    <LeftNav />
    <LeftSide
      :noti="noti"
      :isTyping="typingData.isTyping"
      :userTypingId="typingData.userId"
      :conversationTyping="typingData.conversationId"
    />
    <RightSide
      :conversationId="+route.params.id"
      :members="members"
      :messages="messages"
      :isTyping="
        typingData.isTyping && typingData.conversationId == +route.params.id
      "
      :userTypingId="typingData.userId"
    />
    <ConversationInfo />
  </div>
</template>
<style scoped></style>
