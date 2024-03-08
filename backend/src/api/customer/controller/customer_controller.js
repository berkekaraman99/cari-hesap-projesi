import BaseResponse from "../../../core/response/base_response.js";
import { db } from "../../../core/connection/mysql.js";
import { createCustomerValidator } from "../validators/create_customer_validator.js";

export const createCustomer = async (req, res, next) => {
  try {
    const { customerId, customerName, taxAdministration, taxAdministrationCity, taxNumber, createdAt, connectedUserId, customerType } = req.body;
    await createCustomerValidator
      .validate({
        customerName,
        taxNumber,
      })
      .catch((_) => {
        throw new Error("Validation Error");
      });

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
      sql: "INSERT INTO customers (customer_id, customer_name, tax_number, tax_administration, tax_administration_city, created_at, connected_user_id, customer_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      values: [customerId, customerName, taxNumber, taxAdministration, taxAdministrationCity, createdAt, connectedUserId, customerType],
    });

    res.status(201).json(BaseResponse.success("Customer created successfully!", 201));
  } catch (error) {
    res.status(500).json(BaseResponse.fail(error.message, error.statusCode));
  }
};

export const deleteCustomer = async (req, res, next) => {
  try {
    const { customerId } = req.body;

    await db.query({
      sql: "UPDATE customers SET is_deleted = ? WHERE customer_id = ?",
      values: [1, customerId],
    });
    res.status(200).json(BaseResponse.success("Customer deleted successfully!", 200));
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
    const query = "SELECT * FROM customers WHERE is_deleted != 1";
    const [customers] = await db.query({
      sql: query,
      values: [],
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

export const getCustomerReceiptCount = async (req, res, next) => {
  try {
    const { customerId } = req.query;
    const [receiptCount] = await db.query({
      sql: "SELECT COUNT(*) AS receipt_count, SUM(CASE WHEN receipt_type = 1 then 1 else 0 end) as alacak_count, SUM(CASE WHEN receipt_type = 2 then 1 else 0 end) as borc_count FROM receipts WHERE customer_id = ? && receipts.is_deleted = ?",
      values: [customerId, 0],
    });

    return res.status(200).json(BaseResponse.success(receiptCount, 200));
  } catch (e) {
    return res.status(500).json(BaseResponse.fail(e.message, e.statusCode));
  }
};

export const fetchReceipts = async (req, res, next) => {
  try {
    const { customerId } = req.query;
    const [receipts] = await db.query({
      sql: "SELECT * FROM receipts WHERE customer_id = ? && receipts.is_deleted = ?",
      values: [customerId, 0],
    });
    return res.status(200).json(BaseResponse.success(receipts, 200));
  } catch (e) {
    return res.status(500).json(BaseResponse.fail(e.message, e.statusCode));
  }
};

export const getDebtReceiptTotalPrice = async (req, res, next) => {
  try {
    const { year, customer_id } = req.query;
    const [totalPrice] = await db.query({
      sql: `SELECT
              EXTRACT(MONTH FROM created_date) AS month,
              EXTRACT(YEAR FROM created_date) AS year,
              SUM(price) AS total_borc
            FROM
              caritestdb.receipts
            WHERE
              receipt_type = ? && EXTRACT(YEAR FROM created_date) = ? && customer_id = ? && is_deleted = ?
            GROUP BY
                EXTRACT(MONTH FROM created_date),
                EXTRACT(YEAR FROM created_date)
            ORDER BY
                EXTRACT(YEAR FROM created_date),
                EXTRACT(MONTH FROM created_date)`,
      values: [2, year, customer_id, 0],
    });
    return res.status(200).json(BaseResponse.success(totalPrice, 200));
  } catch (e) {
    return res.status(500).json(BaseResponse.fail(e.message, e.statusCode));
  }
};

export const getReceivableReceiptTotalPrice = async (req, res, next) => {
  try {
    const { year, customer_id } = req.query;
    const [totalPrice] = await db.query({
      sql: `SELECT
              EXTRACT(MONTH FROM created_date) AS month,
              EXTRACT(YEAR FROM created_date) AS year,
              SUM(price) AS total_alacak
            FROM
              caritestdb.receipts
            WHERE
              receipt_type = ? && EXTRACT(YEAR FROM created_date) = ? && customer_id = ? && is_deleted = ?
            GROUP BY
                EXTRACT(MONTH FROM created_date),
                EXTRACT(YEAR FROM created_date)
            ORDER BY
                EXTRACT(YEAR FROM created_date),
                EXTRACT(MONTH FROM created_date)`,
      values: [1, year, customer_id, 0],
    });
    return res.status(200).json(BaseResponse.success(totalPrice, 200));
  } catch (e) {
    return res.status(500).json(BaseResponse.fail(e.message, e.statusCode));
  }
};
