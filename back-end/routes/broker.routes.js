const express = require('express');
const brokerControllers = require('../controllers/broker.controllers');
const routes = require('../constants/routes')

const router = express.Router();

router.get(routes.ROUTE_BROKER, brokerControllers.getBrokers);
router.post(routes.ROUTE_BROKER, brokerControllers.addBroker);
router.post(routes.ROUTE_BROKER_ASSETS, brokerControllers.addBrokerAsset);
router.delete(routes.ROUTE_BROKER_ASSETS, brokerControllers.deleteBrokerAsset);

module.exports = router

