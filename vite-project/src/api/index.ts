import axios from "axios";
import { useCookies } from "vue3-cookies";

const apiUrl = process.env.NODE_ENV === 'production' ? process.env.VITE_API_URL_PROD : process.env.VITE_API_URL_LOCAL;
export const get = (url: string, withToken = false) => {
  const { cookies } = useCookies();
  return axios.get(`${apiUrl}${url}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: withToken ? `Bearer ${cookies.get("access_token")}` : "",
    },
  });
};

export const post = (url: string, values: {}) => {
  const { cookies } = useCookies();
  return axios.post(`${apiUrl}${url}`, values, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.get("access_token")}`,
    },
  });
};
