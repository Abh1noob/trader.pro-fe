import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_BASEURL;
const api = axios.create({
  baseURL: BASE,
  withCredentials: true,
});

export default api;
