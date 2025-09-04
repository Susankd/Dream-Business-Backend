const errors = require('common-errors');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
/**
 * get host url
 * @returns {String} the url
 */
function getHostUrl() {
  return `${config.host_url}`;
}

/**
 * checks if entity exists or not
 * @param {Object} model the model
 * @param {Object} query the query
 * @param {string} message the error message
 * @returns {Object} the found entity
 */
async function ensureEntityExists(model, query, message) {
  const entity = await model.findOne(query);
  if (!entity) {
    throw new errors.NotFoundError(message || `cannot find entity where: ${JSON.stringify(query)}`);
  }
  return entity;
}

/**
 * Validate that the hash is actually the hashed value of plain text
 * @param {String} text the text to validate
 * @param {String} hash the hash to validate
 * @returns {Boolean} whether it is valid or not
 */
async function validateHash(text, hash) {
  const value = await bcrypt.compareSync(text, hash);
  return value;
}

const genders = {
  male: 'male',
  female: 'female',
  other: 'other'
};

module.exports = {
  getHostUrl,
  ensureEntityExists,
  validateHash,
  genders
};
