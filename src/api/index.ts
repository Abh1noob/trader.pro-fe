import axios from "axios";

const BASE = process.env.BASEURL;
const api = axios.create({
  baseURL: BASE,
  withCredentials: true,
});

export default api;
