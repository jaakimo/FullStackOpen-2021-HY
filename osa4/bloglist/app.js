const express = require('express');

const app = express();

const cors = require('cors');
const logger = require('./utils/logger');
const Blog = require('./models/blog');
const blogsRouter = require('./controllers/blogs');

app.use(cors);
app.use('/api/blogs', blogsRouter);
