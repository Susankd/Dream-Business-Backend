const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const emailCampaignSchema = mongoose.Schema(
  {
    subject: { type: String, required: true, trim: true },
    template: {
      type: String,
      enum: ['business_registration'],
      required: true,
    },
    recipients: [{ type: String, trim: true, lowercase: true }],
    sentCount: { type: Number, default: 0 },
    failedCount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['sent', 'partial', 'failed'],
      default: 'sent',
    },
  },
  { timestamps: true }
);

emailCampaignSchema.plugin(toJSON);
emailCampaignSchema.plugin(paginate);

const EmailCampaign = mongoose.model('EmailCampaign', emailCampaignSchema);
module.exports = EmailCampaign;
