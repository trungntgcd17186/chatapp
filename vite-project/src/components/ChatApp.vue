<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { io } from 'socket.io-client';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { get, post } from '../api';
import { socketUrl } from '../api/socket';
import LeftNav from '../components/LevNav/LeftNav.vue';
import { loggedUserInfo, setLoggedUserInfo } from '../globalState';
import useGetListConversation from '../hooks/useGetListConversation';
import { Conversation, Message, UserInfo } from '../type';
import ConversationInfo from './ConversationInfo.vue';
import LeftSide from './LeftSide.vue';
import RightSide from './RightSide.vue';

const listConversation = useGetListConversation();

const route = useRoute();
const routeId = computed(() => +route.params.id);
const messages = reactive<{ [id: number]: Message[] }>({});

const notiLocal = JSON.parse(localStorage.getItem('notiInfo') || '{}');
const noti = reactive<{
  [id: number]: {
    id: number;
    hasUnreadMessage: boolean;
    lastMessage: string;
    userFirstName: string;
    userId: string | number;
  };
}>(notiLocal);
const typingData = ref({ isTyping: false, userId: null, conversationId: null });

const socket = io(socketUrl);
onMounted(async () => {
  const res = await get('/auth/me', true);
  setLoggedUserInfo(res.data);

  listConversation?.value?.forEach((x: Conversation) => socket.emit('joinRoom', x.id));
  socket.on('recMessage', (message: Message) => {
    noti[message?.conversation_id] = {
      hasUnreadMessage: message?.user?.id !== loggedUserInfo.value.id && true,
      lastMessage: message.text,
      userFirstName: message?.user?.first_name,
      userId: message?.user?.id,
      id: message?.id,
    };
    if (message?.user?.id != loggedUserInfo.value.id) {
      const notiLocal = JSON.parse(localStorage.getItem('notiInfo') || '{}');
      localStorage.setItem(
        'notiInfo',
        JSON.stringify({
          ...notiLocal,
          [message?.conversation_id]: {
            hasUnreadMessage: true,
          },
        })
      );
    }

    messages[message.conversation_id]?.push(message);
  });

  socket.on('onTypingMessage', (data: any) => {
    if (data.userId != loggedUserInfo.value.id) typingData.value = data;
  });

  socket.on('onRemoveUnreadMessage', (data: any) => {
    if (data.userId === loggedUserInfo.value.id) {
      noti[data.conversationId].hasUnreadMessage = false;

      const notiLocal = JSON.parse(localStorage.getItem('notiInfo') || '{}');
      localStorage.setItem(
        'notiInfo',
        JSON.stringify({
          ...notiLocal,
          [data.conversationId]: {
            hasUnreadMessage: false,
          },
        })
      );
    }
  });

  socket.on('onHasNewConversation', (data) => {
    const hasPermission = data.members.some((x: UserInfo) => x.id === loggedUserInfo.value.id);
    if (hasPermission) {
      socket.emit('joinRoom', data.id);
      listConversation.value.push(data);
    }
  });

  socket.on('onRemoveMessage', ({ conversationId, messageId }) => {
    const messageToUpdate = messages[conversationId]?.find((x) => x.id === messageId);
    if (messageToUpdate) messageToUpdate.isRemoved = true;
  });
});

const members = computed(() => {
  return (
    listConversation?.value?.find((x: any) => x.id == route.params.id)?.members?.filter((member: UserInfo) => member.id != loggedUserInfo.value.id) ||
    []
  );
});

useQuery({
  queryKey: ['getListMessage', routeId],
  queryFn: () =>
    post('/chat/list-message', {
      conversation_id: +route.params.id,
    }),
  select: (response) => {
    messages[+route.params.id] = response.data;
  },
  refetchOnMount: false,
  staleTime: Infinity,
});
</script>

<template>
  <div class="chat-app flex bg-white">
    <LeftNav />
    <LeftSide :noti="noti" :isTyping="typingData.isTyping" :userTypingId="typingData.userId" :conversationTyping="typingData.conversationId" />
    <RightSide
      :conversationId="+route.params.id"
      :members="members"
      :messages="messages[+route.params.id]"
      :isTyping="typingData.isTyping && typingData.conversationId == +route.params.id"
      :userTypingId="typingData.userId"
    />
    <ConversationInfo />
  </div>
</template>
<style scoped></style>
