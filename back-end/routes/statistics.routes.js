const express = require('express');

const statisticsControllers = require('../controllers/statistics.controllers');
const routes = require('../constants/routes');

const router = express.Router();

router.get(routes.ROUTE_CASH_STATISTICS, statisticsControllers.getStatistics);
router.post(routes.ROUTE_CASH_STATISTICS, statisticsControllers.addStatisticsRecord);
router.patch(routes.ROUTE_CASH_STATISTICS, statisticsControllers.editStatisticsRecord);
router.delete(routes.ROUTE_CASH_STATISTICS, statisticsControllers.deleteStatisticsRecord);

module.exports = router;

