import { argsParser } from "./lib/argsParser"
import { jsonReader } from "./lib/jsonReader"
import { swagConverter } from "./lib/swagConverter"

const { file, gap, method, header, data, url } = argsParser.parseArgs(Bun.argv)

if (file && !url) {
  const jsonObject = await jsonReader.read(file)
  const converter = new swagConverter(options => {
    options.gap = parseInt(gap as string)
  })
  const schema = converter.toSchema(jsonObject)
  console.log(schema)
}

else if (url && !file) {

}





