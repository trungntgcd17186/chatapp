import { ref } from "vue";

const loggedUserInfo = ref<any>({});

const setLoggedUserInfo = (newData: any) => {
  loggedUserInfo.value = newData;
};

export { loggedUserInfo, setLoggedUserInfo };
