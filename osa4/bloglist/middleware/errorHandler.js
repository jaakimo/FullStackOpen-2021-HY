const logger = require('../utils/logger');

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'Validation Error') {
    return response.status(400).send({ error: error.message });
  }
  next(error);
};
module.exports = errorHandler;
