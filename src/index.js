const app = require('./app');
const config = require('./config/config');

const server = app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening to port ${config.port}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      // eslint-disable-next-line no-console
      console.log('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
