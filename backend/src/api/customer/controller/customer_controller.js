import BaseResponse from "../../../core/response/base_response.js";
import { db } from "../../../core/connection/mysql.js";

export const createCustomer = async (req, res, next) => {
  try {
    const { customerId, customerName, taxAdministration, taxAdministrationCity, taxNumber, createdAt, connectedUserId } = req.body;

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
      sql: "INSERT INTO customers (customer_id, customer_name, tax_number, tax_administration, tax_administration_city, createdAt, connected_user_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      values: [customerId, customerName, taxNumber, taxAdministration, taxAdministrationCity, createdAt, connectedUserId],
    });

    res.status(201).json(BaseResponse.success("Customer created successfully!", 201));
  } catch (error) {
    res.status(500).json(BaseResponse.fail(error.message, error.statusCode));
  }
};

export const updateCustomer = async (req, res, next) => {
  try {
    const { customerId, customerName, taxAdministration, taxAdministrationCity, taxNumber } = req.body;

    await db.query({
      sql: "UPDATE customers SET customer_name = ?, tax_number = ?, tax_administration = ?, tax_administration_city = ? WHERE customer_id = ?",
      values: [customerName, taxNumber, taxAdministration, taxAdministrationCity, customerId],
    });

    res.status(201).json(BaseResponse.success("Customer updated successfully!", 201));
  } catch (error) {
    res.status(500).json(BaseResponse.fail(error.message, error.statusCode));
  }
};

export const getCustomerById = async (req, res, next) => {
  try {
    const { customerId } = req.query;
    console.log(customerId);
    const [customer] = await db.query({
      sql: "SELECT * FROM customers WHERE customer_id = ?",
      values: [customerId],
    });
    res.status(200).json(BaseResponse.success(customer[0], 200));
  } catch (error) {
    res.status(500).json(BaseResponse.fail(error.message, error.statusCode));
  }
};

export const getCustomers = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const query = "SELECT * FROM customers WHERE connected_user_id = ?";
    const [customers] = await db.query({
      sql: query,
      values: [userId],
    });
    console.log(customers);
    res.status(200).json(BaseResponse.success(customers, 200));
  } catch (error) {
    res.status(500).json(BaseResponse.fail(error.message, error.statusCode));
  }
};

export const searchCustomers = async (req, res, next) => {
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
