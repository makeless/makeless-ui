import {AxiosResponse} from 'axios';

export default class Response {
  private readonly code: number;
  private readonly data: object;

  constructor(response: AxiosResponse) {
    this.code = response.status;
    this.data = response.data;
  }

  public getCode(): number {
    return this.code;
  }

  public getData(): object {
    return this.data;
  }
}
