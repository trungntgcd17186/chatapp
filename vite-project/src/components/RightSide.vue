<script setup lang="ts">
import io from "socket.io-client";
import { Ref, ref, watch } from "vue";
import { loggedUserInfo } from "../globalState";
import { UserInfo } from "../type";
import TypingAnimation from "../components/TypingAnimation.vue";
import IconWrapper from "./IconWrapper.vue";

const scrollRef: Ref<HTMLElement | null> = ref(null);
const inputValue = ref("");
const inputRef: Ref<HTMLElement | null> = ref(null);
const socket = io("ws://localhost:9091");

const { conversationId, messages, isTyping } = defineProps<{
  conversationId: number;
  members: any;
  messages: any;
  isTyping: boolean;
  userTypingId: number | null;
}>();

const sendMessage = (text: string) => {
  socket.emit("sendMessage", {
    text,
    conversation_id: conversationId,
    user: loggedUserInfo.value,
  });
};

const handleSendMessage = async (e: Event) => {
  sendMessage((e.target as HTMLInputElement).value);
  handleTyping();
  inputValue.value = "";
};

const handleGoToBottom = () => {
  const container = scrollRef.value;
  setTimeout(() => {
    container?.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, 100);
};

const handleTyping = (isTyping: boolean = false) => {
  socket.emit("onTypingMessage", {
    userId: loggedUserInfo.value.id,
    conversationId,
    isTyping,
  });
};

const handleTypingMessage = (e) => {
  if (!inputValue.value?.length) handleTyping();
  else if (inputValue.value?.length == 1) handleTyping(true);
};

watch(
  () => [conversationId, messages.length, isTyping],
  () => handleGoToBottom()
);
</script>
<template>
  <div class="rightSide w-2/3 min-h-[100vh] relative">
    <div
      class="header pl-4 pr-6 fixed flex items-center justify-between h-[56px] bg-white w-[calc(100%-609px)] border-b border-[#0000001a]"
    >
      <div class="flex items-center gap-2">
        <div class="flex">
          <div v-if="members.length === 1" class="flex items-center gap-2">
            <img
              :src="
                members[0]?.avatar ||
                `https://i.pravatar.cc/150?img=${members[0].id}`
              "
              class="w-8 h-8 rounded-full"
              alt="Avatar"
            />
            <div>
              <p class="text-base font-medium capitalize">
                {{ members[0]?.first_name + " " + members[0]?.last_name }}
              </p>
              <div class="text-xs">Active now</div>
            </div>
          </div>
          <div v-else class="flex items-center gap-[10px]">
            <div class="relative w-[36px] h-[36px]">
              <img
                :src="
                  members[0]?.avatar ||
                  `https://i.pravatar.cc/150?img=${members[0]?.id}`
                "
                class="absolute left-0 bottom-0 w-[24px] h-[24px] rounded-full z-10"
                alt="Avatar"
              />
              <img
                :src="
                  members[1]?.avatar ||
                  `https://i.pravatar.cc/150?img=${members[1]?.id}`
                "
                class="absolute right-0 top-0 w-[24px] h-[24px] rounded-full z-0"
                alt="Avatar"
              />
            </div>
            <div>
              <div class="text-base font-medium capitalize">
                {{ members?.map((x: UserInfo) => x.first_name).join(", ") }}
              </div>
              <div class="text-xs">{{ members?.length }} members</div>
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
          <svg
            fill="#0a7cff"
            height="28px"
            role="presentation"
            viewBox="0 0 36 36"
            width="28px"
          >
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

    <div
      ref="scrollRef"
      class="chat-box px-[112px] mt-[56px] h-[calc(100vh-156px)] overflow-y-auto"
    >
      <div v-for="(item, index) in messages">
        <div
          :class="[
            'w-full flex my-1',
            { 'justify-end': loggedUserInfo?.id == item?.user?.id },
          ]"
        >
          <div
            v-if="
              members?.length > 1 &&
              loggedUserInfo?.id != item?.user?.id &&
              messages?.[index - 1]?.user?.id != item?.user?.id
            "
            class="ml-10 text-xs capitalize"
          >
            {{ item?.user?.first_name }}
          </div>
        </div>
        <div
          :class="[
            'w-full flex gap-2 items-center',
            { 'justify-end': loggedUserInfo?.id == item?.user?.id },
          ]"
        >
          <img
            v-if="loggedUserInfo?.id != item?.user?.id"
            class="w-7 h-7 rounded-full"
            :src="`https://i.pravatar.cc/150?img=${item.user.id}`"
            alt=""
          />
          <div
            class="px-3 py-2 bg-[#0a7cff] text-white font-[400] rounded-[12px] max-w-[60%] w-[fit-content] break-words"
          >
            {{ item.text }}
          </div>
        </div>
      </div>

      <div class="flex gap-2 mt-2 items-center">
        <img
          v-if="isTyping"
          :src="`https://i.pravatar.cc/150?img=${
            members?.find((x) => x.id == userTypingId)?.id
          }`"
          class="w-7 h-7 rounded-full"
          alt="Avatar"
        />
        <TypingAnimation v-if="isTyping" :hasBackground="true" />
      </div>
    </div>

    <div
      class="flex w-[calc(100%-250px)] items-center absolute left-[50%] translate-x-[-50%] bottom-6 bg-white h-[56px] px-4 py-2 rounded-[12px] overflow-hidden"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 1.99899C17.524 1.99899 22.002 6.47699 22.002 12.001C22.002 17.524 17.524 22.002 12 22.002C6.476 22.002 1.998 17.524 1.998 12.001C1.998 6.47699 6.476 1.99899 12 1.99899ZM12 3.49899C10.8758 3.4868 9.76036 3.69769 8.71822 4.11946C7.67608 4.54124 6.72793 5.16551 5.92866 5.95616C5.12939 6.74681 4.49487 7.68813 4.06182 8.72563C3.62877 9.76314 3.4058 10.8762 3.4058 12.0005C3.4058 13.1248 3.62877 14.2378 4.06182 15.2754C4.49487 16.3129 5.12939 17.2542 5.92866 18.0448C6.72793 18.8355 7.67608 19.4597 8.71822 19.8815C9.76036 20.3033 10.8758 20.5142 12 20.502C14.232 20.4678 16.361 19.5571 17.9274 17.9665C19.4937 16.376 20.3716 14.2333 20.3716 12.001C20.3716 9.76871 19.4937 7.62597 17.9274 6.03545C16.361 4.44493 14.232 3.53423 12 3.49999V3.49899ZM8.462 14.784C8.88275 15.32 9.41996 15.7532 10.0329 16.0509C10.6459 16.3485 11.3186 16.5028 12 16.502C12.6806 16.5028 13.3524 16.3489 13.9648 16.0519C14.5772 15.755 15.1141 15.3228 15.535 14.788C15.6583 14.6319 15.8386 14.5312 16.0362 14.5081C16.2337 14.4849 16.4324 14.5412 16.5885 14.6645C16.7446 14.7878 16.8453 14.9681 16.8684 15.1657C16.8916 15.3632 16.8353 15.5619 16.712 15.718C16.1507 16.4306 15.435 17.0064 14.6187 17.4021C13.8025 17.7977 12.9071 18.0028 12 18.002C11.0918 18.0027 10.1952 17.797 9.37821 17.4002C8.5612 17.0035 7.84508 16.4262 7.284 15.712C7.1662 15.5553 7.11439 15.3588 7.13968 15.1644C7.16497 14.9701 7.26533 14.7933 7.41929 14.6721C7.57326 14.5508 7.76858 14.4946 7.96346 14.5155C8.15834 14.5364 8.33729 14.6328 8.462 14.784ZM9 8.74999C9.16706 8.74527 9.33337 8.77409 9.4891 8.83476C9.64483 8.89542 9.78681 8.9867 9.90665 9.1032C10.0265 9.21969 10.1217 9.35904 10.1868 9.51298C10.2518 9.66693 10.2854 9.83237 10.2854 9.99949C10.2854 10.1666 10.2518 10.3321 10.1868 10.486C10.1217 10.64 10.0265 10.7793 9.90665 10.8958C9.78681 11.0123 9.64483 11.1036 9.4891 11.1642C9.33337 11.2249 9.16706 11.2537 9 11.249C8.67473 11.2398 8.36587 11.1041 8.13906 10.8708C7.91224 10.6375 7.78535 10.3249 7.78535 9.99949C7.78535 9.67409 7.91224 9.36152 8.13906 9.1282C8.36587 8.89488 8.67473 8.7592 9 8.74999ZM15 8.74999C15.1671 8.74527 15.3334 8.77409 15.4891 8.83476C15.6448 8.89542 15.7868 8.9867 15.9066 9.1032C16.0265 9.21969 16.1217 9.35904 16.1868 9.51298C16.2518 9.66693 16.2854 9.83237 16.2854 9.99949C16.2854 10.1666 16.2518 10.3321 16.1868 10.486C16.1217 10.64 16.0265 10.7793 15.9066 10.8958C15.7868 11.0123 15.6448 11.1036 15.4891 11.1642C15.3334 11.2249 15.1671 11.2537 15 11.249C14.6747 11.2398 14.3659 11.1041 14.1391 10.8708C13.9122 10.6375 13.7854 10.3249 13.7854 9.99949C13.7854 9.67409 13.9122 9.36152 14.1391 9.1282C14.3659 8.89488 14.6747 8.7592 15 8.74999Z"
          fill="#707991"
        />
      </svg>
      <input
        ref="inputRef"
        autofocus
        v-model="inputValue"
        type="text"
        class="w-full py-2 px-4 rounded-t-lg focus:outline-none"
        placeholder="Type your message..."
        @keyup.enter="handleSendMessage"
        @input="handleTypingMessage"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12.815 12.197L5.28299 13.453C5.19639 13.4675 5.11513 13.5045 5.04737 13.5603C4.97961 13.6161 4.92775 13.6888 4.89699 13.771L2.29999 20.728C2.05199 21.368 2.72099 21.978 3.33499 21.671L21.335 12.671C21.4597 12.6088 21.5645 12.513 21.6378 12.3945C21.7111 12.276 21.7499 12.1394 21.7499 12C21.7499 11.8607 21.7111 11.7241 21.6378 11.6055C21.5645 11.487 21.4597 11.3913 21.335 11.329L3.33499 2.32901C2.72099 2.02201 2.05199 2.63301 2.29999 3.27201L4.89799 10.229C4.9286 10.3114 4.98041 10.3843 5.04818 10.4403C5.11594 10.4963 5.19728 10.5335 5.28399 10.548L12.816 11.803C12.8623 11.8111 12.9043 11.8353 12.9346 11.8714C12.9649 11.9074 12.9815 11.9529 12.9815 12C12.9815 12.0471 12.9649 12.0926 12.9346 12.1287C12.9043 12.1647 12.8623 12.1889 12.816 12.197H12.815Z"
          fill="#8BABD8"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped></style>
