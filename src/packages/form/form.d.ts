import ResponseInterface from '../http/response';

export default interface Form {
  setError(error: boolean): void

  hasError(): boolean

  setDisabled(disabled: boolean): void

  isDisabled(): boolean

  setResponse(response: ResponseInterface| null): void

  getResponse(): ResponseInterface | null
}
