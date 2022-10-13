import axios, { AxiosError, AxiosRequestConfig } from "axios";

import { getToken } from "../utils/token";
import { getTokenFromLocalStorage } from "../utils/handleToken";

const reqInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const { accessToken } = getTokenFromLocalStorage();
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};

const reqErrorInterceptor = (error: AxiosError) => {
  return Promise.reject(error);
};

interface RespConf extends AxiosRequestConfig {
  sent?: boolean;
}

const resErrorInterceptor = async (
  error: AxiosError,
  reqInterceptorId: number
) => {
  const previousReq: RespConf = error.config;
  if (error.response?.status === 401 && !previousReq?.sent) {
    await getToken();
    axios.interceptors.request.eject(reqInterceptorId);
    axios.interceptors.request.use(reqInterceptor);
    previousReq.sent = true;
    return axios(previousReq);
  }

  return Promise.reject(error);
};

export const jwtInterceptorProvider = () => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  const reqInterceptorId = axios.interceptors.request.use(
    reqInterceptor,
    reqErrorInterceptor
  );
  axios.interceptors.response.use(undefined, (error) =>
    resErrorInterceptor(error, reqInterceptorId)
  );
};
