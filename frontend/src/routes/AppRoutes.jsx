import { Routes, Route } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import Payment from "../pages/Payment/Payment";
import Contact from "../pages/Contact/Contact";
import NotFound from "../pages/NotFound/NotFound";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={<Home />}
        />

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

        <Route
          path="*"
          element={<NotFound />}
        />
      </Route>
    </Routes>
  );
}