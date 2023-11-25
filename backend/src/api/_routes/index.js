const express = require("express");

const router = express.Router();

const AuthRoutes = require("../authentication/routes/auth");
const ReceiptRoutes = require("../receipts/routes/receipts");

router.use("/auth", AuthRoutes);
router.use("/receipts", ReceiptRoutes);

module.exports = router;
