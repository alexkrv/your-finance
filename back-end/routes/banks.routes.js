const express = require('express');
const bankControllers = require('../controllers/bank.controllers');
const routes = require('../constants/routes')

const router = express.Router();

router.get(routes.ROUTE_BANK_ORGANIZATION, bankControllers.getBanksList);
router.post(routes.ROUTE_BANK_ORGANIZATION, bankControllers.addBankOrganization);
router.put(routes.ROUTE_BANK_ORGANIZATION, bankControllers.addBankAccount);
router.patch(routes.ROUTE_BANK_ORGANIZATION, bankControllers.editBankAccount);
router.delete(routes.ROUTE_BANK_ORGANIZATION, bankControllers.deleteBankOrganization);
router.delete(routes.ROUTE_BANK_ACCOUNT, bankControllers.deleteBankAccount);
router.post(routes.ROUTE_BANK_AVATAR, bankControllers.addBankOrganizationAvatar);

module.exports = router

