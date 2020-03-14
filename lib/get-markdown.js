import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import renderMarkup from './render-markup'

const readFile = promisify(fs.readFile)

const getMarkdown = async filename => {
  const filenamePath = path.resolve(process.cwd(), filename)
  const contents = await readFile(filenamePath, 'utf-8')
  const html = renderMarkup(contents)

  return html
}

export default getMarkdown
