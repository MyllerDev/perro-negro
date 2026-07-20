import { Routes, Route } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import AdminLayout from "../components/admin/AdminLayout";

import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import Payment from "../pages/Payment/Payment";
import Contact from "../pages/Contact/Contact";
import NotFound from "../pages/NotFound/NotFound";

import Login from "../pages/Admin/Login";
import AdminDashboard from "../pages/Admin/AdminDashboard";

import ProtectedRoute from "./ProtectedRoute";

import AdminProducts from "../pages/Admin/AdminProducts";

export function AppRoutes() {
  return (
    <Routes>
      {/* =========================
          PÁGINA PÚBLICA
      ========================== */}

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route
          path="/productos"
          element={<Products />}
        />

        <Route
          path="/carrito"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/pago"
          element={<Payment />}
        />

        <Route
          path="/contacto"
          element={<Contact />}
        />
      </Route>

      {/* =========================
          LOGIN ADMINISTRADOR
      ========================== */}

      <Route
        path="/admin/login"
        element={<Login />}
      />

      {/* =========================
          PANEL ADMINISTRATIVO
      ========================== */}

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/products"
            element={<AdminProducts />}
          />
        </Route>
      </Route>

      {/* =========================
          404
      ========================== */}

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}