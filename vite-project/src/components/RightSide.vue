<script setup lang="ts">
import io from 'socket.io-client';
import { Ref, ref, watch } from 'vue';
import { socketUrl } from '../api/socket';
import TypingAnimation from '../components/TypingAnimation.vue';
import { loggedUserInfo } from '../globalState';
import { UserInfo } from '../type';
import IconWrapper from './IconWrapper.vue';
import Messages from './Messages.vue';

const scrollRef: Ref<HTMLElement | null> = ref(null);
const inputValue = ref('');
const inputRef: Ref<HTMLElement | null> = ref(null);
const socket = io(socketUrl);

const { conversationId, messages, isTyping } = defineProps<{
  conversationId: number;
  members: any;
  messages: any;
  isTyping: boolean;
  userTypingId: number | null;
}>();

const sendMessage = (text: string) => {
  socket.emit('sendMessage', {
    text,
    conversation_id: conversationId,
    user: loggedUserInfo.value,
    created_at: new Date(),
  });
};

const handleSendMessage = async (e: Event) => {
  sendMessage((e.target as HTMLInputElement).value);
  handleTyping();
  inputValue.value = '';
};

const handleGoToBottom = () => {
  const container = scrollRef.value;
  setTimeout(() => {
    container?.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth',
    });
  }, 100);
};

const handleTyping = (isTyping: boolean = false) => {
  socket.emit('onTypingMessage', {
    userId: loggedUserInfo.value.id,
    conversationId,
    isTyping,
  });
};

const handleTypingMessage = () => {
  if (!inputValue.value?.length) handleTyping();
  else if (inputValue.value?.length == 1) handleTyping(true);
};

watch(
  () => [conversationId, messages?.length, isTyping],
  () => handleGoToBottom()
);

watch(
  () => conversationId,
  () => {
    inputRef?.value?.focus();
  }
);
</script>
<template>
  <div class="rightSide w-[calc(100%-989px)] min-h-[100vh] relative">
    <div class="header pl-4 pr-6 fixed flex items-center justify-between h-[56px] bg-white w-[calc(100%-989px)] border-b border-r border-[#0000001a]">
      <div class="flex items-center gap-2">
        <div class="flex">
          <div v-if="members.length === 1" class="flex items-center gap-2">
            <img :src="members[0]?.avatar || `https://i.pravatar.cc/150?img=${members[0].id}`" class="w-8 h-8 rounded-full" alt="Avatar" />
            <div>
              <p class="text-base font-medium capitalize">
                {{ members[0]?.first_name + ' ' + members[0]?.last_name }}
              </p>
              <div class="text-xs">Active now</div>
            </div>
          </div>
          <div v-else-if="members.length > 1" class="flex items-center gap-[10px]">
            <div class="relative w-[36px] h-[36px]">
              <img
                :src="members[0]?.avatar || `https://i.pravatar.cc/150?img=${members[0]?.id}`"
                class="absolute left-0 bottom-0 w-[24px] h-[24px] rounded-full z-10"
                alt="Avatar"
              />
              <img
                :src="members[1]?.avatar || `https://i.pravatar.cc/150?img=${members[1]?.id}`"
                class="absolute right-0 top-0 w-[24px] h-[24px] rounded-full z-0"
                alt="Avatar"
              />
            </div>
            <div>
              <div class="text-base font-medium capitalize">
                {{ members?.map((x: UserInfo) => x.first_name).join(', ') }}
              </div>
              <div class="text-xs">{{ members?.length + 1 }} members</div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex gap-2">
        <IconWrapper>
          <svg
            viewBox="6 6 24 24"
            fill="#0a7cff"
            width="20"
            height="20"
            class="x19dipnz x1lliihq x1k90msu x2h7rmj x1qfuztq"
            overflow="visible"
            style="--color: var(--primary-icon)"
          >
            <path
              d="M25.753 28.2c1.07-.357 1.816-1.275 2.423-2.225a2.05 2.05 0 0 0 .037-2.151 4.998 4.998 0 0 0-.723-.963 11.594 11.594 0 0 0-2.888-2.112c-.58-.299-1.272-.212-1.808.159l-2.098 1.452a.472.472 0 0 1-.437.055 11.557 11.557 0 0 1-4.045-2.63 11.554 11.554 0 0 1-2.63-4.044.472.472 0 0 1 .056-.437l1.453-2.098c.37-.536.457-1.228.158-1.807A11.587 11.587 0 0 0 13.14 8.51a4.995 4.995 0 0 0-.963-.723 2.05 2.05 0 0 0-2.15.037c-.951.607-1.87 1.353-2.225 2.424-1.174 3.527 1.187 8.461 5.338 12.613 4.152 4.151 9.086 6.512 12.614 5.338z"
            ></path>
          </svg>
        </IconWrapper>

        <IconWrapper>
          <svg
            viewBox="6 6 24 24"
            fill="#0a7cff"
            width="20"
            height="20"
            class="x19dipnz x1lliihq x1k90msu x2h7rmj x1qfuztq"
            overflow="visible"
            style="--color: var(--primary-icon)"
          >
            <path
              d="M9 9.5a4 4 0 0 0-4 4v9a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4v-9a4 4 0 0 0-4-4H9zM25.829 21.532l3.723 1.861A1 1 0 0 0 31 22.5V13.5a1 1 0 0 0-1.448-.894l-3.723 1.861A1.5 1.5 0 0 0 25 15.81v4.38a1.5 1.5 0 0 0 .829 1.342z"
            ></path>
          </svg>
        </IconWrapper>

        <IconWrapper>
          <svg fill="#0a7cff" height="28px" role="presentation" viewBox="0 0 36 36" width="28px">
            <path
              d="M12.5 18C12.5 19.2426 11.4926 20.25 10.25 20.25C9.00736 20.25 8 19.2426 8 18C8 16.7574 9.00736 15.75 10.25 15.75C11.4926 15.75 12.5 16.7574 12.5 18Z"
              fill="#0a7cff"
            ></path>
            <path
              d="M20.25 18C20.25 19.2426 19.2426 20.25 18 20.25C16.7574 20.25 15.75 19.2426 15.75 18C15.75 16.7574 16.7574 15.75 18 15.75C19.2426 15.75 20.25 16.7574 20.25 18Z"
              fill="#0a7cff"
            ></path>
            <path
              d="M25.75 20.25C26.9926 20.25 28 19.2426 28 18C28 16.7574 26.9926 15.75 25.75 15.75C24.5074 15.75 23.5 16.7574 23.5 18C23.5 19.2426 24.5074 20.25 25.75 20.25Z"
              fill="#0a7cff"
            ></path>
          </svg>
        </IconWrapper>
      </div>
    </div>

    <div ref="scrollRef" class="chat-box px-2 mt-[56px] h-[calc(100vh-120px)] overflow-y-auto border-r border-[#0000001a]">
      <Messages :conversationId="conversationId" :messages="messages" :isGroupChat="members.length > 1" />

      <div class="flex gap-2 mt-2 items-center">
        <img
          v-if="isTyping"
          :src="`https://i.pravatar.cc/150?img=${
            members?.find((x: UserInfo) => x.id == userTypingId)?.id
          }`"
          class="w-7 h-7 rounded-full"
          alt="Avatar"
        />
        <TypingAnimation v-if="isTyping" :hasBackground="true" />
      </div>
    </div>

    <div class="flex items-center absolute left-0 bottom-0 bg-white h-[60px] w-full p-3 overflow-hidden">
      <div class="flex gap-2 items-center">
        <IconWrapper :isHideBg="true">
          <svg
            class="x1lliihq x1rdy4ex xcud41i x4vbgl9 x139jcc6 x1k90msu x11xpdln x1qfuztq xsrhx6k x7p49u4"
            height="28px"
            viewBox="0 0 36 36"
            width="28px"
          >
            <path
              clip-rule="evenodd"
              d="M18 29c6.075 0 11-4.925 11-11S24.075 7 18 7 7 11.925 7 18s4.925 11 11 11zm-1-16a1 1 0 112 0v3.75c0 .138.112.25.25.25H23a1 1 0 110 2h-3.75a.25.25 0 00-.25.25V23a1 1 0 11-2 0v-3.75a.25.25 0 00-.25-.25H13a1 1 0 110-2h3.75a.25.25 0 00.25-.25V13z"
              fill="#0a7cff"
              fill-rule="evenodd"
            ></path>
          </svg>
        </IconWrapper>
        <IconWrapper :isHideBg="true">
          <svg class="x1lliihq x1rdy4ex xcud41i x4vbgl9 x139jcc6 xsrhx6k" height="28px" viewBox="0 0 36 36" width="28px">
            <path d="M13.5 16.5a2 2 0 100-4 2 2 0 000 4z" fill="#0a7cff"></path>
            <path
              clip-rule="evenodd"
              d="M7 12v12a4 4 0 004 4h14a4 4 0 004-4V12a4 4 0 00-4-4H11a4 4 0 00-4 4zm18-1.5H11A1.5 1.5 0 009.5 12v9.546a.25.25 0 00.375.217L15 18.803a6 6 0 016 0l5.125 2.96a.25.25 0 00.375-.217V12a1.5 1.5 0 00-1.5-1.5z"
              fill="#0a7cff"
              fill-rule="evenodd"
            ></path>
          </svg>
        </IconWrapper>
        <IconWrapper :isHideBg="true">
          <svg class="x1lliihq x1rdy4ex xcud41i x4vbgl9 x139jcc6 xsrhx6k" height="28px" viewBox="0 0 36 36" width="28px">
            <path d="M8 12a4 4 0 014-4h12a4 4 0 014 4v5a1 1 0 01-1 1h-3a6 6 0 00-6 6v3a1 1 0 01-1 1h-5a4 4 0 01-4-4V12z" fill="#0a7cff"></path>
            <path d="M20 27c0 .89 1.077 1.33 1.707.7l5.993-5.993c.63-.63.19-1.707-.7-1.707h-3a4 4 0 00-4 4v3z" fill="#0a7cff"></path>
          </svg>
        </IconWrapper>
        <IconWrapper :isHideBg="true">
          <svg class="x1lliihq x1rdy4ex xcud41i x4vbgl9 x139jcc6 xsrhx6k" height="28px" viewBox="0 0 36 36" width="28px">
            <path
              clip-rule="evenodd"
              d="M6 11a4 4 0 014-4h8c1.067 0 2.035.417 2.753 1.098.517.491 1.151.902 1.866.902H26a4 4 0 014 4v12a4 4 0 01-4 4h-8a3.986 3.986 0 01-2.752-1.098c-.518-.491-1.152-.902-1.866-.902H10a4 4 0 01-4-4V11zm7.865 4.908a1.948 1.948 0 00-1.321-.456c-.461.02-.918.214-1.295.576-.378.363-.65.873-.754 1.457a2.927 2.927 0 00.209 1.708c.236.52.611.915 1.046 1.14a1.87 1.87 0 001.36.152c.454-.122.88-.419 1.195-.868.098-.14.183-.291.253-.451.068-.154-.052-.316-.22-.316H12.85a.85.85 0 010-1.7h2.8c.47 0 .85.38.85.85a4.53 4.53 0 01-.803 2.593c-.527.75-1.277 1.3-2.144 1.534a3.57 3.57 0 01-2.586-.285c-.8-.414-1.43-1.107-1.811-1.947a4.628 4.628 0 01-.335-2.706 4.357 4.357 0 011.25-2.388 3.697 3.697 0 012.398-1.048 3.647 3.647 0 012.472.838.85.85 0 01-1.076 1.317zM22.7 19.6a.25.25 0 01.25-.25h2.75a.85.85 0 000-1.7h-2.75a.25.25 0 01-.25-.25v-1.45a.25.25 0 01.25-.25h3.2a.85.85 0 100-1.7h-4.3a.85.85 0 00-.85.85v6.3a.85.85 0 001.7 0V19.6zm-3.35-4.75a.85.85 0 00-1.7 0v6.3a.85.85 0 001.7 0v-6.3z"
              fill="#0a7cff"
              fill-rule="evenodd"
            ></path>
          </svg>
        </IconWrapper>
      </div>

      <div class="relative mx-3 w-full rounded-xl overflow-hidden">
        <input
          ref="inputRef"
          autofocus
          v-model="inputValue"
          type="text"
          class="w-full py-2 px-4 h-[36px] focus:outline-none bg-[#868e991a]"
          placeholder="Aa"
          @keyup.enter="handleSendMessage"
          @input="handleTypingMessage"
        />

        <div class="absolute right-0 top-0 z-10">
          <IconWrapper :isHideBg="true">
            <svg height="28px" viewBox="0 0 36 36" width="28px">
              <path
                clip-rule="evenodd"
                d="M18 29c6.075 0 11-4.925 11-11S24.075 7 18 7 7 11.925 7 18s4.925 11 11 11zm-5.25-13c0-1.25.563-2 1.5-2 .938 0 1.5.75 1.5 2s-.563 2-1.5 2c-.938 0-1.5-.75-1.5-2zm7.5 0c0-1.25.563-2 1.5-2 .938 0 1.5.75 1.5 2s-.563 2-1.5 2c-.938 0-1.5-.75-1.5-2zm-7.52 5.464a1 1 0 011.41-.12 5.963 5.963 0 003.856 1.406c1.47 0 2.813-.528 3.856-1.406a1 1 0 111.288 1.53 7.962 7.962 0 01-5.144 1.876 7.962 7.962 0 01-5.144-1.877 1 1 0 01-.121-1.409z"
                fill="#0a7cff"
                fill-rule="evenodd"
              ></path>
            </svg>
          </IconWrapper>
        </div>
      </div>

      <IconWrapper :isHideBg="true">
        <svg aria-hidden="true" class="xsrhx6k" height="20" viewBox="0 0 22 23" width="20">
          <path
            d="M10.987 0c1.104 0 3.67.726 3.67 5.149 0 1.232-.123 2.001-.209 2.534a16.11 16.11 0 00-.048.314l-.001.005a.36.36 0 00.362.406c4.399 0 6.748 1.164 6.748 2.353 0 .533-.2 1.02-.527 1.395a.11.11 0 00.023.163 2.13 2.13 0 01.992 1.79c0 .86-.477 1.598-1.215 1.943a.11.11 0 00-.046.157c.207.328.329.713.329 1.128 0 .946-.547 1.741-1.406 2.029a.109.109 0 00-.068.137c.061.184.098.38.098.584 0 1.056-1.776 1.913-5.95 1.913-3.05 0-5.154-.545-5.963-.936-.595-.288-1.276-.81-1.276-2.34v-6.086c0-1.72.958-2.87 1.911-4.014C9.357 7.49 10.3 6.36 10.3 4.681c0-1.34-.091-2.19-.159-2.817-.039-.368-.07-.66-.07-.928 0-.527.385-.934.917-.936zM3.5 11h-2C.5 11 0 13.686 0 17s.5 6 1.5 6h2a1 1 0 001-1V12a1 1 0 00-1-1z"
            fill="#0a7cff"
          ></path>
        </svg>
      </IconWrapper>
    </div>
  </div>
</template>

<style></style>
