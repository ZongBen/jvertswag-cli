import { parseArgs } from "util"

export class argsParser {
  static parseArgs(args: string[]) {
    const { values } = parseArgs({
      args,
      options: {
        file: {
          type: "string",
          short: "f",
        },
        gap: {
          type: "string",
          short: "g",
          default: "2",
        },
      },
      strict: true,
      allowPositionals: true,
    })

    return values
  }
}
