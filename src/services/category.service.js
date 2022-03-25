const { QueryTypes } = require('@sequelize/core');
const { Category } = require('../models');
const logger = require('../config/logger');
const listToTree = require('../utils/listToTree');

/**
 * Query for categories
 * @returns {Promise<QueryResult>}
 */
const queryAllCategories = async () => {
  logger.info(`Querying all categories.`);
  const query = `WITH RECURSIVE cte AS (
                  SELECT id, parent_id, name
                  FROM "Categories" t WHERE parent_id IS NULL 
                  UNION ALL
                      SELECT t1.id, t1.parent_id, t1.name
                  FROM "Categories" t1
                  INNER JOIN cte t2
                      ON t1.parent_id = t2.id
              )
              SELECT id,parent_id,name FROM cte`;
  const flatResult = await Category.sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
  const result = listToTree(flatResult, 'parent_id');

  return result;
};

/**
 * Get category by id
 * @param {ObjectId} id
 * @returns {Promise<Category>}
 */
const getCategoryById = async (id) => {
  logger.info(`Getting category by id:${id}`);
  const query = `WITH RECURSIVE cte AS (
                  SELECT id, parent_id, name
                  FROM "Categories" t WHERE id=${id} 
                  UNION ALL
                      SELECT t1.id, t1.parent_id, t1.name
                  FROM "Categories" t1
                  INNER JOIN cte t2
                      ON t1.parent_id = t2.id
              )
              SELECT id,parent_id,name FROM cte`;
  const flatResult = await Category.sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
  const result = listToTree(flatResult, 'parent_id');

  return result.length > 0 ? result[0] : null;
};

module.exports = {
  queryAllCategories,
  getCategoryById,
};
