<script setup lang="ts">
import IconWrapper from "./IconWrapper.vue";
</script>
<template>
  <div class="w-[380px] pt-4 px-2">
    <div class="flex flex-col items-center gap-[6px]">
      <img
        class="w-[72px] h-[72px] rounded-full"
        :src="`https://i.pravatar.cc/150?img=${1}`"
        alt="avatar"
      />
      <span class="capitalize text-[17px] font-[500] leading-[20px]"
        >Trung Nguyen</span
      >
      <p
        class="capitalize text-[13px] font-[300] leading-[16px] text-[#65676b]"
      >
        Hoạt động 17 phút trước
      </p>
    </div>

    <div class="mt-[26px] flex justify-center gap-4">
      <div class="flex flex-col items-center gap-1">
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
              d="M18 7c6.075 0 11 4.925 11 11 0 5.49-4.023 10.041-9.281 10.866V21.18h2.563L22.77 18h-3.051v-2.063c0-.87.426-1.718 1.792-1.718h1.387v-2.707s-1.258-.215-2.462-.215c-2.512 0-4.155 1.523-4.155 4.28V18h-2.793v3.18h2.793v7.686C11.023 28.041 7 23.49 7 18c0-6.075 4.925-11 11-11z"
            ></path>
          </svg>
        </IconWrapper>
        <span class="text-center text-[13px] font-[300] leading-[16px]"
          >Trang cá <br />
          nhân</span
        >
      </div>

      <div class="flex flex-col items-center gap-1">
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
              d="M18 7a6.569 6.569 0 0 1 6.467 5.414l1.367 7.658a3 3 0 0 0 .832 1.594l.92.92a1.414 1.414 0 0 1-1 2.414H9.414a1.414 1.414 0 0 1-1-2.414l.92-.92a3 3 0 0 0 .832-1.594l1.367-7.658A6.569 6.569 0 0 1 18 7zM15.5 27c-.276 0-.504.226-.459.498a3 3 0 0 0 5.918 0c.045-.273-.183-.498-.459-.498h-5z"
            ></path>
          </svg>
        </IconWrapper>
        <span class="text-center text-[13px] font-[300] leading-[16px]"
          >Tắt thông <br />báo</span
        >
      </div>

      <div class="flex flex-col items-center gap-1">
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
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M23.522 21.662c-.389-.344-.443-.925-.181-1.373a8.5 8.5 0 1 0-3.051 3.051c.447-.261 1.028-.207 1.372.182l3.608 4.073a1.647 1.647 0 1 0 2.325-2.326l-4.073-3.607zm-3.28-9.905a6 6 0 1 1-8.484 8.486 6 6 0 0 1 8.485-8.486z"
            ></path>
          </svg>
        </IconWrapper>
        <span class="text-[13px] font-[300] leading-[16px]">Tìm kiếm</span>
      </div>
    </div>

    <div class="mt-5 h-[44px]">
      <IconWrapper
        :isHideBg="true"
        :width="'full'"
        :height="'full'"
        :rounded="'rounded-lg'"
      >
        <div class="px-2 flex gap-2 items-center h-[38px] justify-between w-full">
          <div>Thông tin về đoạn chat</div>
          <svg
            viewBox="0 0 36 36"
            width="28"
            height="28"
            fill="currentColor"
            class="x19dipnz x1lliihq x1k90msu x2h7rmj x1qfuztq"
            style="--color: var(--primary-icon)"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.116 27.134a1.25 1.25 0 0 1 0-1.768l7.19-7.19a.25.25 0 0 0 0-.353l-7.19-7.19a1.25 1.25 0 0 1 1.768-1.767l8.25 8.25a1.25 1.25 0 0 1 0 1.768l-8.25 8.25a1.25 1.25 0 0 1-1.768 0z"
            ></path>
          </svg>
        </div>
      </IconWrapper>
    </div>

    <div class="h-[44px]">
      <IconWrapper
        :isHideBg="true"
        :width="'full'"
        :height="'full'"
        :rounded="'rounded-lg'"
      >
        <div class="px-2 flex gap-2 items-center h-[38px] justify-between w-full">
          <div>Tùy chỉnh đoạn chat</div>
          <svg
            viewBox="0 0 36 36"
            width="28"
            height="28"
            fill="currentColor"
            class="x19dipnz x1lliihq x1k90msu x2h7rmj x1qfuztq"
            style="--color: var(--primary-icon)"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.116 27.134a1.25 1.25 0 0 1 0-1.768l7.19-7.19a.25.25 0 0 0 0-.353l-7.19-7.19a1.25 1.25 0 0 1 1.768-1.767l8.25 8.25a1.25 1.25 0 0 1 0 1.768l-8.25 8.25a1.25 1.25 0 0 1-1.768 0z"
            ></path>
          </svg>
        </div>
      </IconWrapper>
    </div>

    <div class="h-[44px]">
      <IconWrapper
        :isHideBg="true"
        :width="'full'"
        :height="'full'"
        :rounded="'rounded-lg'"
      >
        <div class="px-2 flex gap-2 items-center h-[38px] justify-between w-full">
          <div>File phương tiện, file và liên kết</div>
          <svg
            viewBox="0 0 36 36"
            width="28"
            height="28"
            fill="currentColor"
            title="Biểu tượng Chevron hướng sang phải"
            class="x19dipnz x1lliihq x1k90msu x2h7rmj x1qfuztq"
            style="--color: var(--primary-icon)"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.116 27.134a1.25 1.25 0 0 1 0-1.768l7.19-7.19a.25.25 0 0 0 0-.353l-7.19-7.19a1.25 1.25 0 0 1 1.768-1.767l8.25 8.25a1.25 1.25 0 0 1 0 1.768l-8.25 8.25a1.25 1.25 0 0 1-1.768 0z"
            ></path>
          </svg>
        </div>
      </IconWrapper>
    </div>

    <div class="h-[44px]">
      <IconWrapper
        :isHideBg="true"
        :width="'full'"
        :height="'full'"
        :rounded="'rounded-lg'"
      >
        <div class="px-2 flex gap-2 items-center h-[38px] justify-between w-full">
          <div>Quyền riêng tư & hỗ trợ</div>
          <svg
            viewBox="0 0 36 36"
            width="28"
            height="28"
            fill="currentColor"
            title="Biểu tượng Chevron hướng sang phải"
            class="x19dipnz x1lliihq x1k90msu x2h7rmj x1qfuztq"
            style="--color: var(--primary-icon)"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.116 27.134a1.25 1.25 0 0 1 0-1.768l7.19-7.19a.25.25 0 0 0 0-.353l-7.19-7.19a1.25 1.25 0 0 1 1.768-1.767l8.25 8.25a1.25 1.25 0 0 1 0 1.768l-8.25 8.25a1.25 1.25 0 0 1-1.768 0z"
            ></path>
          </svg>
        </div>
      </IconWrapper>
    </div>
  </div>
</template>
