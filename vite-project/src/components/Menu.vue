<script setup lang="ts">
import { Input } from "ant-design-vue";
import { ref } from "vue";
import { post } from "../api";
import router from "../router";
import { loggedUserInfo } from "../globalState";
import { useQueryClient } from "@tanstack/vue-query";

const open = ref<boolean>(false);
const email = ref<string>("");

const queryClient = useQueryClient();

const handleAdd = async () => {
  await post("/chat/create-conversation", { emails: [email.value] });
  open.value = false;
  queryClient.invalidateQueries({ queryKey: ["listConversation"] });
};
</script>
<template>
  <a-dropdown class="cursor-pointer">
    <img
      :src="`https://i.pravatar.cc/150?img=${loggedUserInfo?.id}`"
      class="w-8 h-8 rounded-full"
      alt="Avatar"
    />
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <a href="javascript:;" @click="open = true">Add friend to chat</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;" @click="router.push('/logout')">Logout</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>

  <div>
    <a-modal v-model:open="open" title="Add friend to chat" @ok="handleAdd">
      <Input v-model:value="email" placeholder="Enter email" />
      <template #footer>
        <a-button key="back" @click="open = false">Cancel</a-button>
        <a-button
          class="bg-[#1677ff]"
          key="submit"
          type="primary"
          @click="handleAdd"
          >Add</a-button
        >
      </template>
    </a-modal>
  </div>
</template>
<style scoped></style>
