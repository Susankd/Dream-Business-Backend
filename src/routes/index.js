const express = require('express');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const donerRoute = require('./doner.route');
const bookingRoute = require('./booking.route');
const blogRoute = require('./blog.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/doners',
    route: donerRoute,
  },
  {
    path: '/booking',
    route: bookingRoute,
  },
  {
    path: '/blogs',
    route: blogRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
