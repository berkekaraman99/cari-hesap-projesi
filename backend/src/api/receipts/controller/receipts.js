const BaseResponse = require("../../../core/response/base_response");
const db = require("../../../core/connection/mysql");

exports.createReceipt = async (req, res, next) => {
  const { receiptId, userId, customerId, createdDate, documentNo, price, description, type } = req.body;

  await db.query({
    sql: "INSERT INTO receipts (receipt_id, customer_id, user_id, description, document_no, price, created_date, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    values: [receiptId, customerId, userId, description, documentNo, price, createdDate, type],
  });

  res.status(201).json(BaseResponse.success("Receipt created successfully!", 201));
};
