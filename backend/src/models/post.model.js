const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = Schema({
  title: String,
  subtitle: String,
  content: String
}, {
  timestamps: true
})

module.exports = mongoose.model('Post', PostSchema)
