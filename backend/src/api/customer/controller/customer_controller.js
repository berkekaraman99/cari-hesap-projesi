const BaseResponse = require("../../../core/response/base_response");
const db = require("../../../core/connection/mysql");

exports.createCustomer = async (req, res, next) => {
  try {
    const { customerId, customerName, taxAdministration, taxNumber, createdAt, connectedUserId } = req.body;

    const checkIsCustomerUnique = await db.query({
      sql: "SELECT * FROM customers WHERE customer_id = ?",
      values: [customerId],
    });

    const checkIsTaxNumberUnique = await db.query({
      sql: "SELECT * FROM customers WHERE tax_number = ?",
      values: [taxNumber],
    });

    if (checkIsCustomerUnique[0].length !== 0) {
      return res.status(200).json(BaseResponse.fail("Customer is already exists", 1013));
    }

    if (checkIsTaxNumberUnique[0].length !== 0) {
      return res.status(200).json(BaseResponse.fail("Tax Number is already exists", 1004));
    }

    await db.query({
      sql: "INSERT INTO customers (customer_id, customer_name, tax_number, tax_administration, createdAt, connected_user_id) VALUES (?, ?, ?, ?, ?, ?)",
      values: [customerId, customerName, taxNumber, taxAdministration, createdAt, connectedUserId],
    });

    res.status(201).json(BaseResponse.success("Customer created successfully!", 201));
  } catch (error) {
    res.status(500).json(BaseResponse.fail(error.message, error.statusCode));
  }
};

exports.getCustomers = async (req, res, next) => {
  try {
    const [customers] = await db.query({
      sql: "SELECT * FROM customers",
    });

    res.status(200).json(BaseResponse.success(customers, 200));
  } catch (error) {
    res.status(500).json(BaseResponse.fail(error.message, error.statusCode));
  }
};

exports.searchCustomers = async (req, res, next) => {
  try {
    const { text } = req.query;
    const [customers] = await db.query({
      sql: "SELECT * FROM customers WHERE customer_name LIKE ?",
      values: ["%" + text + "%"],
    });
    res.status(200).json(BaseResponse.success(customers, 200));
  } catch (error) {
    res.status(500).json(BaseResponse.fail(error.message, error.statusCode));
  }
};
