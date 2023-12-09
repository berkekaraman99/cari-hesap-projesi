import express from "express";
import { createReceipt, fetchReceipts } from "../controller/receipt_controller.js";

const ReceiptRoutes = express.Router();

//POST CREATE-RECEIPT
ReceiptRoutes.post("/create-receipt", createReceipt);
ReceiptRoutes.get("/get-receipts", fetchReceipts);

export default ReceiptRoutes;
