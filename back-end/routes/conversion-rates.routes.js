const express = require('express');

const routes = require('../constants/routes');
const conversionRatesControllers = require('../controllers/converstion-rates.controllers');

const router = express.Router();

router.get(routes.ROUTE_CONVERSION_RATES, conversionRatesControllers.getConversionRates);

module.exports = router;