const frontMatter = require('yaml-front-matter')
const fs = require('fs')
const path = require('path')

module.exports = fs
  .readdirSync('./posts/')
  .filter(file => path.extname(file) === '.md')
  .map(file => {
    const content = fs.readFileSync(`./posts/${file}`, 'utf8')
    return frontMatter.loadFront(content, 'body')
  })
