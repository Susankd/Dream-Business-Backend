const httpStatus = require('http-status');
const { Firmsewa } = require('../models');
const { emailService } = require('.');
const ApiError = require('../utils/ApiError');

/**
 * Create a firmsewa submission
 * @param {Object} firmsewaBody
 * @returns {Promise<Firmsewa>}
 */
const createFirmsewa = async (firmsewaBody) => {
    const firmsewa = await Firmsewa.create(firmsewaBody);

    try {
        const adminEmails = process.env.ADMIN_EMAIL
            ? process.env.ADMIN_EMAIL.split(',').map((email) => email.trim())
            : [];

        if (adminEmails.length === 0) {
            console.log('No admin emails configured. Skipping notification.');
            return firmsewa;
        }

        const emailBody = `
      <h2>New Firmsewa Service Request</h2>
      <p>A new service request has been submitted. Please find the details below:</p>
      <hr>
      <h3>Client Information</h3>
      <ul>
        <li><strong>Name:</strong> ${firmsewa.name}</li>
        <li><strong>Email:</strong> ${firmsewa.email}</li>
        <li><strong>Phone:</strong> ${firmsewa.phoneNumber}</li>
      </ul>
      <h3>Request Details</h3>
      <ul>
        <li><strong>Service Required:</strong> ${firmsewa.serviceRequired}</li>
        <li><strong>Message:</strong> ${firmsewa.message || 'No message provided'}</li>
      </ul>
    `;

        for (const to of adminEmails) {
            await emailService.sendBookingNotificationEmail(
                to,
                `New Firmsewa Request from ${firmsewa.name}`,
                emailBody
            );
        }
    } catch (err) {
        console.error('Error sending firmsewa notification email:', err);
    }

    return firmsewa;
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
