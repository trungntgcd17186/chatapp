<script setup lang="ts">
import { ref } from "vue";
import { useCookies } from "vue3-cookies";
import { post } from "../api";
import router from "../router";

const { cookies } = useCookies();
const form = ref<HTMLFormElement | null>(null);

const handleSubmitRegister = async () => {
  if (form.value) {
    const values = Object.fromEntries(new FormData(form.value).entries());
    const res = await post("/auth/create-user", values);

    if (res?.data?.access_token) {
      cookies.set("access_token", res.data.access_token, 604800);
      router.push("/");
    }
  }
};
</script>

<template>
  <div class="register-form">
    <h2>Register</h2>
    <form
      @submit.prevent="handleSubmitRegister"
      class="flex flex-col"
      ref="form"
    >
      <label for="username">Username</label>
      <input type="text" id="username" name="username" required />
      <label for="password">Password</label>
      <input type="password" id="password" name="password" required />
      <label for="email">Email</label>
      <input type="email" id="email" name="email" required />
      <label for="first_name">First name</label>
      <input type="text" id="first_name" name="first_name" required />
      <label for="last_name">Last name</label>
      <input type="text" id="last_name" name="last_name" required />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<style scoped>
.register-form {
  /* Thêm các styles của bạn vào đây */
}
</style>
