import axios from "axios";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export const get = (url: string, withToken = false) => {
  return axios.get(`https://nguyenthanhtrung.click/api${url}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: withToken ? `Bearer ${cookies.get("access_token")}` : "",
    },
  });
};

export const post = (url: string, values: {}) => {
  return axios.post(`https://nguyenthanhtrung.click/api${url}`, values, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.get("access_token")}`,
    },
  });
};
