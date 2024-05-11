export class objectConverter {
  _gap = 2
  _schema = ""
  _offset = 0

  constructor(gap: number) {
    this._gap = gap
    this._init()
  }

  _init() {
    this._schema += `${this._offsetter()}type: object\n`
    this._schema += `${this._offsetter()}properties:\n`
    this._addOffset(1)
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
        this._schema += `${this._offsetter()}${key}:\n`
        this._addOffset(1)
        this._schema += `${this._offsetter()}type: array\n`
        this._schema += `${this._offsetter()}items:\n`
        this._addOffset(1)
        this._schema += `${this._offsetter()}type: any\n`
      } else {
        this._schema += `${this._offsetter()}${key}:\n`
        this._addOffset(1)
        this._init()
        this.toSchema(value)
        this._addOffset(-2)
      }
    } else if (valueType === "string") {
      this._schema += `${this._offsetter()}${key}:\n`
      this._addOffset(1)
      this._schema += `${this._offsetter()}type: string\n`
      this._addOffset(-1)
      if (this._isDate(value)) {
        this._addOffset(1)
        this._schema += `${this._offsetter()}format: date\n`
        this._addOffset(-1)
      }
    } else if (valueType === "number") {
      this._schema += `${this._offsetter()}${key}:\n`
      this._addOffset(1)
      this._schema += `${this._offsetter()}type: number\n`
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
