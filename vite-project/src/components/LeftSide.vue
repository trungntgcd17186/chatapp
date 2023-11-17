<script setup lang="ts">
import { Button } from "ant-design-vue";
import { computed, watchEffect } from "vue";
import { loggedUserInfo } from "../globalState";
import useGetListConversation from "../hooks/useGetListConversation";
import router from "../router";
import { UserInfo } from "../type";
import ItemChat from "./ItemChat.vue";
import Menu from "./Menu.vue";


const activeId = computed(() => router?.currentRoute?.value?.params?.id)
const listConversation = useGetListConversation();

watchEffect(() => {
  if (!activeId?.value && listConversation?.value?.[0]?.id) {
    router.push(`/${listConversation.value[0].id}`);
  }
});
</script>


<template>
  <div class="leftSide w-[364px]">
    <div
      class="header fixed w-[364px] flex items-center gap-2 px-4 py-2 h-[56px] border-r border-gray-300"
    >
      <Menu />
      <div class="relative text-gray-600 focus-within:text-gray-400 flex-1">
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
          placeholder="Search"
          autocomplete="off"
        />
      </div>
    </div>
    <div class="chat-history overflow-y-auto mt-[56px] w-[364px]">
      <ItemChat
        v-for="item in listConversation"
        :key="item.id"
        :conversationId="item.id"
        :lastMessage="item?.last_message"
        :members="item?.members?.filter((x: UserInfo) => x.id != loggedUserInfo.id)"
        v-model:activeId="activeId"
      />
    </div>
  </div>
</template>

<style scoped></style>