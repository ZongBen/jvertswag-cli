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
        root: {
          type: "string",
          short: "R",
        },
        path: {
          type: "string",
          short: "P",
        },
        params: {
          type: "string",
          short: "p",
          multiple: true,
        },
        query: {
          type: "string",
          short: "q",
        },
        comment: {
          type: "string",
          short: "c",
        }
      },
      strict: true,
      allowPositionals: true,
    })

    return values
  }
}
