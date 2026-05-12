const httpStatus = require('http-status');
const { Subscription } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create/upsert a subscription (newsletter signup).
 * If the email already exists in 'unsubscribed' state we re-activate it.
 * If active, it returns the existing record silently (idempotent).
 * @param {Object} body { email, name?, source?, list? }
 */
const subscribe = async (body) => {
  const existing = await Subscription.findOne({ email: body.email });
  if (existing) {
    if (existing.status === 'unsubscribed') {
      existing.status = 'active';
      existing.subscribedAt = new Date();
      existing.unsubscribedAt = undefined;
      if (body.name) existing.name = body.name;
      if (body.source) existing.source = body.source;
      if (body.list) existing.list = body.list;
      await existing.save();
    }
    return existing;
  }
  const subscription = await Subscription.create(body);
  return subscription;
};

/**
 * Get paginated subscriptions
 */
const querySubscriptions = async (filter, options, noRegex, select) => {
  const subs = await Subscription.paginate(
    filter,
    options,
    noRegex,
    select,
    'getSubscriptions'
  );
  return subs;
};

const getSubscriptionById = async (id) => Subscription.findById(id);

const updateSubscriptionById = async (id, updateBody) => {
  const sub = await getSubscriptionById(id);
  if (!sub) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subscription not found');
  }
  Object.assign(sub, updateBody);
  await sub.save();
  return sub;
};

/**
 * Mark a subscription as unsubscribed (soft).
 */
const unsubscribe = async (idOrEmail) => {
  const sub =
    (await Subscription.findById(idOrEmail).catch(() => null)) ||
    (await Subscription.findOne({ email: String(idOrEmail).toLowerCase() }));
  if (!sub) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subscription not found');
  }
  sub.status = 'unsubscribed';
  sub.unsubscribedAt = new Date();
  await sub.save();
  return sub;
};

const deleteSubscriptionById = async (id) => {
  const sub = await getSubscriptionById(id);
  if (!sub) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subscription not found');
  }
  await sub.deleteOne();
  return sub;
};

module.exports = {
  subscribe,
  querySubscriptions,
  getSubscriptionById,
  updateSubscriptionById,
  unsubscribe,
  deleteSubscriptionById,
};
