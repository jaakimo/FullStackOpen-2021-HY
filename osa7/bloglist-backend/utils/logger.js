/* eslint-disable no-console */
const morgan = require('morgan')

morgan.token('body', (req) => JSON.stringify(req.body))

const logger = morgan(':method :url :status :response-time :body', {
  skip: () => process.env.NODE_ENV === 'test',
})

const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}
const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(...params)
  }
}

module.exports = { logger, info, error }
