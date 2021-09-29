const express = require('express')
require('express-async-errors')
const morgan = require('morgan')

const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const errorHandler = require('./middleware/errorhandler')
const unknownEndpoint = require('./middleware/unknownendpoint')
const loginRouter = require('./controllers/login')

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time :body'))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(errorHandler)
app.use(unknownEndpoint)

module.exports = app
