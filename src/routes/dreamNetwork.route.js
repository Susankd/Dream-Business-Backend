const express = require('express');
const { dreamNetworkController } = require('../controllers');

const router = express.Router();

// --- Founder Application Routes ---

/**
 * Create a new founder application or get all applications
 */
router
  .route('/founder')
  .post(dreamNetworkController.createFounderApplication)
  .get(dreamNetworkController.getAllFounderApplications);

/**
 * Get, Update founder application by ID
 */
router
  .route('/founder/:applicationId')
  .get(dreamNetworkController.getFounderApplicationById)
  .patch(dreamNetworkController.updateFounderApplication);

/**
 * Get founder application by email
 */
router
  .route('/founder/email/:email')
  .get(dreamNetworkController.getFounderApplicationByEmail);

// --- Investor Profile Routes ---

/**
 * Create a new investor profile or get all profiles
 */
router
  .route('/investor')
  .post(dreamNetworkController.createInvestorProfile)
  .get(dreamNetworkController.getAllInvestorProfiles);

/**
 * Get, Update investor profile by ID
 */
router
  .route('/investor/:profileId')
  .get(dreamNetworkController.getInvestorProfileById)
  .patch(dreamNetworkController.updateInvestorProfile);

/**
 * Get investor profile by email
 */
router
  .route('/investor/email/:email')
  .get(dreamNetworkController.getInvestorProfileByEmail);

module.exports = router;
