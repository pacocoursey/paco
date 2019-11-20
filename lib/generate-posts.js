const posts = require('./get-posts')
const low = require('lowdb')
const path = require('path')
const FileSync = require('lowdb/adapters/FileSync')

// Open up a database connection
const adapter = new FileSync(path.join(__dirname, '../data/blog.json'))
const db = low(adapter)

// Sort the posts and filter out unpublshed
const sortedPosts = posts
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .filter(p => p.published !== false)

// Write the data
db.set('data', sortedPosts).write()

console.log('✨ Wrote blog posts.')
