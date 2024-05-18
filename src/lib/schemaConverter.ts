export abstract class schemaConverter {
  protected _gap
  protected _offset
  protected _schema = ""

  constructor(gap: number = 2, offset: number = 0) {
    this._gap = gap
    this._offset = offset
  }

  private _offsetter() {
    return " ".repeat(this._offset * this._gap)
  }

  protected addOffset(count: number) {
    this._offset += count
  }

  protected isDate(value: string) {
    return !isNaN(Date.parse(value))
  }

  protected writeLine(content: string) {
    this._schema += `${this._offsetter()}${content}\n`
  }
}
