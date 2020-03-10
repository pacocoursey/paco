import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

export default () =>
  fs
    .readdirSync('./posts/')
    .filter(file => path.extname(file) === '.md')
    .map(file => {
      const postContent = fs.readFileSync(`./posts/${file}`, 'utf8')
      const { data, content } = matter(postContent)
      return { ...data, body: content }
    })
