const express = require('express');
const { subscriptionController } = require('../controllers');

const router = express.Router();

router
  .route('/')
  .post(subscriptionController.subscribe)        // public: newsletter signup
  .get(subscriptionController.getSubscriptions); // admin: list

router
  .route('/:subscriptionId')
  .get(subscriptionController.getSubscription)
  .patch(subscriptionController.updateSubscription)
  .delete(subscriptionController.deleteSubscription);

router.post('/:subscriptionId/unsubscribe', subscriptionController.unsubscribe);
router.post('/unsubscribe', subscriptionController.unsubscribe); // by email body

module.exports = router;
