class options {
  gap: number

  constructor() {
    this.gap = 2
  }
}

export class objectConverter {
  _gap
  _schema = ""
  _offset = 0


  constructor(fn?: (options: options) => void) {
    const opt = new options()
    if (fn) {
      fn(opt)
    }
    this._gap = opt.gap
    this._init()
  }

  _init() {
    this._writeLine('type: object')
    this._writeLine('properties:')
    this._addOffset(1)
  }

  _writeLine(content: string) {
    this._schema += `${this._offsetter()}${content}\n`
  }

  _offsetter() {
    return " ".repeat(this._offset * this._gap)
  }

  _addOffset(count: number) {
    this._offset += count
  }

  _isDate(value: string) {
    return !isNaN(Date.parse(value))
  }

  _addSchemaLine(key: string, value: string) {
    const valueType = typeof value

    if (valueType === "object") {
      if (Array.isArray(value)) {
        this._writeLine(`${key}:`)
        this._addOffset(1)
        this._writeLine('type: array')
        this._writeLine('items:')
        this._addOffset(1)
        this._writeLine('type: any')
      } else {
        this._writeLine(`${key}:`)
        this._addOffset(1)
        this._init()
        this.toSchema(value)
        this._addOffset(-2)
      }
    } else if (valueType === "string") {
      this._writeLine(`${key}:`)
      this._addOffset(1)
      this._writeLine('type: string')
      this._addOffset(-1)
      if (this._isDate(value)) {
        this._addOffset(1)
        this._writeLine('format: date')
        this._addOffset(-1)
      }
    } else if (valueType === "number") {
      this._writeLine(`${key}:`)
      this._addOffset(1)
      this._writeLine('type: number')
      this._addOffset(-1)
    }
  }

  toSchema(object: any) {
    Object.keys(object).forEach((key) => {
      this._addSchemaLine(key, object[key])
    })
    return this._schema
  }
}
