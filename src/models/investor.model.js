const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins'); // Assuming plugins are in ./plugins

const investorProfileSchema = mongoose.Schema(
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
    organization: {
      type: String,
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },

    // --- Investment Preferences ---
    investmentType: {
      type: String,
      enum: [
        "",
        'Angel / Individual',
        'Venture Capital',
        'Corporate / Institutional',
      ],
    },
    investmentSize: {
      type: String,
      required: true,
      enum: [
        'Below 500,000',
        '500,000–1,500,000',
        '1,500,000–2,500,000',
        'Above 2,500,000',
      ],
    },
    preferredIndustries: [
      {
        type: String,
        trim: true,
      },
    ], // Array for multiple industries
    preferredStage: {
      type: String,
      // required: true,
      // enum: [
      //   'Early stage (idea/prototype)',
      //   'Growth stage',
      //   'Scaling / mature startups',
      // ],
    },

    // --- Short Q&A ---
    attractionFactors: {
      type: String,
      // enum: [
      //   'Innovative idea',
      //   'Strong cash team',
      //   'Market opportunity',
      //   'Scalable business model',
      // ],
    },
    investmentStyle: {
      type: String,
    },
    mentoringInterest: {
      type: String,
    },

    // --- Final Section ---
    howDidYouHear: {
      type: String,
      trim: true,
    },
    meetingMode: {
      type: String,
      required: true,
    },

    // --- Admin & Status ---
    investorStatus: {
      type: String,
      default: 'Pending Review',
    },
  },
  {
    timestamps: true,
  }
);

// Plugins
investorProfileSchema.plugin(toJSON);
investorProfileSchema.plugin(paginate);

/**
 * @typedef InvestorProfile
 */
const InvestorProfile = mongoose.model(
  'InvestorProfile',
  investorProfileSchema
);

module.exports = InvestorProfile;
