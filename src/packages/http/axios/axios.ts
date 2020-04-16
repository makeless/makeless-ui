import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import ResponseInterface from '@/packages/http/response';
import Response from '@/packages/http/axios/response';

export default class Axios {
  private axios: AxiosInstance;

  constructor(config ?: AxiosRequestConfig) {
    this.axios = axios.create(config);
  }

  public get(url: string, config ?: any): Promise<any> {
    return this.axios.get(url, config);
  }

  public post(url: string, data: any, config ?: any): Promise<any> {
    return this.axios.post(url, data, config);
  }

  public response(data: any): ResponseInterface {
    return new Response(data);
  }
}
