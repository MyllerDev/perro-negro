import express from "express";

import {
  createSaleController,
} from "../controllers/saleController.js";

import {
  createSaleController,
  updateSaleStatusController,
} from "../controllers/saleController.js";

const router = express.Router();

router.post(
  "/",
  createSaleController
);

router.patch(
  "/status",
  updateSaleStatusController
);
export default router;