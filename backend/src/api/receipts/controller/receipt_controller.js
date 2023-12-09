import BaseResponse from "../../../core/response/base_response.js";
import { db } from "../../../core/connection/mysql.js";

export const createReceipt = async (req, res, next) => {
  try {
    const { receiptId, userId, customerId, createdDate, documentNo, price, description, type } = req.body;

    await db.query({
      sql: "INSERT INTO receipts (receipt_id, customer_id, user_id, description, document_no, price, created_date, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      values: [receiptId, customerId, userId, description, documentNo, price, createdDate, type],
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
      sql: "SELECT * FROM receipts LEFT JOIN customers ON receipts.customer_id = customers.customer_id WHERE user_id = ?",
      values: [userId],
    });
    return res.status(200).json(BaseResponse.success(receipts, 200));
  } catch (e) {
    return res.status(500).json(BaseResponse.fail(e.message, e.statusCode));
  }
};
