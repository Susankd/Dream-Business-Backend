const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { chatLeadService } = require('../services');
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');

const sendMessage = catchAsync(async (req, res) => {
  const { sessionId, message } = req.body;
  if (!message || !message.trim()) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Message is required');
  }
  const result = await chatLeadService.sendMessage(sessionId || null, message.trim());
  res.send(result);
});

const getAllLeads = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'service', 'status', 'language']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await chatLeadService.getAllLeads(filter, options);
  res.send(result);
});

const getLeadById = catchAsync(async (req, res) => {
  const lead = await chatLeadService.getLeadById(req.params.leadId);
  if (!lead) throw new ApiError(httpStatus.NOT_FOUND, 'Lead not found');
  res.send(lead);
});

const getLeadHistory = catchAsync(async (req, res) => {
  const lead = await chatLeadService.getLeadById(req.params.leadId);
  if (!lead) throw new ApiError(httpStatus.NOT_FOUND, 'Lead not found');
  const history = await chatLeadService.getLeadHistory(lead._id);
  res.send(history);
});

const getAllConversations = catchAsync(async (req, res) => {
  const result = await chatLeadService.getAllConversations();
  res.send(result);
});

const updateLeadStatus = catchAsync(async (req, res) => {
  const { status } = req.body;
  if (!status) throw new ApiError(httpStatus.BAD_REQUEST, 'Status is required');
  const lead = await chatLeadService.updateLeadStatus(req.params.leadId, status);
  if (!lead) throw new ApiError(httpStatus.NOT_FOUND, 'Lead not found');
  res.send(lead);
});

module.exports = {
  sendMessage,
  getAllLeads,
  getLeadById,
  getLeadHistory,
  getAllConversations,
  updateLeadStatus,
};
