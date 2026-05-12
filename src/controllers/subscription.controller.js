const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { subscriptionService } = require('../services');
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');

/**
 * Public: subscribe to weekly business tips newsletter
 */
const subscribe = catchAsync(async (req, res) => {
  const sub = await subscriptionService.subscribe({
    email: req.body.email,
    name: req.body.name,
    source: req.body.source || 'footer-newsletter',
    list: req.body.list || 'weekly-business-tips',
  });
  res.status(httpStatus.CREATED).send({
    code: 201,
    message: "You're subscribed. Watch your inbox for weekly business tips.",
    data: sub,
  });
});

const getSubscriptions = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['email', 'status', 'list', 'source']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const noRegex = pick(req.query, ['noRegex']);
  const select = pick(req.query, ['select']);

  const result = await subscriptionService.querySubscriptions(
    filter,
    options,
    noRegex.noRegex,
    select.select
  );
  res.send(result);
});

const getSubscription = catchAsync(async (req, res) => {
  const sub = await subscriptionService.getSubscriptionById(
    req.params.subscriptionId
  );
  if (!sub) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subscription not found');
  }
  res.send(sub);
});

const updateSubscription = catchAsync(async (req, res) => {
  const updated = await subscriptionService.updateSubscriptionById(
    req.params.subscriptionId,
    req.body
  );
  res.send({ code: 200, message: 'Subscription updated', data: updated });
});

const unsubscribe = catchAsync(async (req, res) => {
  const idOrEmail = req.params.subscriptionId || req.body.email;
  const updated = await subscriptionService.unsubscribe(idOrEmail);
  res.send({ code: 200, message: 'Unsubscribed', data: updated });
});

const deleteSubscription = catchAsync(async (req, res) => {
  await subscriptionService.deleteSubscriptionById(req.params.subscriptionId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  subscribe,
  getSubscriptions,
  getSubscription,
  updateSubscription,
  unsubscribe,
  deleteSubscription,
};
