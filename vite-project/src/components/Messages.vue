<script setup lang="ts">
import { loggedUserInfo } from '../globalState';
import { optionsEdit } from '../constant/index';
import { io } from 'socket.io-client';
import { socketUrl } from '../api/socket';
import PopupRemoveMessage from './PopupRemoveMessage.vue';
import { ref } from 'vue';

const { conversationId } = defineProps<{
  conversationId: number;
  messages: [
    {
      id: number;
      text: string;
      created_at: Date;
      isRemoved: boolean;
      user: {
        id: number;
        first_name: string;
        last_name: string;
      };
    }
  ];
  isGroupChat: boolean;
}>();

const socket = io(socketUrl);
const open = ref<boolean>(false);
const messageId = ref(0);

const getTime = (timeRaw: Date) => {
  const time = new Date(timeRaw);
  return `${time.getHours()}:${time.getMinutes()}`;
};

const checkTimeDiffOver15Minutes = (message1Date: Date, message2Date: Date) => {
  const timeDiffInMilliseconds = Math.abs(new Date(message2Date).getTime() - new Date(message1Date).getTime());
  const timeDiffInMinutes = timeDiffInMilliseconds / (1000 * 60);
  return timeDiffInMinutes > 15;
};

const handleRemoveMessage = () => {
  socket.emit('removeMessage', { conversationId, loggedUserId: loggedUserInfo.value.id, messageId: messageId.value });
  open.value = false;
};

const showPopupRemoveMessage = (id: number) => {
  messageId.value = id;
  open.value = true;
};
const handleEditMessage = (id: number) => {
  console.log(id);
  // socket.emit('removeMessage', messageId);
};
const handlePinMessage = (id: number) => {
  console.log(id);
  // socket.emit('removeMessage', messageId);
};

const actionEdit: { [idOption: number]: (messageId: number) => void } = {
  1: showPopupRemoveMessage,
  2: handleEditMessage,
  3: handlePinMessage,
};

const handleClickOption = (idOption: number, messageId: number) => {
  actionEdit?.[idOption](messageId);
};

const getTextRemoved = (isUserLogged: boolean, nameUser: string) => {
  if (isUserLogged) return 'Bạn đã thu hồi một tin nhắn';
  return `${nameUser.charAt(0).toUpperCase() + nameUser.slice(1)} đã thu hồi một tin nhắn`;
};
</script>

<template>
  <PopupRemoveMessage :open="open" :onOk="handleRemoveMessage" />
  <div v-for="(item, index) in messages" :key="item.id">
    <div :class="['w-full flex my-[1px]', { 'justify-end': loggedUserInfo?.id == item?.user?.id }]">
      <div
        v-if="isGroupChat && loggedUserInfo?.id != item?.user?.id && messages?.[index - 1]?.user?.id != item?.user?.id"
        class="ml-10 text-xs capitalize"
      >
        {{ item?.user?.first_name + ' ' + item?.user?.last_name }}
      </div>
    </div>

    <div
      v-if="checkTimeDiffOver15Minutes(item.created_at, messages?.[index - 1]?.created_at)"
      class="flex justify-center text-[12px] text-[#65676b] font-[500] leading-[15px]"
    >
      {{ getTime(item?.created_at) }}
    </div>
    <div :class="['messageContainer w-full flex gap-2 items-center', { 'justify-end': loggedUserInfo?.id == item?.user?.id }]">
      <img
        v-if="loggedUserInfo?.id != item?.user?.id && messages?.[index + 1]?.user?.id != item?.user?.id"
        class="w-7 h-7 rounded-full"
        :src="`https://i.pravatar.cc/150?img=${item.user.id}`"
        alt=""
      />
      <div v-else class="w-7 h-7" />

      <div class="relative max-w-[60%] w-[fit-content]">
        <div
          :class="[
            'flex items-center justify-center',
            {
              iconLeft: loggedUserInfo?.id == item?.user?.id,
              iconRight: loggedUserInfo?.id != item?.user?.id,
            },
          ]"
        >
          <svg class="cursor-pointer" height="22px" viewBox="1 1 21 21" width="22px">
            <g class="x148u3ch" fill-rule="evenodd" stroke-width="1">
              <path
                d="M10.8932368,14.7625445 C10.8932368,15.535432 10.0849567,15.996442 9.48116675,15.5677995 L4.03193175,11.696707 C3.49257425,11.313742 3.49287675,10.4694645 4.03193175,10.0864995 L9.48116675,6.2157095 C10.0849567,5.7867645 10.8932368,6.248077 10.8932368,7.020662 L10.8938418,9.0755445 C15.2129368,9.0755445 18.1517243,11.027577 18.1523293,15.7226795 C18.1523293,16.0820495 17.9036743,16.3349395 17.5273643,16.3349395 C17.2487618,16.3349395 17.0164418,16.1746145 16.8527893,15.680027 C16.1588543,13.584307 14.1063918,12.7049395 10.8938418,12.7049395 L10.8932368,14.7625445 Z"
              ></path>
            </g>
          </svg>
          <a-tooltip overlayClassName="tooltipEdit" placement="bottom" color="#fff" trigger="click">
            <template #title>
              <div
                v-for="option in optionsEdit"
                :class="[
                  'cursor-pointer p-2 hover:bg-[#0000001a] rounded-[6px]',
                  {
                    hidden: item.user.id != loggedUserInfo?.id && option.id === 2,
                  },
                ]"
                :key="option.id"
                @click="handleClickOption(option.id, item.id)"
              >
                {{ option.text }}
              </div>
            </template>
            <svg class="cursor-pointer" height="22px" viewBox="0 0 22 22" width="22px">
              <circle cx="11" cy="6" fill="var(--placeholder-icon)" r="2" stroke-width="1px"></circle>
              <circle cx="11" cy="11" fill="var(--placeholder-icon)" r="2" stroke-width="1px"></circle>
              <circle cx="11" cy="16" fill="var(--placeholder-icon)" r="2" stroke-width="1px"></circle>
            </svg>
          </a-tooltip>
        </div>
        <a-tooltip overlayClassName="tooltipMessage" placement="left" color="#1c1e21e6">
          <template #title>
            {{ getTime(item?.created_at) }}
          </template>
          <div
            :class="[
              'message px-3 py-2 bg-[#0a7cff] font-[400] rounded-[18px] break-words leading-[21px]',
              { 'text-white': loggedUserInfo?.id == item?.user?.id },
              {
                'bg-[#f0f0f0] text-[#050505]': loggedUserInfo?.id != item?.user?.id,
              },
            ]"
          >
            {{ item.isRemoved ? getTextRemoved(loggedUserInfo?.id == item?.user?.id, item?.user?.first_name) : item.text }}
          </div>
        </a-tooltip>
      </div>
    </div>
  </div>
</template>

<style>
.messageContainer .iconRight,
.messageContainer .iconLeft {
  display: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.messageContainer .iconLeft {
  left: -54px;
}

.messageContainer .iconRight {
  right: -54px;
}

.messageContainer:hover .iconRight,
.messageContainer:hover .iconLeft {
  display: flex;
}

.tooltipMessage {
  padding: 0;
}
.tooltipMessage .ant-tooltip-content .ant-tooltip-arrow {
  display: none;
}

.tooltipMessage .ant-tooltip-inner {
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 300;
}

.tooltipEdit .ant-tooltip-inner {
  padding: 3px;
  border-radius: 8px;
  min-width: 124px;
}
</style>
