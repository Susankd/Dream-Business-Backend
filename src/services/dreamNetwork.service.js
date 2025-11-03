const httpStatus = require('http-status');
const {  Founder, Investor } = require('../models');
const ApiError = require('../utils/ApiError'); // Assuming ApiError is in this path

// --- Founder Application Service ---

/**
 * Create a new founder application
 * @param {Object} applicationBody
 * @returns {Promise<Founder>}
 */
const createFounderApplication = async (applicationBody) => {
  const application = await Founder.create(applicationBody);
  return application;
};

/**
 * Get paginated founder application list
 * @param {Object} filter
 * @param {Object} options
 * @param {boolean} noRegex
 * @param {string|string[]} select
 * @returns {Promise<QueryResult>}
 */
const getAllFounderApplications = async (filter, options, noRegex, select) => {
  const applications = await Founder.paginate(
    filter,
    options,
    noRegex,
    select,
    'getFounderApplications' // Custom context key
  );
  return applications;
};

/**
 * Get founder application by ID
 * @param {string} id
 * @returns {Promise<Founder>}
 */
const getFounderApplicationById = async (id) => Founder.findById(id);

/**
 * Update a founder application by ID
 * @param {string} applicationId
 * @param {Object} updateBody
 * @returns {Promise<Founder>}
 */
const updateFounderApplicationById = async (applicationId, updateBody) => {
  const application = await Founder.findById(applicationId);
  if (!application) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Founder application not found');
  }

  Object.assign(application, updateBody);
  await application.save();
  return application;
};

/**
 * Get founder application by email
 * @param {string} email
 * @returns {Promise<Founder>}
 */
const getFounderApplicationByEmail = async (email) => {
  const application = await Founder.findOne({ email });
  return application;
};

// --- Investor Profile Service ---

/**
 * Create a new investor profile
 * @param {Object} profileBody
 * @returns {Promise<Investor>}
 */
const createInvestorProfile = async (profileBody) => {
  const profile = await Investor.create(profileBody);
  return profile;
};

/**
 * Get paginated investor profile list
 * @param {Object} filter
 * @param {Object} options
 * @param {boolean} noRegex
 * @param {string|string[]} select
 * @returns {Promise<QueryResult>}
 */
const getAllInvestorProfiles = async (filter, options, noRegex, select) => {
  const profiles = await Investor.paginate(
    filter,
    options,
    noRegex,
    select,
    'getInvestorProfiles' // Custom context key
  );
  return profiles;
};

/**
 * Get investor profile by ID
 * @param {string} id
 * @returns {Promise<Investor>}
 */
const getInvestorProfileById = async (id) => Investor.findById(id);

/**
 * Update an investor profile by ID
 * @param {string} profileId
 * @param {Object} updateBody
 * @returns {Promise<Investor>}
 */
const updateInvestorProfileById = async (profileId, updateBody) => {
  const profile = await Investor.findById(profileId);
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Investor profile not found');
  }

  Object.assign(profile, updateBody);
  await profile.save();
  return profile;
};

/**
 * Get investor profile by email
 * @param {string} email
 * @returns {Promise<Investor>}
 */
const getInvestorProfileByEmail = async (email) => {
  const profile = await Investor.findOne({ email });
  return profile;
};

// --- Exports ---

module.exports = {
  // Founder functions
  createFounderApplication,
  getAllFounderApplications,
  getFounderApplicationById,
  updateFounderApplicationById,
  getFounderApplicationByEmail,
  // Investor functions
  createInvestorProfile,
  getAllInvestorProfiles,
  getInvestorProfileById,
  updateInvestorProfileById,
  getInvestorProfileByEmail,
};
