const express = require('express')
require('express-async-errors')

const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const httpRequestLogger = require('./middleware/httprequestlogger')
const errorHandler = require('./middleware/errorhandler')
const unknownEndpoint = require('./middleware/unknownendpoint')
const loginRouter = require('./controllers/login')
const tokenExtractor = require('./middleware/tokenextractor')
const userExtractor = require('./middleware/userextractor')

app.use(cors())
app.use(express.json())
app.use(httpRequestLogger)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(errorHandler)
app.use(unknownEndpoint)

module.exports = app
