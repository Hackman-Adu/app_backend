import express from "express";
import CustomerController from "../controllers/customer_controller";

const customerController: CustomerController = new CustomerController();

const router = express.Router();

router.get("/", customerController.getCustomers);

router.get("/:id", customerController.getCustomer);

router.put("/:id", customerController.updateCustomer);

router.delete("/:id", customerController.deleteCustomer);

router.post("/create", customerController.addCustomer);

export default router;
