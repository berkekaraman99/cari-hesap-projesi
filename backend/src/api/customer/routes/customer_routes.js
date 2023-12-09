import express from "express";
import { createCustomer, getCustomers, searchCustomers, getCustomerById, updateCustomer } from "../controller/customer_controller.js";

const CustomerRoutes = express.Router();

CustomerRoutes.post("/create-customer", createCustomer);
CustomerRoutes.post("/update-customer", updateCustomer);
CustomerRoutes.get("/fetch-customers", getCustomers);
CustomerRoutes.get("/search", searchCustomers);
CustomerRoutes.get("/get-customer", getCustomerById);

export default CustomerRoutes;
