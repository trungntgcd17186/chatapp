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

const route = useRoute();
const routeId = computed(() => +route.params.id);
const listConversation = useGetListConversation();

const messages = ref<Message[]>([]);
const notiLocal = JSON.parse(localStorage.getItem("notiInfo") || "{}");
const noti = ref<any>(notiLocal);
const typingData = ref({ isTyping: false, userId: null, conversationId: null });

const socket = io("ws://3.106.2.251:9091");
onMounted(async () => {
  const res = await get("/auth/me", true);
  setLoggedUserInfo(res.data);

  listConversation?.value?.forEach((x: Conversation) =>
    socket.emit("joinRoom", x.id)
  );
  socket.on("recMessage", (message: Message) => {
    noti.value[message?.conversation_id] = {
      hasUnreadMessage: message?.user?.id !== loggedUserInfo.value.id && true,
      lastMessage: message.text,
      userFirstName: message?.user?.first_name,
      userId: message?.user?.id,
    };
    if (message?.user?.id != loggedUserInfo.value.id) {
      const notiLocal = JSON.parse(localStorage.getItem("notiInfo") || "{}");
      localStorage.setItem(
        "notiInfo",
        JSON.stringify({
          ...notiLocal,
          [message?.conversation_id]: {
            hasUnreadMessage: true,
          },
        })
      );
    }

    if (message.conversation_id == +route.params.id)
      messages.value.push(message);
  });

  socket.on("onTypingMessage", (data: any) => {
    if (data.userId != loggedUserInfo.value.id) typingData.value = data;
  });

  socket.on("onRemoveUnreadMessage", (data: any) => {
    if (data.userId === loggedUserInfo.value.id) {
      noti.value[data.conversationId].hasUnreadMessage = false;

      const notiLocal = JSON.parse(localStorage.getItem("notiInfo") || "{}");
      localStorage.setItem(
        "notiInfo",
        JSON.stringify({
          ...notiLocal,
          [data.conversationId]: {
            hasUnreadMessage: false,
          },
        })
      );
    }
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
