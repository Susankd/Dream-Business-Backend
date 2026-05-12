const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { contactService } = require('../services');
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');

/**
 * Public: submit contact form from dreambusiness.com.np/contact
 */
const createContact = catchAsync(async (req, res) => {
  const contact = await contactService.createContact({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    subject: req.body.subject,
    message: req.body.message,
    source: req.body.source || 'website',
    priority: req.body.priority,
  });
  res.status(httpStatus.CREATED).send({
    code: 201,
    message: 'Message received. We will get back to you within 24 hours.',
    data: contact,
  });
});

/**
 * Admin: list contacts (paginated)
 */
const getContacts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'email', 'status', 'priority', 'source']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const noRegex = pick(req.query, ['noRegex']);
  const select = pick(req.query, ['select']);

  const result = await contactService.queryContacts(
    filter,
    options,
    noRegex.noRegex,
    select.select
  );
  res.send(result);
});

const getContact = catchAsync(async (req, res) => {
  const contact = await contactService.getContactById(req.params.contactId);
  if (!contact) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Contact not found');
  }
  res.send(contact);
});

const updateContact = catchAsync(async (req, res) => {
  const updated = await contactService.updateContactById(
    req.params.contactId,
    req.body
  );
  res.send({ code: 200, message: 'Contact updated', data: updated });
});

const replyContact = catchAsync(async (req, res) => {
  const updated = await contactService.replyToContact(req.params.contactId, {
    message: req.body.message,
    repliedBy: req.body.repliedBy,
  });
  res.send({ code: 200, message: 'Reply sent', data: updated });
});

const deleteContact = catchAsync(async (req, res) => {
  await contactService.deleteContactById(req.params.contactId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createContact,
  getContacts,
  getContact,
  updateContact,
  replyContact,
  deleteContact,
};
