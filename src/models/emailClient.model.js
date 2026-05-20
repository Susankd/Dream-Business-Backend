const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const BUSINESS_CATEGORIES = [
  'IT',
  'Hotel & Tourism',
  'Real Estate',
  'IT-Enabled',
  'Hydropower',
  'Manufacturing',
  'Other',
];

const emailClientSchema = mongoose.Schema(
  {
    businessName: { type: String, required: true, trim: true },
    ownerName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    address: { type: String, trim: true },
    businessCategory: {
      type: String,
      enum: BUSINESS_CATEGORIES,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true }
);

emailClientSchema.plugin(toJSON);
emailClientSchema.plugin(paginate);

const EmailClient = mongoose.model('EmailClient', emailClientSchema);
module.exports = EmailClient;
module.exports.BUSINESS_CATEGORIES = BUSINESS_CATEGORIES;
