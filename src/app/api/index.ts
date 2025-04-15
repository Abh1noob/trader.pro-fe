import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_BASEURL;
const SERVERURL = process.env.NEXT_PUBLIC_SERVERURL;

const api = axios.create({
  baseURL: BASE,
  withCredentials: true,
});

const local = axios.create({
  baseURL: SERVERURL,
  withCredentials: true,
});

export { api, local };
