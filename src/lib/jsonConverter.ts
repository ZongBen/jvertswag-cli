import { schemaConverter } from "./schemaConverter"

class options {
  gap: number | undefined
  offset: number | undefined
  comment: string

  constructor() {
    this.gap = 2
    this.offset = 0
    this.comment = ""
  }
}

export class jsonConverter extends schemaConverter {

  constructor(fn?: (options: options) => void) {
    const opt = new options()
    if (fn) {
      fn(opt)
    }
    super(opt.gap, opt.offset, opt.comment)
  }

  private _init(isArray: boolean) {
    if (isArray) {
      this.writeLine('type: array')
      this.writeLine('items:')
      this.addOffset(1)
    }
    else {
      this.writeLine('type: object')
      this.writeLine('properties:')
      this.addOffset(1)
    }
  }

  private _addProperty(key: string, value: any) {
    const valueType = typeof value

    switch (valueType) {
      case "object":
        this.writeLine(`${key}:`)
        this.addOffset(1)
        this._executeConversion(value)
        this.addOffset(-2)
        break
      case "string":
        this.writeLine(`${key}:`)
        this.addOffset(1)
        this.writeLine('type: string')
        this.addOffset(-1)
        if (this.isDate(value)) {
          this.addOffset(1)
          this.writeLine('format: date')
          this.addOffset(-1)
        }
        break
      case "number":
        this.writeLine(`${key}:`)
        this.addOffset(1)
        this.writeLine('type: number')
        this.addOffset(-1)
        break
      case "boolean":
        this.writeLine(`${key}:`)
        this.addOffset(1)
        this.writeLine('type: boolean')
        this.addOffset(-1)
        break
      default:
        this.writeLine(`${key}:`)
        this.addOffset(1)
        this.writeLine('type: undefined')
        this.addOffset(-1)
    }
  }

  private _executeConversion(target: any) {
    const isArray = Array.isArray(target)
    this._init(isArray)
    const item = isArray ? target.length > 0 ? target[0] : undefined : target
    const itemType = typeof item

    switch (itemType) {
      case "object":
        if (isArray) {
          this.writeLine('type: object')
          this.writeLine('properties:')
          this.addOffset(1)
        }
        for (const key in item) {
          this._addProperty(key, item[key] ?? undefined)
        }
        break
      case "string":
        this.writeLine('type: string')
        break
      case "number":
        this.writeLine('type: number')
        break
      default:
        this.writeLine('type: undefined')
    }
  }

  convert(target: any) {
    this._executeConversion(target)
    return this._schema
  }
}
