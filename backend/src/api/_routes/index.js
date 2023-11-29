const express = require("express");

const router = express.Router();

const AuthRoutes = require("../authentication/routes/auth_routes");
const ReceiptRoutes = require("../receipts/routes/receipt_routes");
const CustomerRoutes = require("../customer/routes/customer_routes");

router.use("/auth", AuthRoutes);
router.use("/receipts", ReceiptRoutes);
router.use("/customer", CustomerRoutes);

module.exports = router;
