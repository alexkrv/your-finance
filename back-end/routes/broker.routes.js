const express = require('express');

const brokerControllers = require('../controllers/broker.controllers');
const routes = require('../constants/routes');

const router = express.Router();

router.get(routes.ROUTE_BROKER, brokerControllers.getBrokers);
router.post(routes.ROUTE_BROKER, brokerControllers.addBroker);
router.patch(routes.ROUTE_BROKER, brokerControllers.editBroker);
router.post(routes.ROUTE_BROKER_ASSETS, brokerControllers.addBrokerAsset);
router.get(routes.ROUTE_BROKER_ASSETS, brokerControllers.getAssetPriceByTicker);
router.delete(routes.ROUTE_BROKER_ASSETS, brokerControllers.deleteBrokerAsset);
router.patch(routes.ROUTE_BROKER_ASSETS, brokerControllers.editBrokerAsset);
router.post(routes.ROUTE_BROKER_AVATAR, brokerControllers.addBrokerAvatar);

module.exports = router;

