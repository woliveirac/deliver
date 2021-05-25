const express = require('express');
const router = express.Router();
const billsToPayController = require('../controllers/billToPay.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createBillToPaySchema, updateBillToPaySchema} = require('../middleware/validators/billsToPayValidator.middleware');

router.get('/', awaitHandlerFactory(billsToPayController.getAllBills));
router.post('/', createBillToPaySchema, awaitHandlerFactory(billsToPayController.createBill));
router.patch('/:id', updateBillToPaySchema, awaitHandlerFactory(billsToPayController.updateBill));
router.delete('/:id', awaitHandlerFactory(billsToPayController.deleteBill));

module.exports = router;