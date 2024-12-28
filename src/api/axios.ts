import axios from "axios";

const url = import.meta.env.VITE_SERVER_PATH;

export const axiosDefault = axios.create({
  baseURL: url,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
