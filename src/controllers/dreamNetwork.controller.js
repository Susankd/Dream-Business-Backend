const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { dreamNetworkService } = require('../services'); // Import the combined service
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');

// --- Founder Application Controllers ---

/**
 * Create a new founder application
 */
const createFounderApplication = catchAsync(async (req, res) => {
  // NOTE: No file handling here, as the form requests pitch deck via email.
  const application = await dreamNetworkService.createFounderApplication(
    req.body
  );

  res.status(httpStatus.CREATED).send({
    code: 201,
    message: 'Founder application submitted successfully',
    data: application,
  });
});

/**
 * Get paginated founder applications
 */
const getAllFounderApplications = catchAsync(async (req, res) => {
  const filter = pick(req.query, [
    'fullName',
    'email',
    'companyStage',
    'industry',
    'applicationStatus',
  ]);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const noRegex = pick(req.query, ['noRegex']);
  const select = pick(req.query, ['select']);

  const result = await dreamNetworkService.getAllFounderApplications(
    filter,
    options,
    noRegex.noRegex,
    select.select
  );

  res.send(result);
});

/**
 * Get founder application by ID
 */
const getFounderApplicationById = catchAsync(async (req, res) => {
  const application = await dreamNetworkService.getFounderApplicationById(
    req.params.applicationId
  );
  if (!application) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Founder application not found');
  }
  res.send(application);
});

/**
 * Update founder application by ID
 */
const updateFounderApplication = catchAsync(async (req, res) => {
  // NOTE: No file handling, just updating fields.
  const application =
    await dreamNetworkService.updateFounderApplicationById(
      req.params.applicationId,
      req.body
    );

  res.send({
    code: 200,
    message: 'Founder application updated successfully',
    data: application,
  });
});

/**
 * Get founder application by Email (as a unique identifier)
 */
const getFounderApplicationByEmail = catchAsync(async (req, res) => {
  const application =
    await dreamNetworkService.getFounderApplicationByEmail(
      req.params.email
    );
  if (!application) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Founder application not found');
  }
  res.send(application);
});

// --- Investor Profile Controllers ---

/**
 * Create a new investor profile
 */
const createInvestorProfile = catchAsync(async (req, res) => {
  const profile = await dreamNetworkService.createInvestorProfile(
    req.body
  );

  res.status(httpStatus.CREATED).send({
    code: 201,
    message: 'Investor profile created successfully',
    data: profile,
  });
});

/**
 * Get paginated investor profiles
 */
const getAllInvestorProfiles = catchAsync(async (req, res) => {
  const filter = pick(req.query, [
    'fullName',
    'email',
    'investmentType',
    'investmentSize',
    'investorStatus',
  ]);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const noRegex = pick(req.query, ['noRegex']);
  const select = pick(req.query, ['select']);

  const result = await dreamNetworkService.getAllInvestorProfiles(
    filter,
    options,
    noRegex.noRegex,
    select.select
  );

  res.send(result);
});

/**
 * Get investor profile by ID
 */
const getInvestorProfileById = catchAsync(async (req, res) => {
  const profile = await dreamNetworkService.getInvestorProfileById(
    req.params.profileId
  );
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Investor profile not found');
  }
  res.send(profile);
});

/**
 * Update investor profile by ID
 */
const updateInvestorProfile = catchAsync(async (req, res) => {
  const profile = await dreamNetworkService.updateInvestorProfileById(
    req.params.profileId,
    req.body
  );

  res.send({
    code: 200,
    message: 'Investor profile updated successfully',
    data: profile,
  });
});

/**
 * Get investor profile by Email (as a unique identifier)
 */
const getInvestorProfileByEmail = catchAsync(async (req, res) => {
  const profile = await dreamNetworkService.getInvestorProfileByEmail(
    req.params.email
  );
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Investor profile not found');
  }
  res.send(profile);
});

module.exports = {
  // Founder exports
  createFounderApplication,
  getAllFounderApplications,
  getFounderApplicationById,
  updateFounderApplication,
  getFounderApplicationByEmail,
  // Investor exports
  createInvestorProfile,
  getAllInvestorProfiles,
  getInvestorProfileById,
  updateInvestorProfile,
  getInvestorProfileByEmail,
};
