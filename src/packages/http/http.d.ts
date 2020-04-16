import ResponseInterface from '@/packages/http/response';

export default interface Http {
  get(url: string, config ?: any): Promise<any>

  post(url: string, data: any, config ?: any): Promise<any>

  response(data: any): ResponseInterface;
}
