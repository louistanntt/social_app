import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import configInstance from '../config/environment';

declare module 'axios' {
  export interface AxiosRequestConfig {
    token?: string;
    isFormData?: boolean;
  }
}

const instance = axios.create({
  baseURL: configInstance.API_URL,
  timeout: 30000,
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {

    config.params = config.params || {};
   
    config.headers!["Content-Type"] = "application/json";
  
    if (config.token) {
      config.headers!['Authorization'] = `Bearer ${configInstance.accessToken}`;
    }
  
    if (config.isFormData) {
      config.headers!["Content-Type"] = "multipart/form-data";
    }
  
    return config;
  }, (error) => {
    // Do something with request error
    return Promise.reject(error);
  });
  
  
  instance.interceptors.response.use((response: AxiosResponse<any>) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, (error: AxiosError) => {
    const status = error.response?.status;
      switch (status) {
        // authentication (token related issues)
        case 401: {
          // return Promise.reject(new APIError(err.message, 409));
        }
  
        // forbidden (permission related issues)
        case 403: {
          // return Promise.reject(new APIError(err.message, 409));
        }
  
        // bad request
        case 400: {
          // return Promise.reject(new APIError(err.message, 400));
        }
  
        // not found
        case 404: {
          // return Promise.reject(new APIError(err.message, 404));
        }
  
        // conflict
        case 409: {
          // return Promise.reject(new APIError(err.message, 409));
        }
  
        // unprocessable
        case 422: {
          // return Promise.reject(new APIError(err.message, 422));
        }
  
        // generic api error (server related) unexpected
        default: {
          // return Promise.reject(new APIError(err.message, 500));
        }
      }
    return Promise.reject(error);
  });
  
  
  export default instance