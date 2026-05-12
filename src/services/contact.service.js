const httpStatus = require('http-status');
const { Contact } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a new contact message (from public website contact form)
 * @param {Object} contactBody
 * @returns {Promise<Contact>}
 */
const createContact = async (contactBody) => {
  const contact = await Contact.create(contactBody);
  return contact;
};

/**
 * Get paginated contact messages
 * @param {Object} filter
 * @param {Object} options
 * @param {boolean} noRegex
 * @param {string|string[]} select
 * @returns {Promise<QueryResult>}
 */
const queryContacts = async (filter, options, noRegex, select) => {
  const contacts = await Contact.paginate(
    filter,
    options,
    noRegex,
    select,
    'getContacts'
  );
  return contacts;
};

/**
 * Get contact by id
 * @param {string} id
 * @returns {Promise<Contact>}
 */
const getContactById = async (id) => Contact.findById(id);

/**
 * Update contact by id (status, priority, etc.)
 * @param {string} contactId
 * @param {Object} updateBody
 * @returns {Promise<Contact>}
 */
const updateContactById = async (contactId, updateBody) => {
  const contact = await getContactById(contactId);
  if (!contact) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Contact not found');
  }
  Object.assign(contact, updateBody);
  await contact.save();
  return contact;
};

/**
 * Reply to a contact — stores reply, marks status replied.
 * Sending email is handled by emailService if configured.
 * @param {string} contactId
 * @param {Object} replyBody { message, repliedBy }
 * @returns {Promise<Contact>}
 */
const replyToContact = async (contactId, replyBody) => {
  const contact = await getContactById(contactId);
  if (!contact) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Contact not found');
  }
  contact.reply = {
    message: replyBody.message,
    repliedAt: new Date(),
    repliedBy: replyBody.repliedBy || 'admin',
  };
  contact.status = 'replied';
  await contact.save();
  return contact;
};

/**
 * Delete contact by id
 * @param {string} contactId
 * @returns {Promise<Contact>}
 */
const deleteContactById = async (contactId) => {
  const contact = await getContactById(contactId);
  if (!contact) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Contact not found');
  }
  await contact.deleteOne();
  return contact;
};

module.exports = {
  createContact,
  queryContacts,
  getContactById,
  updateContactById,
  replyToContact,
  deleteContactById,
};
