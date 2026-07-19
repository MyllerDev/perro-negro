import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";

import { useCart } from "../../context/CartContext";
import { business } from "../../constants/business";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#111111]/85 backdrop-blur-xl">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={business.logo}
            alt={business.name}
            className="h-14 w-14 rounded-full object-cover"
          />

          <span className="hidden text-xl font-black tracking-[0.15em] text-[#d4af37] sm:block">
            PERRO NEGRO
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm text-gray-300 transition hover:text-[#d4af37]"
          >
            Inicio
          </Link>

          <Link
            to="/productos"
            className="text-sm text-gray-300 transition hover:text-[#d4af37]"
          >
            Productos
          </Link>

          <Link
            to="/contacto"
            className="text-sm text-gray-300 transition hover:text-[#d4af37]"
          >
            Contacto
          </Link>

          <Link
            to="/carrito"
            className="relative flex items-center gap-2 text-gray-300 transition hover:text-[#d4af37]"
          >
            <ShoppingCart size={20} />

            {totalItems > 0 && (
              <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d4af37] px-1 text-xs font-bold text-black">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-white md:hidden"
          aria-label="Abrir menú"
        >
          {open ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/[0.08] bg-[#111111] px-6 pb-6 pt-5 md:hidden">
          <div className="flex flex-col gap-5">
            <Link to="/" onClick={() => setOpen(false)}>
              Inicio
            </Link>

            <Link
              to="/productos"
              onClick={() => setOpen(false)}
            >
              Productos
            </Link>

            <Link
              to="/contacto"
              onClick={() => setOpen(false)}
            >
              Contacto
            </Link>

            <Link
              to="/carrito"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2"
            >
              <ShoppingCart size={20} />

              Carrito

              {totalItems > 0 && (
                <span className="rounded-full bg-[#d4af37] px-2 py-1 text-xs font-bold text-black">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;