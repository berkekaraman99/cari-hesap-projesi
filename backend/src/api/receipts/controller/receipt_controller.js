import BaseResponse from "../../../core/response/base_response.js";
import { db } from "../../../core/connection/mysql.js";
import { createReceiptValidator } from "../validators/create_receipt_validator.js";

export const createReceipt = async (req, res, next) => {
  try {
    const { receiptId, userId, customerId, createdDate, documentNo, price, description, type } = req.body;

    await createReceiptValidator
      .validate({
        price,
        description,
      })
      .catch((_) => {
        throw new Error("Validation Error");
      });

    await db.query({
      sql: "INSERT INTO receipts (receipt_id, customer_id, user_id, description, document_no, price, created_date, receipt_type, is_deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      values: [receiptId, customerId, userId, description, documentNo, price, createdDate, type, 0],
    });

    return res.status(201).json(BaseResponse.success("Receipt created successfully!", 201));
  } catch (e) {
    return res.status(500).json(BaseResponse.fail(e.message, e.statusCode));
  }
};

export const fetchReceipts = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const [receipts] = await db.query({
      sql: "SELECT * FROM receipts LEFT JOIN customers ON receipts.customer_id = customers.customer_id WHERE user_id = ? && receipts.is_deleted = ?",
      values: [userId, 0],
    });
    return res.status(200).json(BaseResponse.success(receipts, 200));
  } catch (e) {
    return res.status(500).json(BaseResponse.fail(e.message, e.statusCode));
  }
};

export const getReceiptById = async (req, res, next) => {
  try {
    const { receiptId } = req.query;
    const [receipt] = await db.query({
      sql: "SELECT * FROM receipts LEFT JOIN customers ON receipts.customer_id = customers.customer_id WHERE receipts.receipt_id = ?",
      values: [receiptId],
    });
    res.status(200).json(BaseResponse.success(receipt[0], 200));
  } catch (error) {
    res.status(500).json(BaseResponse.fail(error.message, error.statusCode));
  }
};

export const deleteReceipt = async (req, res, next) => {
  try {
    const { receiptId } = req.body;
    await db.query({
      sql: "UPDATE receipts SET is_deleted = 1 WHERE receipt_id = ?",
      values: [receiptId],
    });
    res.status(200).json(BaseResponse.fail("Receipt deleted successfully!", 200));
  } catch (error) {
    res.status(500).json(BaseResponse.fail(error.message, error.statusCode));
  }
};

export const updateReceipt = async (req, res, next) => {
  try {
    const {} = req.body;
    await db.query({
      sql: "UPDATE receipts SET ... WHERE receipt_id = ?",
      values: [],
    });
    res.status(200).json(BaseResponse.fail("Receipt updated successfully!", 200));
  } catch (error) {
    res.status(500).json(BaseResponse.fail(error.message, error.statusCode));
  }
};

export const getReceiptCount = async (req, res, next) => {
  try {
    const [receiptCount] = await db.query({
      sql: "SELECT COUNT(*) AS receipt_count, SUM(CASE WHEN receipt_type = 1 then 1 else 0 end) as alacak_count, SUM(CASE WHEN receipt_type = 2 then 1 else 0 end) as borc_count FROM receipts",
    });

    return res.status(200).json(BaseResponse.success(receiptCount, 200));
  } catch (e) {
    return res.status(500).json(BaseResponse.fail(e.message, e.statusCode));
  }
};

export const getReceivableReceiptTotalPrice = async (req, res, next) => {
  try {
    const { year } = req.query;
    const [totalPrice] = await db.query({
      sql: `SELECT
              EXTRACT(MONTH FROM created_date) AS month,
              EXTRACT(YEAR FROM created_date) AS year,
              SUM(price) AS total_alacak
            FROM
              caritestdb.receipts
            WHERE
              receipt_type = ? && EXTRACT(YEAR FROM created_date) = ?
            GROUP BY
                EXTRACT(MONTH FROM created_date),
                EXTRACT(YEAR FROM created_date)
            ORDER BY
                EXTRACT(YEAR FROM created_date),
                EXTRACT(MONTH FROM created_date)`,
      values: [1, year],
    });
    return res.status(200).json(BaseResponse.success(totalPrice, 200));
  } catch (e) {
    return res.status(500).json(BaseResponse.fail(e.message, e.statusCode));
  }
};

export const getDebtReceiptTotalPrice = async (req, res, next) => {
  try {
    const { year } = req.query;
    const [totalPrice] = await db.query({
      sql: `SELECT
              EXTRACT(MONTH FROM created_date) AS month,
              EXTRACT(YEAR FROM created_date) AS year,
              SUM(price) AS total_borc
            FROM
              caritestdb.receipts
            WHERE
              receipt_type = ? && EXTRACT(YEAR FROM created_date) = ?
            GROUP BY
                EXTRACT(MONTH FROM created_date),
                EXTRACT(YEAR FROM created_date)
            ORDER BY
                EXTRACT(YEAR FROM created_date),
                EXTRACT(MONTH FROM created_date)`,
      values: [2, year],
    });
    return res.status(200).json(BaseResponse.success(totalPrice, 200));
  } catch (e) {
    return res.status(500).json(BaseResponse.fail(e.message, e.statusCode));
  }
};
