const express = require("express");

const receiptController = require("../controller/receipts");

const router = express.Router();

//POST CREATE-RECEIPT
router.post("/create-receipt", receiptController.createReceipt);

module.exports = router;
