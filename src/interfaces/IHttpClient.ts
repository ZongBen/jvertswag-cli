export interface IHttpClient {
  get(url: string, headers?: Record<string, string>): Promise<any>
  post(url: string, data: any, headers?: Record<string, string>): Promise<any>
  put(url: string, data: any, headers?: Record<string, string>): Promise<any>
  delete(url: string, data?: any, headers?: Record<string, string>): Promise<any>
  patch(url: string, data: any, headers?: Record<string, string>): Promise<any>
}
