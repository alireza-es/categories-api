const listEndpoints = require('express-list-endpoints');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

logger.info('Starting server...');
logger.info(app.routes);
const server = app.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);

  const endpoints = listEndpoints(app);
  endpoints.forEach((endpoint) => {
    logger.info(JSON.stringify(endpoint));
  });
  
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
