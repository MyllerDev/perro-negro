import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getAdminProducts,
  createProduct,
  updateProduct,
  toggleProductStatus,
} from "../controllers/productController.js";

const router = express.Router();

router.get(
  "/profile",
  authMiddleware,
  (req, res) => {
    res.json({
      success: true,
      message: "Ruta protegida correctamente",
      admin: req.admin,
    });
  }
);

router.get(
  "/products",
  authMiddleware,
  getAdminProducts
);

router.post(
  "/products",
  authMiddleware,
  createProduct
);

router.put(
  "/products/:id",
  authMiddleware,
  updateProduct
);

router.patch(
  "/products/:id/status",
  authMiddleware,
  toggleProductStatus
);

export default router;