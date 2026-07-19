import { Link } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
} from "lucide-react";

import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";

import { useCart } from "../../context/CartContext";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    total,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <Container className="py-32">
        <div className="mx-auto max-w-xl text-center">
          <ShoppingBag
            size={64}
            className="mx-auto text-[#d4af37]"
          />

          <h1 className="mt-6 text-4xl font-bold">
            Tu carrito está vacío
          </h1>

          <p className="mt-4 text-gray-400">
            Descubre nuestros productos y agrega tus favoritos.
          </p>

          <Link to="/productos">
            <Button className="mt-8">
              Ver productos
            </Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-20">
      <h1 className="text-4xl font-bold">
        Tu carrito
      </h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {cartItems.map((item) => {
            const finalPrice = item.discount
              ? item.price -
                (item.price * item.discount) / 100
              : item.price;

            return (
              <div
                key={item.id}
                className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:flex-row sm:items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-28 w-full rounded-xl object-cover sm:w-28"
                />

                <div className="flex-1">
                  <p className="text-sm text-[#d4af37]">
                    {item.category}
                  </p>

                  <h2 className="mt-1 text-xl font-bold">
                    {item.name}
                  </h2>

                  <p className="mt-2 text-[#d4af37]">
                    ${finalPrice.toLocaleString("es-CO")}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity - 1
                      )
                    }
                    className="rounded-lg bg-white/10 p-2 transition hover:bg-white/20"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="min-w-6 text-center font-bold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity + 1
                      )
                    }
                    className="rounded-lg bg-white/10 p-2 transition hover:bg-white/20"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                  className="rounded-lg p-2 text-red-400 transition hover:bg-red-400/10"
                  aria-label={`Eliminar ${item.name}`}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            );
          })}
        </div>

        <div className="h-fit rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-2xl font-bold">
            Resumen de compra
          </h2>

          <div className="my-6 border-t border-white/10" />

          <div className="flex items-center justify-between">
            <span className="text-gray-400">
              Total
            </span>

            <span className="text-2xl font-bold text-[#d4af37]">
              ${total.toLocaleString("es-CO")}
            </span>
          </div>

          <Link to="/checkout">
            <Button className="mt-6 w-full">
              Continuar compra
            </Button>
          </Link>

          <Link
            to="/productos"
            className="mt-4 block text-center text-sm text-gray-400 transition hover:text-[#d4af37]"
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default Cart;