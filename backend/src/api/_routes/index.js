import express from "express";
import AuthRoutes from "../authentication/routes/auth_routes.js";
import ReceiptRoutes from "../receipts/routes/receipt_routes.js";
import CustomerRoutes from "../customer/routes/customer_routes.js";

const RootRoutes = express.Router();

RootRoutes.use("/auth", AuthRoutes);
RootRoutes.use("/receipts", ReceiptRoutes);
RootRoutes.use("/customer", CustomerRoutes);

export default RootRoutes;
