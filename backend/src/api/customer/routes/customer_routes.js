import { Router } from "express";
import {
  createCustomer,
  getCustomers,
  searchCustomers,
  getCustomerById,
  updateCustomer,
  getCustomerReceiptCount,
  fetchReceipts,
  deleteCustomer,
  getReceiptTotalPrices,
  getCustomerCount,
  findCustomer,
} from "../controller/customer_controller.js";
import authorizationMiddleware from "../../../features/middlewares/authorization_middleware.js";

const CustomerRoutes = Router();

CustomerRoutes.post("/create-customer", authorizationMiddleware, createCustomer);
CustomerRoutes.post("/update-customer", authorizationMiddleware, updateCustomer);
CustomerRoutes.post("/delete-customer", authorizationMiddleware, deleteCustomer);
CustomerRoutes.get("/fetch-customers", authorizationMiddleware, getCustomers);
CustomerRoutes.get("/search", authorizationMiddleware, searchCustomers);
CustomerRoutes.get("/find-customer", authorizationMiddleware, findCustomer);
CustomerRoutes.get("/get-customer", authorizationMiddleware, getCustomerById);
CustomerRoutes.get("/get-customer-receipt-count", authorizationMiddleware, getCustomerReceiptCount);
CustomerRoutes.get("/get-customer-total-prices", authorizationMiddleware, getReceiptTotalPrices);
CustomerRoutes.get("/fetch-receipts", authorizationMiddleware, fetchReceipts);
CustomerRoutes.get("/get-customer-count", authorizationMiddleware, getCustomerCount);

export default CustomerRoutes;
