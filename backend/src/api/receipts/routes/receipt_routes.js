const express = require("express");

const receiptController = require("../controller/receipts");

const router = express.Router();

//POST DEBT-RECEIPT
router.post("/debt-receipt", receiptController.createDebtReceipt);

//POST RECEIVABLE-RECEIPT
router.post("/receivable-receipt", receiptController.createReceivableReceipt);

module.exports = router;
