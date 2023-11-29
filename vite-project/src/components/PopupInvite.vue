<script setup lang="ts">
import { io } from 'socket.io-client';
import { ref } from 'vue';
import { socketUrl } from '../api/socket';
import { loggedUserInfo } from '../globalState';
import { get } from '../api';

const { open = false, onClose = () => {} } = defineProps<{
  open: boolean;
  onClose: any;
}>();

const emails = ref<string[]>([]);
const socket = io(socketUrl);
const handleChange = (value: string[]) => {
  emails.value = value;
};
const listUser = await get('/auth/listUser', true).then((res) => res.data);

const handleAdd = async () => {
  console.log(emails.value);
  socket.emit('onCreateConversation', { loggedUser: loggedUserInfo.value, emails: emails.value });
  onClose();
};
</script>

<template>
  <div>
    <div>
      <a-modal class="popupInvite" :closable="false" :open="open" title="Add friend to chat" @ok="handleAdd">
        <a-select mode="multiple" style="width: 100%" placeholder="Please select or search by email" @change="handleChange">
          <a-select-option v-for="user in listUser" :value="user.email">
            <div class="flex gap-2 items-center py-1">
              <img :src="user?.avatar || `https://i.pravatar.cc/150?img=${user?.id}`" class="w-[32px] h-[32px] rounded-full" alt="Avatar" />
              <div>
                <div class="text-[12px] font-[400] capitalize leading-tight">{{ user.first_name + ' ' + user.last_name }}</div>
                <div class="text-[10px] font-[300] text-[#0000008c] leading-tight">{{ user.email }}</div>
              </div>
            </div>
          </a-select-option>
        </a-select>

        <template #footer>
          <a-button key="back" @click="onClose()">Cancel</a-button>
          <a-button
            :class="[
              'bg-[#1677ff] text-white',
              {
                'btnAdd': emails.length > 0,
              },
            ]"
            key="submit"
            type="primary"
            :disabled="emails.length === 0"
            @click="handleAdd"
            >Add</a-button
          >
        </template>
      </a-modal>
    </div>
  </div>
</template>

<style>
.btnAdd span {
  color: white;
}

.popupInvite .ant-select-selection-item-remove,
.ant-select-item-option-state {
  display: flex !important;
  align-items: center;
}
.popupInvite .ant-select-selection-item {
  height: auto !important;
}
</style>
