<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { Button } from "ant-design-vue";
import { ref } from "vue";
import { useCookies } from "vue3-cookies";
import { post } from "../../api";
import router from "../../router";

const { cookies } = useCookies();
const form = ref<HTMLFormElement | null>(null);

const { mutate, isPending } = useMutation({
  mutationFn: (values: {}) => post("/auth/create-user", values),
  onSuccess: (res) => {
    if (res?.data?.access_token) {
      cookies.set("access_token", res.data.access_token, 604800);
      router.push("/");
    }
  },
});
const handleSubmitRegister = () => {
  if (form.value) {
    const values = Object.fromEntries(new FormData(form.value).entries());
    mutate(values);
  }
};
</script>

<template>
  <div class="register-form">
    <form
      @submit.prevent="handleSubmitRegister"
      class="flex flex-col"
      ref="form"
    >
      <input
        class="mt-3 w-[320px] h-[36px] px-4 py-2 bg-[#0000000a] rounded-[10px] font-[400] text-[16px]"
        placeholder="Email"
        type="email"
        id="email"
        name="email"
        required
      />
      <input
        class="mt-3 w-[320px] h-[36px] px-4 py-2 bg-[#0000000a] rounded-[10px] font-[400] text-[16px]"
        placeholder="Password"
        type="password"
        id="password"
        name="password"
        required
      />
      <input
        class="mt-3 w-[320px] h-[36px] px-4 py-2 bg-[#0000000a] rounded-[10px] font-[400] text-[16px]"
        placeholder="Confirm password"
        type="password"
        required
      />
      <input
        class="mt-3 w-[320px] h-[36px] px-4 py-2 bg-[#0000000a] rounded-[10px] font-[400] text-[16px]"
        placeholder="First name"
        type="text"
        id="first_name"
        name="first_name"
        required
      />
      <input
        class="mt-3 w-[320px] h-[36px] px-4 py-2 bg-[#0000000a] rounded-[10px] font-[400] text-[16px]"
        placeholder="Last name"
        type="text"
        id="last_name"
        name="last_name"
        required
      />

      <div class="mt-[32px] flex items-center gap-5">
        <Button
          :loading="isPending"
          class="btn flex items-center justify-center min-w-[92px] h-[44px] bg-[#0a7cff] rounded-[24px] text-[16px]"
          htmlType="submit"
        >
          <span class="text-white">Register</span>
        </Button>

        <div class="flex items-center gap-2">
          <div class="text-[13px] font-[300]">Have an account?</div>
          <div
            class="text-[#0a7cff] text-[13px] underline cursor-pointer"
            @click="router.push('/login')"
          >
            Sign in
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.btn .ant-btn-loading-icon .anticon svg {
  display: flex;
  fill: white;
}
</style>
