import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_BASEURL;
const SERVERURL = process.env.NEXT_PUBLIC_SERVERURL;
const BREEZEBASE = process.env.NEXT_PUBLIC_BREEZEBASE;

const api = axios.create({
  baseURL: BASE,
  withCredentials: true,
});

const local = axios.create({
  baseURL: SERVERURL,
  withCredentials: true,
});

const breeze = axios.create({
  baseURL: BREEZEBASE,
});

export { api, local, breeze };
