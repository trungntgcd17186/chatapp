<script setup lang="ts">
import { Button } from "ant-design-vue";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { loggedUserInfo } from "../globalState";
import useGetListConversation from "../hooks/useGetListConversation";
import router from "../router";
import { UserInfo } from "../type";
import ItemChat from "./ItemChat.vue";
import IconWrapper from "./IconWrapper.vue";
import { io } from "socket.io-client";

const { noti } = defineProps<{
  noti: {
    [key: string]: {
      hasUnreadMessage: boolean;
      lastMessage: string;
      userFirstName: string;
    };
  };
  isTyping: boolean;
  conversationTyping: number | null;
}>();

const route = useRoute();
const activeId = ref(+route.params.id);
const listConversation = useGetListConversation();

watchEffect(() => {
  if (!activeId.value && listConversation?.value?.[0]?.id) {
    router.push(`/${listConversation.value[0].id}`);
  }
});

const handleRemoveUnreadMessage = () => {
  const socket = io("ws://3.106.2.251:9091");

  socket.emit("onRemoveUnreadMessage", {
    conversationId: activeId.value,
    userId: loggedUserInfo.value.id,
  });
};
</script>

<template>
  <div class="leftSide w-[360px] border-x border-[#0000001a]">
    <div
      class="header fixed w-[360px] flex flex-col items-center gap-2 px-4 pt-3 h-[94px] border-gray-300"
    >
      <div class="w-full h-36px flex justify-between items-center">
        <h1 class="ml-3 text-[24px] font-[600]">Chat</h1>

        <div
          class="flex items-center justify-center w-9 h-9 rounded-full bg-[#0000000a] hover:bg-[#0000001a] cursor-pointer"
        >
          <svg
            viewBox="6 6 24 24"
            fill="currentColor"
            width="20"
            height="20"
            class="x19dipnz x1lliihq x1k90msu x2h7rmj x1qfuztq"
            overflow="visible"
            style="--color: var(--primary-icon)"
          >
            <path
              d="M17.305 16.57a1.998 1.998 0 0 0-.347.467l-1.546 2.87a.5.5 0 0 0 .678.677l2.87-1.545c.171-.093.328-.21.466-.347l8.631-8.631a1.5 1.5 0 1 0-2.121-2.122l-8.631 8.632z"
            ></path>
            <path
              d="M18 10.5a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-6a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4v-6a1 1 0 0 0-1-1h-.5a1 1 0 0 0-1 1v6a1.5 1.5 0 0 1-1.5 1.5H12a1.5 1.5 0 0 1-1.5-1.5V12a1.5 1.5 0 0 1 1.5-1.5h6z"
            ></path>
          </svg>
        </div>
      </div>
      <div
        class="w-full relative text-gray-600 focus-within:text-gray-400 flex-1"
      >
        <span class="absolute inset-y-0 left-0 flex items-center pl-4">
          <button type="submit" class="focus:outline-none focus:shadow-outline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M9.99997 2.5C11.3979 2.49994 12.7681 2.89061 13.9559 3.62792C15.1436 4.36523 16.1016 5.41983 16.7218 6.6727C17.342 7.92558 17.5997 9.32686 17.4658 10.7184C17.3319 12.11 16.8117 13.4364 15.964 14.548L20.707 19.293C20.8863 19.473 20.9904 19.7144 20.9982 19.9684C21.006 20.2223 20.9168 20.4697 20.7487 20.6603C20.5807 20.8508 20.3464 20.9703 20.0935 20.9944C19.8406 21.0185 19.588 20.9454 19.387 20.79L19.293 20.707L14.548 15.964C13.601 16.6861 12.4956 17.1723 11.3234 17.3824C10.1512 17.5925 8.9458 17.5204 7.80697 17.1721C6.66814 16.8238 5.62862 16.2094 4.77443 15.3795C3.92023 14.5497 3.27592 13.5285 2.8948 12.4002C2.51368 11.2719 2.40672 10.0691 2.58277 8.89131C2.75881 7.7135 3.2128 6.59454 3.90717 5.62703C4.60153 4.65951 5.51631 3.87126 6.57581 3.32749C7.63532 2.78372 8.80908 2.50006 9.99997 2.5ZM9.99997 4.5C8.54128 4.5 7.14233 5.07946 6.11088 6.11091C5.07943 7.14236 4.49997 8.54131 4.49997 10C4.49997 11.4587 5.07943 12.8576 6.11088 13.8891C7.14233 14.9205 8.54128 15.5 9.99997 15.5C11.4587 15.5 12.8576 14.9205 13.8891 13.8891C14.9205 12.8576 15.5 11.4587 15.5 10C15.5 8.54131 14.9205 7.14236 13.8891 6.11091C12.8576 5.07946 11.4587 4.5 9.99997 4.5Z"
                fill="#707991"
              />
            </svg>
          </button>
        </span>
        <input
          type="search"
          name="q"
          class="rounded-full w-full py-2 text-sm bg-[#f5f5f5] pl-12 focus:outline-none text-[#707991] placeholder-[#707991]"
          placeholder="Tìm kiếm trên Messenger"
          autocomplete="off"
        />
      </div>
    </div>
    <div class="flex flex-col justify-between h-full">
      <div class="chat-history overflow-y-auto mt-[100px] w-[364px] px-2">
        <ItemChat
          v-for="item in listConversation"
          :key="item.id"
          :id="item.id"
          :conversationId="item.id"
          :lastMessage="
            noti?.[item.id]?.lastMessage || item?.messages?.[0]?.text
          "
          :nameUserLastMessage="
            noti?.[item.id]?.userFirstName ||
            item?.messages?.[0]?.user?.first_name
          "
          :members="item?.members?.filter((x: UserInfo) => x.id != loggedUserInfo.id)"
          :isActive="activeId == item.id"
          @click="
            () => {
              router.push(`/${item.id}`);
              activeId = item.id;
            }
          "
          :conversationTyping="conversationTyping"
          :isTyping="isTyping"
          :hasUnreadMessage="noti?.[item.id]?.hasUnreadMessage"
          @update:hasUnreadMessage="() => {
            handleRemoveUnreadMessage()
          }"
        />
      </div>

      <div class="p-2 h-[54px] border-t border-[#0000001a]">
        <IconWrapper
          :isHideBg="true"
          :width="'full'"
          :height="'full'"
          :rounded="'rounded-lg'"
        >
          <div class="flex gap-2 items-center h-[38px]">
            <span class="h-4"
              ><i
                style="
                  background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/AI6HXTO9E4-.png');
                  background-position: 0px -462px;
                  background-size: auto;
                  width: 16px;
                  height: 16px;
                  background-repeat: no-repeat;
                  display: inline-block;
                "
              ></i
            ></span>
            <div>Mở Messenger dành cho máy Mac</div>
          </div>
        </IconWrapper>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
