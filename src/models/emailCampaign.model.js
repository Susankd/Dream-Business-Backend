const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const recipientResultSchema = new mongoose.Schema(
  {
    email: { type: String, trim: true, lowercase: true },
    status: { type: String, enum: ['sent', 'failed'], required: true },
    failReason: { type: String, trim: true },
  },
  { _id: false }
);

const emailCampaignSchema = mongoose.Schema(
  {
    subject: { type: String, required: true, trim: true },
    template: {
      type: String,
      enum: ['business_registration', 'it_industry'],
      required: true,
    },
    recipients: [{ type: String, trim: true, lowercase: true }],
    recipientResults: [recipientResultSchema],
    sentCount: { type: Number, default: 0 },
    failedCount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['processing', 'sent', 'partial', 'failed'],
      default: 'processing',
    },
    batchSize: { type: Number, default: 10 },
    batchDelayMinutes: { type: Number, default: 1 },
  },
  { timestamps: true }
);

emailCampaignSchema.plugin(toJSON);
emailCampaignSchema.plugin(paginate);

const EmailCampaign = mongoose.model('EmailCampaign', emailCampaignSchema);
module.exports = EmailCampaign;
