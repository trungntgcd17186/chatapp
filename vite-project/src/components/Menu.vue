<script setup lang="ts">
import { loggedUserInfo } from '../globalState';
import router from '../router';
</script>
<template>
  <a-dropdown class="cursor-pointer">
    <img :src="`https://i.pravatar.cc/150?img=${loggedUserInfo?.id}`" class="w-8 h-8 rounded-full" alt="Avatar" />
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <a href="javascript:;" @click="router.push('/logout')">Logout</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<style scoped></style>
