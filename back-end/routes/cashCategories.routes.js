const express = require('express');
const cashControllers = require('../controllers/cash.controllers');
const routes = require('../constants/routes')

const router = express.Router();

router.post(routes.ROUTE_ADD_CASH_CATEGORY, cashControllers.addCashCategory);

module.exports = router

