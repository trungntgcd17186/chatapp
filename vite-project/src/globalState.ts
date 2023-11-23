import { computed, reactive } from "vue";

const store = reactive<any>({
  loggedUserInfo: {},
  setNewData(newData: any) {
    this.loggedUserInfo = newData;
  },
});

const setLoggedUserInfo = (newData: any) => {
  store.setNewData(newData);
};

const loggedUserInfo = computed(() => store.loggedUserInfo);

export { loggedUserInfo, setLoggedUserInfo };
