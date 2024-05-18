export abstract class schemaConverter {
  protected _gap
  protected _offset
  protected _schema = ""
  protected _comment

  constructor(gap: number = 2, offset: number = 0, comment: string = "") {
    this._gap = gap
    this._offset = offset
    this._comment = comment
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
    if (this._comment !== "") {
      this._schema += this._comment
    }
    this._schema += `${this._offsetter()}${content}\n`
  }
}
