import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

export default class Axios {
  private axios: AxiosInstance;

  constructor(config ?: AxiosRequestConfig) {
    this.axios = axios.create(config);
  }

  public post(url: string, data: any, config ?: any): Promise<any> {
    return this.axios.post(url, data, config);
  }
}
