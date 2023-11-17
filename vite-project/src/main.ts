import { VueQueryPlugin } from "@tanstack/vue-query";
import Antd from "ant-design-vue";
import { createApp } from "vue";
import App from "./App.vue";
import { loggedUserInfo } from "./globalState";
import router from "./router";
import "./style.css";

const app = createApp(App);
app.provide("loggedUserInfo", loggedUserInfo);
app.use(Antd);
app.use(router);
app.use(VueQueryPlugin);
app.mount("#app");
