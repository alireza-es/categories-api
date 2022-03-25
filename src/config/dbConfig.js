const config = require('./config');

const dbConfig = {
  development: {
    username: config.database.user,
    password: config.database.pass,
    database: config.database.databaseName,
    host: config.database.host,
    dialect: config.database.dialect,
  },
  test: {
    username: config.database.user,
    password: config.database.pass,
    database: config.database.databaseName,
    host: config.database.host,
    dialect: config.database.dialect,
  },
  production: {
    username: config.database.user,
    password: config.database.pass,
    database: config.database.databaseName,
    host: config.database.host,
    dialect: config.database.dialect,
  },
};
module.exports = dbConfig;
