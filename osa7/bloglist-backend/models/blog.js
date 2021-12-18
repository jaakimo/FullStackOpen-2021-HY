const mongoose = require('mongoose')
const { MONGO_URI } = require('../utils/config')
const logger = require('../utils/logger')

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('Connected to DB'))
  .catch((err) => logger.error(err))

const blogSchema = mongoose.Schema({
  author: String,
  title: {
    type: String,
    required: true,
  },
  likes: { type: Number, default: 0 },
  url: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [],
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
