import type { IHttpClient } from "../interfaces/IHttpClient"
import { jsonConverter } from "./jsonConverter"
import { schemaConverter } from "./schemaConverter"
import path from "node:path"

class options {
  gap: number | undefined
  comment: string
  path: string
  root: string
  params: string[] | undefined
  method: string
  header: string[] | undefined
  data: any
  query: string | undefined

  constructor(method: string, path: string, root: string) {
    this.path = path
    this.root = root
    this.method = method
    this.comment = ""
  }
}

enum paramType {
  path = 'path',
  query = 'query',
  header = 'header'
}

export class urlConverter extends schemaConverter {
  private _path
  private _root
  private _params
  private _method
  private _header
  private _data
  private _query
  private _parseHeader: Record<string, string>

  constructor(method: string, root: string, path: string, fn?: (options: options) => void) {
    let opt = new options(method, path, root)
    if (fn) {
      fn(opt)
    }
    super(opt.gap, 0, opt.comment)
    this._path = opt.path
    this._root = opt.root
    this._params = opt.params
    this._method = opt.method
    this._header = opt.header
    this._data = opt.data
    this._query = opt.query
    this._parseHeader = {}
  }

  private _objectBuilder(object: any) {
    const converter = new jsonConverter(opt => {
      opt.offset = this._offset
      opt.gap = this._gap
      opt.comment = this._comment
    })
    this._schema += converter.convert(object)
  }

  private paramBuilder(key: string, type: paramType) {
    this.writeLine(`- name: ${key}`)
    this.addOffset(1)
    this.writeLine(`in: ${type}`)
    this.writeLine(`description: unknown`)
    this.writeLine(`required: true`)
    this.writeLine(`schema:`)
    this.addOffset(1)
    this.writeLine(`type: string`)
    this.addOffset(-2)
  }

  private _urlBuilder() {
    this.writeLine(`${this._path}:`)
    this.addOffset(1)
    this.writeLine(`${this._method.toLowerCase()}:`)
    this.addOffset(1)
    this.writeLine(`description: unknown`)
    this.writeLine('tags:')
    this.addOffset(1)
    this.writeLine('- unknown')
    this.addOffset(-1)
    this.writeLine('parameters:')
    this.addOffset(1)

    let url = path.join(this._root, this._path)

    if (this._params) {
      for (const param of this._params) {
        const [key, value] = param.split('=')
        url = url.replace(`{${key}}`, value)
        this.paramBuilder(key, paramType.path)
      }
    }

    if (this._query) {
      url += '?'
      for (const query of this._query.split('&')) {
        const [key, value] = query.split('=')
        url += `${key}=${value}&`
        this.paramBuilder(key, paramType.query)
      }
      url = url.slice(0, -1)
    }

    if (this._header) {
      for (const header of this._header) {
        const [key, value] = header.split('=')
        this._parseHeader[key] = value
        this.paramBuilder(key, paramType.header)
      }
    }

    this.addOffset(-1)

    return url
  }

  private requestBuilder() {
    this.writeLine(`requestBody:`)
    this.addOffset(1)
    this.writeLine(`content:`)
    this.addOffset(1)
    this.writeLine(`application/json:`)
    this.addOffset(1)
    this.writeLine(`schema:`)
    this.addOffset(1)
    this._objectBuilder(this._data)
    this.addOffset(-4)
  }

  private responseBuilder(res: any) {
    this.writeLine(`responses:`)
    this.addOffset(1)
    this.writeLine(`200:`)
    this.addOffset(1)
    this.writeLine(`description: unknown`)
    this.writeLine(`content:`)
    this.addOffset(1)
    this.writeLine(`application/json:`)
    this.addOffset(1)
    this.writeLine(`schema:`)
    this.addOffset(1)
    this._objectBuilder(res)
  }

  async convert(http: IHttpClient) {
    const url = this._urlBuilder()
    if (this._data) {
      this.requestBuilder()
    }
    let response
    try {
      switch (this._method.toUpperCase()) {
        case "GET":
          response = await http.get(url, this._parseHeader)
          break
        case "POST":
          response = await http.post(url, this._data, this._parseHeader)
          break
        case "PUT":
          response = await http.put(url, this._data, this._parseHeader)
          break
        case "DELETE":
          response = await http.delete(url, this._data, this._parseHeader)
          break
        case "PATCH":
          response = await http.patch(url, this._data, this._parseHeader)
          break
      }
      this.responseBuilder(response)
    }
    catch (error) {
      console.error(error)
      process.exit(1)
    }
    return this._schema
  }
}
