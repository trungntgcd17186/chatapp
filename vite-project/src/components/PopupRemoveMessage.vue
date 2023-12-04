<script setup lang="ts">
import { computed, ref } from 'vue';
import IconWrapper from './IconWrapper.vue';
import { RadioContent } from '../constant/index';

const checked = ref(1);

const { open, onOk = () => {} } = defineProps<{
  onOk: Function;
  open: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
}>();

const openValue = computed({
  get() {
    return open;
  },
  set(value) {
    emit('update:open', value);
  },
});
</script>
<template>
  <div>
    <a-modal width="700px" wrapClassName="popupRemoveMessage" v-model:open="openValue" :closable="false" :footer="null">
      <IconWrapper class="absolute right-4 top-4" @click="openValue = false">
        <svg
          viewBox="0 0 36 36"
          fill="currentColor"
          width="24"
          height="24"
          class="x19dipnz x1lliihq x1k90msu x2h7rmj x1qfuztq"
          style="--color: var(--primary-icon)"
        >
          <path
            d="m12.631 25.138 5.196-5.189a.25.25 0 0 1 .353 0l5.197 5.189a1.241 1.241 0 0 0 1.76 0 1.241 1.241 0 0 0 0-1.761L19.95 18.18a.25.25 0 0 1 0-.354l5.188-5.196a1.241 1.241 0 0 0 0-1.76 1.241 1.241 0 0 0-1.76 0l-5.197 5.188a.25.25 0 0 1-.353 0l-5.196-5.189a1.241 1.241 0 0 0-1.76 0 1.241 1.241 0 0 0 0 1.761l5.188 5.196a.25.25 0 0 1 0 .354l-5.189 5.196a1.241 1.241 0 0 0 0 1.76 1.241 1.241 0 0 0 1.761 0z"
          ></path>
        </svg>
      </IconWrapper>
      <h4 class="mb-[24px] text-center text-[17px] font-[500] leading-[20px]">Bạn muốn gỡ tin nhắn này ở phía ai?</h4>
      <div class="mb-[20px]" v-for="item in RadioContent" :key="item.id">
        <a-radio :checked="checked === item.id" @click="checked = item.id">{{ item.label }}</a-radio>
        <p class="mt-1 ml-[24px] text-[13px] font-[300] leading-[16px] text-[#65676b]">
          {{ item.des }}
        </p>
      </div>
      <div class="mt-[44px] flex gap-2">
        <a-button class="btnCancel w-full hover:bg-[#0000000a] bg-[#0000000a] rounded-[6px]" @click="openValue = false">Hủy</a-button>
        <a-button class="btnRemove w-full bg-[#0a7cff] rounded-[6px]" type="primary" @click="onOk">Xóa, gỡ</a-button>
      </div>
    </a-modal>
  </div>
</template>

<style>
.popupRemoveMessage .ant-modal-content {
  padding: 22px 16px 16px;
}

.popupRemoveMessage .ant-radio-checked .ant-radio-inner {
  background: #1c1e21;
  border-color: transparent;
}

.btnRemove span {
  color: white;
}

.btnCancel {
  border-color: transparent;
}
</style>
