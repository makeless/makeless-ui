import FormInterface from '../form';
import ResponseInterface from '../../http/response';

export default class Form implements FormInterface {
  private error: boolean = false;
  private disabled: boolean = false;
  private response: ResponseInterface | null = null;

  public setError(error: boolean): void {
    this.error = error;
  }

  public hasError(): boolean {
    return this.error;
  }

  public setDisabled(disabled: boolean): void {
    this.disabled = disabled;
  }

  public isDisabled(): boolean {
    return this.disabled;
  }

  public setResponse(response: ResponseInterface | null): void {
    this.response = response;
  }

  public getResponse(): ResponseInterface | null {
    return this.response;
  }
}
