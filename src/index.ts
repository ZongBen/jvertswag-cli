import { argsParser } from "./lib/argsParser"
import { jsonReader } from "./lib/jsonReader"
import { objectConverter } from "./lib/objectConverter"

const { file, gap } = argsParser.parseArgs(Bun.argv)

if (file) {
  const jsonObject = await jsonReader.read(file)
  const converter = new objectConverter(options => {
    options.gap = parseInt(gap as string)
  })
  const schema = converter.toSchema(jsonObject)
  console.log(schema)
}
