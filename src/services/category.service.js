const { Category } = require('../models');
const logger = require('../config/logger');

/**
 * Query for categorys
 * @param {Object} filter - Mongo filter
 * @returns {Promise<QueryResult>}
 */
const queryCategories = async (filter) => {
  logger.info(`Querying categories. filter:${JSON.stringify(filter)}`);
  return Category.findAll();
};

/**
 * Get category by id
 * @param {ObjectId} id
 * @returns {Promise<Category>}
 */
const getCategoryById = async (id) => {
  logger.info(`Getting category by id:${id}`);
  throw new Error('Not implemented.');
};

module.exports = {
  queryCategories,
  getCategoryById,
};
