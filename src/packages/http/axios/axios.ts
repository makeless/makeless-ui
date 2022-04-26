import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import ResponseInterface from '../response';
import Response from './../../../packages/http/axios/response';
import HttpInterface from '../http';

export default class Axios implements HttpInterface {
  private axios: AxiosInstance;
  private readonly baseConfig: Object = {
    withCredentials: true,
    headers: {'Content-Type': 'application/json'},
  };

  constructor(config ?: AxiosRequestConfig) {
    this.axios = axios.create(Object.assign(this.baseConfig, config));
  }

  public get(url: string, config ?: any): Promise<any> {
    return this.axios.get(url, config);
  }

  public post(url: string, data: any, config ?: any): Promise<any> {
    return this.axios.post(url, data, config);
  }

  public patch(url: string, data: any, config ?: any): Promise<any> {
    return this.axios.patch(url, data, config);
  }

  public delete(url: string, config ?: any): Promise<any> {
    return this.axios.delete(url, config);
  }

  public response(data: any): ResponseInterface {
    return new Response(data);
  }
}
