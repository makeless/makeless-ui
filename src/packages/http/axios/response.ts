import {AxiosResponse} from 'axios';

export default class Response {
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
