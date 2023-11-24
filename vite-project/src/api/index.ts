import axios from "axios";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export const get = (url: string, withToken = false) => {
  return axios.get(`https://3.106.2.251:9090${url}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: withToken ? `Bearer ${cookies.get("access_token")}` : "",
    },
  });
};

export const post = (url: string, values: {}) => {
  return axios.post(`https://3.106.2.251:9090${url}`, values, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.get("access_token")}`,
    },
  });
};
