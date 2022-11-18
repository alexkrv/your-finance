const express = require('express');

const userControllers = require('../controllers/users.controllers');
const routes = require('../constants/routes');

const router = express.Router();

router.post(routes.ROUTE_LOGIN, userControllers.userLogin);

module.exports = router;