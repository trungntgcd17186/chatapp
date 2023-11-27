<script setup lang="ts">
import LogoFooter from "../../assets/images/LogoFooter.png";
</script>
<template>
  <div
    class="h-[92px] px-[100px] fixed bottom-0 left-[50%] translate-x-[-50%] flex items-center mx-auto w-[100%] max-w-[1659px] justify-between"
  >
    <div>
      <span class="font-[600]"> © Meta&nbsp;2023. </span>
      <span class="ml-1 font-[400]"
        >The Apple and Google Play logos are trademarks of their respective
        owners.</span
      >
    </div>

    <div class="flex items-center">
      <div class="flex items-center gap-10">
        <div class="font-[400]">Privacy Policy</div>
        <div class="font-[400]">Cookie Policy</div>
        <div class="font-[400]">Privacy Policy</div>
        <div class="font-[400]">Terms</div>
        <span class="font-[400] text-[#828282]">English (UK)</span>
      </div>
      <img class="ml-4 mb-[2px] w-[150px]" :src="LogoFooter" alt="LogoFooter" />
    </div>
  </div>
</template>
<style scoped>
* {
  font-size: 13px;
}

* div {
  color: #000000;
}
</style>
