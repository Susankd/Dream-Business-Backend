const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { emailClientService } = require('../services');
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');
const { BUSINESS_CATEGORIES } = require('../models/emailClient.model');

const createClient = catchAsync(async (req, res) => {
  const client = await emailClientService.createClient(req.body);
  res.status(httpStatus.CREATED).send(client);
});

const getAllClients = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['businessCategory', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await emailClientService.getAllClients(filter, options);
  res.send(result);
});

const getClientsByCategory = catchAsync(async (req, res) => {
  const clients = await emailClientService.getClientsByCategory(req.params.category);
  res.send(clients);
});

const getClientById = catchAsync(async (req, res) => {
  const client = await emailClientService.getClientById(req.params.clientId);
  if (!client) throw new ApiError(httpStatus.NOT_FOUND, 'Client not found');
  res.send(client);
});

const updateClient = catchAsync(async (req, res) => {
  const client = await emailClientService.updateClient(req.params.clientId, req.body);
  if (!client) throw new ApiError(httpStatus.NOT_FOUND, 'Client not found');
  res.send(client);
});

const deleteClient = catchAsync(async (req, res) => {
  await emailClientService.deleteClient(req.params.clientId);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendCampaign = catchAsync(async (req, res) => {
  const { recipients, template, customSubject } = req.body;
  if (!recipients?.length) throw new ApiError(httpStatus.BAD_REQUEST, 'At least one recipient required');
  if (!template) throw new ApiError(httpStatus.BAD_REQUEST, 'Template is required');
  const result = await emailClientService.sendCampaign({ recipients, template, customSubject });
  res.send(result);
});

const getCampaigns = catchAsync(async (req, res) => {
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await emailClientService.getCampaigns(options);
  res.send(result);
});

const getTemplates = catchAsync(async (req, res) => {
  const templates = Object.entries(emailClientService.TEMPLATES).map(([key, val]) => ({
    key,
    label: val.label,
    subject: val.subject,
  }));
  res.send(templates);
});

const getCategories = catchAsync(async (req, res) => {
  res.send(BUSINESS_CATEGORIES);
});

module.exports = {
  createClient,
  getAllClients,
  getClientsByCategory,
  getClientById,
  updateClient,
  deleteClient,
  sendCampaign,
  getCampaigns,
  getTemplates,
  getCategories,
};
