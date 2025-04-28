import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { errorInterceptor, successInterceptor } from "./interceptor";

const viteEnv: ImportMetaEnv = import.meta.env;

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: viteEnv.VITE_API_ENDPOINT,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

const api: AxiosInstance = axios.create(axiosRequestConfig);

api.defaults.withCredentials = true;

api.interceptors.response.use(successInterceptor, errorInterceptor);

export { api };
