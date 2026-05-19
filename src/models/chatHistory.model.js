const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const chatHistorySchema = mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChatLead',
      required: true,
      index: true,
    },
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

chatHistorySchema.plugin(toJSON);
chatHistorySchema.plugin(paginate);

const ChatHistory = mongoose.model('ChatHistory', chatHistorySchema);
module.exports = ChatHistory;
