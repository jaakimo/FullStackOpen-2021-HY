const mongoose = require('mongoose');
const { MONGO_URI } = require('../utils/config');
const logger = require('../utils/logger');

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => logger.info('Connected to DB')).catch((err) => logger.error(err));

const blogSchema = mongoose.Schema({
  title: String,
  url: String,
  author: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
