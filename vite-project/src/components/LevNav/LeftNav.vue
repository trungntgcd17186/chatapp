<script setup lang="ts">
import Item from "./Item.vue";
import { ListItem } from "../../constant";
import { ref } from "vue";
import { loggedUserInfo } from "../../globalState";
import Menu from "../Menu.vue";
import IconWrapper from "../IconWrapper.vue";
// import SingleChat from "../SingleChat.vue";

const idActive = ref(1);
</script>

<template>
  <div class="flex flex-col justify-between min-w-[248px] pt-3 px-2">
    <div>
      <Item
        v-for="item in ListItem"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :icon="item.icon"
        :isActive="idActive == item.id"
        @click="idActive = item.id"
      />
      <div class="mt-4 ml-[6px] mb-2 text-[15px] font-[600] leading-4">
        Cộng đồng
      </div>

      <div>
        <!-- <SingleChat /> -->
      </div>
    </div>
    <div class="flex items-center justify-between px-[6px] py-3">
      <div class="flex gap-1 items-center">
        <Menu />
        <div class="capitalize">
          {{ loggedUserInfo?.first_name + " " + loggedUserInfo?.last_name }}
        </div>
      </div>

      <IconWrapper>
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
            d="M10 13.25a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1-.75-.75zM10 16.25a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1-.75-.75zM10.75 18.5a.75.75 0 0 0 0 1.5h2a.75.75 0 0 0 0-1.5h-2z"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9 8a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3V11a3 3 0 0 0-3-3H9zm6 3a.5.5 0 0 0-.5-.5H9a.5.5 0 0 0-.5.5v14a.5.5 0 0 0 .5.5h5.5a.5.5 0 0 0 .5-.5V11zm3-.5a.5.5 0 0 0-.5.5v14a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V11a.5.5 0 0 0-.5-.5h-9z"
          ></path>
        </svg>
      </IconWrapper>
    </div>
  </div>
</template>
<style scoped></style>
