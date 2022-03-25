const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    DB_NAME: Joi.string().required().description('Database name').required(),
    DB_USER: Joi.string().required().description('Database user'),
    DB_PASS: Joi.string().required().description('Database password'),
    DB_HOST: Joi.string().required().description('Database host').default('localhost'),
    DB_PORT: Joi.number().default(5432),
    DB_DIALECT: Joi.string()
      .valid('mysql', 'postgres', 'sqlite')
      .required()
      .description('Database dialect')
      .default('postgres'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  database: {
    databaseName: envVars.DB_NAME,
    user: envVars.DB_USER,
    pass: envVars.DB_PASS,
    host: envVars.DB_HOST,
    port: envVars.DB_PORT,
    dialect: envVars.DB_DIALECT,
    url: `${envVars.DB_DIALECT}://${envVars.DB_USER}:${envVars.DB_PASS}@${envVars.DB_HOST}:${envVars.DB_PORT}/${envVars.DB_NAME}`,
  },
};
