import axios, { AxiosRequestConfig } from "axios";

export interface ErrorResponse {
  message: string;
  success: boolean;
}

export interface FetchResponse<T> {
  success: boolean;
  message: boolean;
  data: T;
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BE_URL!,
});

export default class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((response) => response.data);
  };

  post = (data: T, config?: AxiosRequestConfig) => {
    return axiosInstance
      .post(this.endpoint, data, config)
      .then((response) => response.data);
  };

  delete = (config?: AxiosRequestConfig) => {
    return axiosInstance
      .delete(this.endpoint, config)
      .then((response) => response.data);
  };
}
