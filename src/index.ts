import { argsParser } from "./lib/argsParser"
import { httpClient } from "./lib/httpClient"
import { jsonConverter } from "./lib/jsonConverter"
import { jsonReader } from "./lib/jsonReader"
import { urlConverter } from "./lib/urlConverter"

const { file, gap, method, header, data, path, params, root, query } = argsParser.parseArgs(Bun.argv)

if (file) {
  const jsonObject = await jsonReader.read(file)
  const converter = new jsonConverter(options => {
    options.gap = parseInt(gap as string)
  })
  const schema = converter.convert(jsonObject)
  console.log(schema)
}

else {
  if (!method) {
    console.error("Method is required")
    process.exit(1)
  }

  if (!path) {
    console.error("Path is required")
    process.exit(1)
  }

  if (!root) {
    console.error("Root is required")
    process.exit(1)
  }

  const converter = new urlConverter(method, root, path, async options => {
    if (header) {
      options.header = header
    }

    if (data) {
      options.data = await jsonReader.read(data)
    }

    if (params) {
      options.params = params
    }

    if (query) {
      options.query = query
    }
  })

  const schema = await converter.convert(new httpClient())
  console.log(schema)
}





