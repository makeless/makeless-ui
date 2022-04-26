import {AxiosResponse} from 'axios';
import ResponseInterface from '../response';

export default class Response implements ResponseInterface {
  private readonly code: number;
  private readonly data: any;

  constructor(response: AxiosResponse) {
    this.code = response.status;
    this.data = response.data;
  }

  public getCode(): number {
    return this.code;
  }

  public getData(): any {
    return this.data;
  }
}
