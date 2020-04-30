import ResponseInterface from './../../packages/http/response';

export default interface Http {
  /**
   * Perform get request
   * @param url - http endpoint
   * @param config - client configuration
   * @returns Promise<any>
   */
  get(url: string, config ?: any): Promise<any>

  /**
   * Perform post request
   * @param url - http endpoint
   * @param data - data
   * @param config - client configuration
   * @returns Promise<any>
   */
  post(url: string, data: any, config ?: any): Promise<any>

  /**
   * Perform patch request
   * @param url - http endpoint
   * @param data - data
   * @param config - client configuration
   * @returns Promise<any>
   */
  patch(url: string, data: any, config ?: any): Promise<any>

  /**
   * Perform delete request
   * @param url - http endpoint
   * @param config - client configuration
   * @returns Promise<any>
   */
  delete(url: string, config ?: any): Promise<any>

  /**
   * Returns new http response
   * @param data - response
   * @returns ResponseInterface
   */
  response(data: any): ResponseInterface;
}
