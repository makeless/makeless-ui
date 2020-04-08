import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

export default class Axios {
  private axios: AxiosInstance;

  constructor(config ?: AxiosRequestConfig) {
    this.axios = axios.create(config);
  }
}
