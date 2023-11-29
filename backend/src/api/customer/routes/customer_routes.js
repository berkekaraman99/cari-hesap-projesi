const express = require("express");

const customerController = require("../controller/customer_controller");

const router = express.Router();

router.post("/create-customer", customerController.createCustomer);

router.get("/fetch-customers", customerController.getCustomers);

router.get("/search", customerController.searchCustomers);

module.exports = router;
