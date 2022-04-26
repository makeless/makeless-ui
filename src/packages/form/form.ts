import ResponseInterface from '../http/response';

export default interface Form {
  /**
   * Sets form error
   * @param error - error status
   */
  setError(error: boolean): void

  /**
   * Returns form error status
   * @returns boolean
   */
  hasError(): boolean

  /**
   * Sets form disabled
   * @param disabled - disabled status
   */
  setDisabled(disabled: boolean): void

  /**
   * Returns form disabled status
   * @returns boolean
   */
  isDisabled(): boolean

  /**
   * Sets form response
   * @param response - response
   */
  setResponse(response: ResponseInterface | null): void

  /**
   * Returns form response
   * @returns ResponseInterface
   */
  getResponse(): ResponseInterface | null
}
