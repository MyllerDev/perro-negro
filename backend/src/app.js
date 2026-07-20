import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Perro Negro Backend funcionando correctamente",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Perro Negro API funcionando correctamente",
  });
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
export default app;