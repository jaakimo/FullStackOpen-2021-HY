const logger = require('../utils/logger')

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  if (error.name === 'MongoServerError') {
    return response.status(400).send({ error: error.message })
  }
  if (
    error.name === 'JsonWebTokenError' ||
    error.name === 'TokenExpiredError'
  ) {
    return response.status(401).send({ error: 'invalid token' })
  }
  next(error)
}
module.exports = errorHandler
