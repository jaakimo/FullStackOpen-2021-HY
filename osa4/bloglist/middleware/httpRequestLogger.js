const logger = require('../utils/logger');

const httpRequestLogger = (req, res, next) => {
  logger.info('Method: ', req.method);
  logger.info('url: ', req.url);
  logger.info('body: ', req.body);
  next();
};

module.exports = httpRequestLogger;
