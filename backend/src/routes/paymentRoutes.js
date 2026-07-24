import {
  Router,
} from "express";

import {
  getPaymentConfig,
  createPayment,
} from "../controllers/paymentController.js";

const router =
  Router();

router.get(
  "/config",
  getPaymentConfig
);

router.post(
  "/create",
  createPayment
);

export default router;