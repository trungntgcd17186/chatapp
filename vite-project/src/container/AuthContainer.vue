<script setup lang="ts">
import Header from "../components/Auth/Header.vue";
</script>
<template>
  <Header />
  <div
    class="mx-auto max-w-[1995px] px-[168px] flex items-center justify-between"
  >
    <div>
      <h1 class="text-color">
        Hang out <br />
        anytime, anywhere
      </h1>
      <div class="mt-5 text-[#595959] font-[400] text-[17px] max-w-[440px]">
        Messenger makes it easy and fun to stay close to your favourite people.
      </div>
    </div>
  </div>
</template>
<style scoped>
* {
  font-family: Calibre, Helvetica Neue, Segoe UI, Helvetica, Arial,
    Lucida Grande, sans-serif;
}

.text-color {
  max-width: 300px;
  font-size: 74px;
  letter-spacing: -4px;
  line-height: 85px;
  margin-bottom: 0;
  text-align: left;
  background: linear-gradient(
    81.84deg,
    #0099ff -8%,
    #a033ff 40%,
    #ff5280 84%,
    #ff7061 96%
  );
  -webkit-background-clip: text;
  color: transparent;
  display: inline-block;
  font-weight: 450;
  word-break: break-word;
}
</style>
