export default interface Http {
  post(url: string, data: any, config ?: any): Promise<any>
}
