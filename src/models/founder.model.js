const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins'); // Assuming plugins are in ./plugins

const founderApplicationSchema = mongoose.Schema(
  {
    // --- Basic Information ---
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    industry: {
      type: String,
      required: true,
      trim: true,
    },
    companyStage: {
      type: String,
      required: true,
      enum: [
        'Idea Stage',
        'Prototype / MVP',
        'Early Revenue',
        'Growth / Scaling',
      ],
    },

    // --- Funding & Business Details ---
    businessDescription: {
      type: String,
      required: true,
      trim: true,
    },
    problemSolved: {
      type: String,
      required: true,
      trim: true,
    },
    currentRevenue: {
      type: String, // Kept as String to allow "Pre-revenue" or "$5k MRR"
      trim: true,
    },
    fundingRequired: {
      type: String, // Kept as String for "NPR or USD"
      required: true,
      trim: true,
    },
    fundUsage: {
      type: String,
      required: true,
      trim: true,
    },
    previousFunding: {
      type: String,
      required: true,
      enum: ['Yes', 'No'],
    },
    previousFundingDetails: {
      type: String,
      trim: true, // Not required, only if previousFunding is 'Yes'
    },

    // --- Short Q&A ---
    investorTypeSought: {
      type: String,
      required: true,
      enum: [
        'Angel investor',
        'Strategic partner',
        'Venture capitalist',
        'Open to any suitable match',
      ],
    },
    mentorshipInterest: {
      type: String,
      required: true,
      enum: ['Yes', 'No', 'Maybe'],
    },

    // --- Final Section ---
    howDidYouHear: {
      type: String,
      trim: true,
    },
    meetingMode: {
      type: String,
      required: true,
      enum: ['Online', 'In-person'],
    },

    // --- Admin & Status ---
    // Added for backend tracking, similar to 'featured' or 'homepage'
    applicationStatus: {
      type: String,
      enum: ['Pending', 'In Review', 'Contacted', 'Rejected'],
      default: 'Pending',
    },
    pitchDeckReceived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Plugins
founderApplicationSchema.plugin(toJSON);
founderApplicationSchema.plugin(paginate);

/**
 * @typedef FounderApplication
 */
const FounderApplication = mongoose.model(
  'FounderApplication',
  founderApplicationSchema
);

module.exports = FounderApplication;
