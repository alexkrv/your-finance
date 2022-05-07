const express = require('express');
const cashControllers = require('../controllers/cash.controllers');
const routes = require('../constants/routes')

const router = express.Router();

router.post(routes.ROUTE_CASH_CATEGORY_ITEM, cashControllers.addCashCategoryItem);
router.delete(routes.ROUTE_CASH_CATEGORY_ITEM, cashControllers.deleteCashCategory);
router.delete(routes.ROUTE_BANK_ORGANIZATION, cashControllers.deleteBankOrganization);
router.get(routes.ROUTE_CURRENCIES, cashControllers.getCurrenciesList);
router.get(routes.ROUTE_CONVERSION_RATES, cashControllers.getConversionRates);
router.get(routes.ROUTE_GET_CASH_STRUCTURE, cashControllers.getCashCategories);
router.post(routes.ROUTE_BANK_ORGANIZATION, cashControllers.addBankOrganization);
router.get(routes.ROUTE_BANK_ORGANIZATION, cashControllers.getBanksList);

module.exports = router

