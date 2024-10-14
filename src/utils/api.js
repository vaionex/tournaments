import axios from "axios";

export const api = axios.create({
  baseURL: "/api/",
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.data?.error) throw new Error(err.response.data.error);
    throw err;
  },
);
