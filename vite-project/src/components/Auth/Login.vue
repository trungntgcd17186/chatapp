<script setup lang="ts">
import { ref } from "vue";
import { useCookies } from "vue3-cookies";
import { post } from "../../api";
import router from "../../router";
import { useMutation } from "@tanstack/vue-query";
import { Button } from "ant-design-vue";

const form = ref<HTMLFormElement | null>(null);
const { cookies } = useCookies();
const errorMessage = ref("");
const { mutate, isPending } = useMutation({
  mutationFn: (values: {}) => post("/auth/login", values),
  onSuccess: (res) => {
    if (res?.data?.access_token) {
      cookies.set("access_token", res.data.access_token, 604800);
      router.push("/");
    }
  },
  onError(error: any) {
    errorMessage.value = error?.response?.data?.message || error.message;
  },
});

const handleLogin = async () => {
  if (form.value) {
    const values = Object.fromEntries(new FormData(form.value).entries());
    mutate(values);
  }
};
</script>

<template>
  <div>
    <form @submit.prevent="handleLogin" class="flex flex-col" ref="form">
      <input
        class="w-[320px] h-[36px] px-4 py-2 bg-[#0000000a] rounded-[10px] font-[400] text-[16px]"
        placeholder="Email address or username"
        type="text"
        id="username"
        name="username"
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

      <div class="mt-2 text-[#ff4d4f] text-[14px]" v-if="errorMessage">
        {{ errorMessage }}
      </div>

      <div class="mt-[32px] flex items-center gap-5">
        <Button
          :loading="isPending"
          class="btn flex items-center justify-center min-w-[92px] h-[44px] bg-[#0a7cff] rounded-[24px] text-[16px]"
          htmlType="submit"
        >
          <span class="text-white">Log In</span>
        </Button>
        <div class="flex items-center gap-2">
          <div class="text-[13px] font-[300]">No account?</div>
          <div
            class="text-[#0a7cff] text-[13px] underline cursor-pointer"
            @click="router.push('/register')"
          >
            Sign up
          </div>
        </div>
      </div>

      <div class="mt-[36px] flex items-center gap-3">
        <input
          class="ml-2 w-4 h-4"
          type="checkbox"
          id="remember"
          name="remember"
        />
        <label class="text-[#595959] text-[12px] font-[400]" for="remember"
          >Keep me signed in</label
        >
      </div>

      <div class="mt-[28px] flex gap-3">
        <img
          class="w-[132px] h-[44px]"
          src="https://scontent.fdad2-1.fna.fbcdn.net/v/t39.8562-6/119597221_2801552506611915_4465041091818364564_n.svg?_nc_cat=1&ccb=1-7&_nc_sid=f537c7&_nc_ohc=DN0VgFaiTt8AX-W0ImU&_nc_ht=scontent.fdad2-1.fna&oh=00_AfAu1cpjDbrcdWM2H_AJ53HI67LuTcJV1qAMxH5amr666A&oe=65697EB5"
          alt="app store"
        />
        <img
          class="w-[124px] h-[44px]"
          src="https://scontent.fdad2-1.fna.fbcdn.net/v/t39.8562-6/119623783_679418069326044_1960140840932205061_n.png?_nc_cat=1&ccb=1-7&_nc_sid=f537c7&_nc_ohc=UimKa-yM-MUAX_PFd18&_nc_ht=scontent.fdad2-1.fna&oh=00_AfAyx-RETT4c2DIUbUoaDFhti0oNQhc-1u-eOhvaqrobZw&oe=6569EBDD"
          alt="google play"
        />
      </div>
    </form>
  </div>
</template>

<style>
.btn .ant-btn-loading-icon .anticon svg {
  display: flex;
  fill: white;
}
</style>
