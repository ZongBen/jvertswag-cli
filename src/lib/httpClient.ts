import type { IHttpClient } from "../interfaces/IHttpClient";

export class httpClient implements IHttpClient {
  async _sendRequest(method: string, url: string, data?: any, headers?: Record<string, string> | undefined): Promise<any> {
    let options: any = {
      method: method,
    }

    if (data) {
      options.body = JSON.stringify(data)
    }

    if (headers) {
      options.headers = headers
    }

    const res = await fetch(url, options)
    if (!res.ok) {
      throw new Error(res.statusText)
    }

    if (res.headers.get('content-type')?.includes('application/json')) {
      return await res.json()
    }
    else {
      return await res.text()
    }
  }


  async get(url: string, headers?: Record<string, string> | undefined): Promise<any> {
    return await this._sendRequest('GET', url, undefined, headers)
  }
  async post(url: string, data: any, headers?: Record<string, string> | undefined): Promise<any> {
    return await this._sendRequest('POST', url, data, headers)
  }
  async put(url: string, data: any, headers?: Record<string, string> | undefined): Promise<any> {
    return await this._sendRequest('PUT', url, data, headers)
  }
  async delete(url: string, data: any, headers?: Record<string, string> | undefined): Promise<any> {
    return await this._sendRequest('DELETE', url, data, headers)
  }
  async patch(url: string, data: any, headers?: Record<string, string> | undefined): Promise<any> {
    return await this._sendRequest('PATCH', url, data, headers)
  }
}
