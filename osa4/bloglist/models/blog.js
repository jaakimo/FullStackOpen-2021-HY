/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const { MONGO_URI } = require('../utils/config');
const logger = require('../utils/logger');

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => logger.info('Connected to DB')).catch((err) => logger.error(err));

const blogSchema = mongoose.Schema({
  title: {
    type: String, required: true,
  },
  url: String,
  author: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = Blog;
