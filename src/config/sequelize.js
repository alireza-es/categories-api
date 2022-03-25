const Sequelize = require('sequelize');
const config = require('./config');
const logger = require('./logger');

const sequelize = new Sequelize(config.database.databaseName, config.database.user, config.database.pass, {
  host: config.database.host,
  port: config.database.port,
  dialect: config.database.dialect,
});

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.');
  })
  .catch((err) => {
    logger.error('Unable to connect to the database:', err);
  });
