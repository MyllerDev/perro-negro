import express from "express";

import {
  createSaleController,
} from "../controllers/saleController.js";

const router = express.Router();

router.post(
  "/",
  createSaleController
);

export default router;