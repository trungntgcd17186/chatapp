<script setup lang="ts">
import messengerLogo from "../../assets/messengerLogo.svg";
</script>
<template>
  <div
    class="h-[100px] mx-auto max-w-[1995px] px-[168px] flex items-center justify-between"
  >
    <img class="w-[40px] h-[40px]" :src="messengerLogo" alt="logo" />

    <ul class="nav flex gap-[30px] cursor-pointer">
      <li class="nav-item relative text-[14px] text-[#000000]">Features</li>
      <li class="nav-item relative text-[14px] text-[#000000]">Desktop app</li>
      <li class="nav-item relative text-[14px] text-[#000000]">
        Privacy and safety
      </li>
      <li class="nav-item relative text-[14px] text-[#000000]">
        For developers
      </li>
    </ul>
  </div>
</template>
<style scoped>
* {
  font-family: Calibre, Helvetica Neue, Segoe UI, Helvetica, Arial,
    Lucida Grande, sans-serif;
}
.nav-item:hover::after {
  border-radius: 1.5px;
  bottom: -6px;
  content: "";
  height: 3px;
  left: 0;
  position: absolute;
  width: 100%;
  background-color: #0a7cff;
}
</style>
