import express from "express";

import {
  createCustomerController,
} from "../controllers/customerController.js";

const router = express.Router();

router.post(
  "/",
  createCustomerController
);

export default router;