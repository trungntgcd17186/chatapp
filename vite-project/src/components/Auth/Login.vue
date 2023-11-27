<script setup lang="ts">
import { ref } from "vue";
import { useCookies } from "vue3-cookies";
import { post } from "../../api";
import router from "../../router";
import Header from "./Header.vue";

const form = ref<HTMLFormElement | null>(null);
const { cookies } = useCookies();

const handleLogin = async () => {
  if (form.value) {
    const values = Object.fromEntries(new FormData(form.value).entries());
    const res = await post("/auth/login", values);

    if (res?.data?.access_token) {
      cookies.set("access_token", res.data.access_token, 604800);
      router.push("/");
    }
  }
};
</script>

<template>
  <Header />
  <div>Login</div>
  <form @submit.prevent="handleLogin" class="flex flex-col" ref="form">
    <label for="username">Username</label>
    <input type="text" id="username" name="username" required />
    <label for="password">Password</label>
    <input type="password" id="password" name="password" required />
    <button type="submit">Login</button>
  </form>
</template>

<style scoped></style>
