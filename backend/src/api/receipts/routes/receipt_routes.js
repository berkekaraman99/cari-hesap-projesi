import { Router } from "express";
import {
  createReceipt,
  deleteReceipt,
  fetchReceipts,
  getDebtReceiptTotalPrice,
  getReceiptById,
  getReceiptCount,
  getReceivableReceiptTotalPrice,
  updateReceipt,
} from "../controller/receipt_controller.js";

import authorizationMiddleware from "../../../features/middlewares/authorization_middleware.js";

const ReceiptRoutes = Router();

//POST CREATE-RECEIPT
ReceiptRoutes.post("/create-receipt", authorizationMiddleware, createReceipt);
ReceiptRoutes.get("/get-receipts", authorizationMiddleware, fetchReceipts);
ReceiptRoutes.get("/get-receipt-count", authorizationMiddleware, getReceiptCount);
ReceiptRoutes.get("/get-debt-total-price", authorizationMiddleware, getDebtReceiptTotalPrice);
ReceiptRoutes.get("/get-receivable-total-price", authorizationMiddleware, getReceivableReceiptTotalPrice);
ReceiptRoutes.get("/get-receipt-by-id", authorizationMiddleware, getReceiptById);
ReceiptRoutes.post("/delete-receipt", authorizationMiddleware, deleteReceipt);
ReceiptRoutes.post("/update-receipt", authorizationMiddleware, updateReceipt);

export default ReceiptRoutes;
