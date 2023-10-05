import axios from "axios";
export default defineNuxtPlugin((nuxtApp) => {
  const token = useCookie("token");
  let api = axios.create({});
  api.defaults.baseURL = "http://127.0.0.1:4000/api/";
  api.defaults.headers.common["Authorization"] = `Bearer ${token.value ?? ""}`;
  api.defaults.headers.post["Content-Type"] = "multipart/form-data";
  return {
    provide: {
      api: api,
    },
  };
});
