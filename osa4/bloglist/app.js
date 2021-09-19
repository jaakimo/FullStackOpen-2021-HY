const express = require('express');

const app = express();

const cors = require('cors');

const blogsRouter = require('./controllers/blogs');
const httpRequestLogger = require('./middleware/httpRequestLogger');

app.use(cors());
app.use(express.json());
app.use(httpRequestLogger);
app.use('/api/blogs', blogsRouter);

module.exports = app;
