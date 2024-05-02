import { Router } from "express";
import {
  createQrCode,
  createReceipt,
  deleteReceipt,
  downloadReceiptPdf,
  fetchReceipts,
  getDebtReceiptTotalPrice,
  getReceiptById,
  getReceiptCount,
  getReceiptReport,
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
ReceiptRoutes.get("/get-qr-code", authorizationMiddleware, createQrCode);
ReceiptRoutes.get("/download-receipt", downloadReceiptPdf);
ReceiptRoutes.get("/get-receipt-report", authorizationMiddleware, getReceiptReport);
ReceiptRoutes.post("/delete-receipt", authorizationMiddleware, deleteReceipt);
ReceiptRoutes.post("/update-receipt", authorizationMiddleware, updateReceipt);

export default ReceiptRoutes;
