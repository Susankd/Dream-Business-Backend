const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const messageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const chatLeadSchema = mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true, trim: true },
    name: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    service: { type: String, trim: true },
    industry: { type: String, trim: true },
    appointmentDate: { type: String, trim: true },
    appointmentTime: { type: String, trim: true },
    language: { type: String, enum: ['english', 'nepali'], default: 'english' },
    notes: { type: String, trim: true },
    status: {
      type: String,
      enum: ['new', 'contacted', 'converted', 'lost'],
      default: 'new',
    },
    conversation: [messageSchema],
  },
  { timestamps: true }
);

chatLeadSchema.plugin(toJSON);
chatLeadSchema.plugin(paginate);

const ChatLead = mongoose.model('ChatLead', chatLeadSchema);
module.exports = ChatLead;
