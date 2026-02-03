const httpStatus = require('http-status');
const { Firmsewa } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a firmsewa submission
 * @param {Object} firmsewaBody
 * @returns {Promise<Firmsewa>}
 */
const createFirmsewa = async (firmsewaBody) => {
    return Firmsewa.create(firmsewaBody);
};

/**
 * Query for firmsewa submissions
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryFirmsewas = async (filter, options) => {
    const firmsewas = await Firmsewa.paginate(filter, options);
    return firmsewas;
};

/**
 * Get firmsewa submission by id
 * @param {ObjectId} id
 * @returns {Promise<Firmsewa>}
 */
const getFirmsewaById = async (id) => {
    return Firmsewa.findById(id);
};

/**
 * Update firmsewa submission by id
 * @param {ObjectId} firmsewaId
 * @param {Object} updateBody
 * @returns {Promise<Firmsewa>}
 */
const updateFirmsewaById = async (firmsewaId, updateBody) => {
    const firmsewa = await getFirmsewaById(firmsewaId);
    if (!firmsewa) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Firmsewa submission not found');
    }
    Object.assign(firmsewa, updateBody);
    await firmsewa.save();
    return firmsewa;
};

/**
 * Delete firmsewa submission by id
 * @param {ObjectId} firmsewaId
 * @returns {Promise<Firmsewa>}
 */
const deleteFirmsewaById = async (firmsewaId) => {
    const firmsewa = await getFirmsewaById(firmsewaId);
    if (!firmsewa) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Firmsewa submission not found');
    }
    await firmsewa.remove();
    return firmsewa;
};

module.exports = {
    createFirmsewa,
    queryFirmsewas,
    getFirmsewaById,
    updateFirmsewaById,
    deleteFirmsewaById,
};
