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
        method: {
          type: "string",
          short: "X"
        },
        header: {
          type: "string",
          short: "H",
          multiple: true,
        },
        data: {
          type: "string",
          short: "d"
        },
        url: {
          type: "string",
          short: "u"
        }
      },
      strict: true,
      allowPositionals: true,
    })

    return values
  }
}
