const express = require('express');
require('express-async-errors');

const app = express();
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const httpRequestLogger = require('./middleware/httpRequestLogger');
const errorHandler = require('./middleware/errorHandler');
const unknownEndpoint = require('./middleware/unknownEndpoint');

console.log('errorHandler', errorHandler);
app.use(cors());
app.use(express.json());
app.use(httpRequestLogger);
app.use('/api/blogs', blogsRouter);

app.use(errorHandler);
app.use(unknownEndpoint);

module.exports = app;
