import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

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

export default router;