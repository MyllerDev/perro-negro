import { Router } from "express";

import {
  getPaymentConfig,
} from "../controllers/paymentController.js";

const router = Router();

router.get(
  "/config",
  getPaymentConfig
);

export default router;