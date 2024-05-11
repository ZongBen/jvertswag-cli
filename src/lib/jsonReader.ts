export class jsonReader {
  static async read(path: string) {
    return await Bun.file(path).json()
  }
}
