import { Router } from "express";
import {
  createCustomer,
  getCustomers,
  searchCustomers,
  getCustomerById,
  updateCustomer,
  getCustomerReceiptCount,
  fetchReceipts,
} from "../controller/customer_controller.js";
import authorizationMiddleware from "../../../features/middlewares/authorization_middleware.js";

const CustomerRoutes = Router();

CustomerRoutes.post("/create-customer", authorizationMiddleware, createCustomer);
CustomerRoutes.post("/update-customer", authorizationMiddleware, updateCustomer);
CustomerRoutes.get("/fetch-customers", authorizationMiddleware, getCustomers);
CustomerRoutes.get("/search", authorizationMiddleware, searchCustomers);
CustomerRoutes.get("/get-customer", authorizationMiddleware, getCustomerById);
CustomerRoutes.get("/get-customer-receipt-count", authorizationMiddleware, getCustomerReceiptCount);
CustomerRoutes.get("/fetch-receipts", authorizationMiddleware, fetchReceipts);

export default CustomerRoutes;
