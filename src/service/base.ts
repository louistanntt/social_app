import axios, { Axios, AxiosRequestHeaders, AxiosRequestConfig } from 'axios';
import configInstance from '../config/environment' 

export default class BaseService {

  private API_TOKEN: string | null | undefined;
  private readonly API_URL: string | undefined; 
  private client: Axios | null | undefined;

  constructor() {
    this.API_TOKEN = null;
    this.client = null;
    this.API_URL = configInstance.API_URL;
  }

  service() {
    this.API_TOKEN = configInstance.accessToken;

    let headers: AxiosRequestHeaders = {
      Accept: "application/json",
    };

    if (this.API_TOKEN) {
      headers.Authorization = `Bearer ${this.API_TOKEN}`;
      headers['Content-Type'] = 'application/json'
    };

    this.client = axios.create({
      baseURL: this.API_URL,
      timeout: 31000,
      headers: headers,
    });

    return this.client
  };

  test(){
    return this.service().interceptors.request.use()
  }

  doGetRequest(url: string, config: AxiosRequestConfig){
    return this.service().get(`/${url}`, config)
  }

  doPutRequest(url: string, config: AxiosRequestConfig){
    return this.service().put(`/${url}`, config)
  }

  doPostRequest(url: string, config: AxiosRequestConfig){
    return this.service().post(`/${url}`, config)
  }

  doPatchRequest(url: string, config: AxiosRequestConfig){
    return this.service().patch(`/${url}`, config)
  }
}