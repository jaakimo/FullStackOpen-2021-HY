const express = require('express')
require('express-async-errors')

const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const errorHandler = require('./middleware/errorhandler')
const testingRouter = require('./controllers/testing')
const unknownEndpoint = require('./middleware/unknownendpoint')
const loginRouter = require('./controllers/login')
const { logger } = require('./utils/logger')
const userExtractor = require('./middleware/userextractor')
const tokenExtractor = require('./middleware/tokenextractor')

app.use(logger)

app.use(cors())
app.use(express.json())
app.use(tokenExtractor)
app.use('/api/blogs', userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}
app.use(errorHandler)
app.use(unknownEndpoint)

module.exports = app
