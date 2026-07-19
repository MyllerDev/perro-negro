import { ShoppingCart } from "lucide-react";

import Button from "../ui/Button";

import { useCart } from "../../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const isAvailable = product.stock > 0;

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:-translate-y-1 hover:border-[#d4af37]/40">
      <div className="aspect-square overflow-hidden bg-white/5">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            Sin imagen
          </div>
        )}
      </div>

      <div className="p-5">
        <p className="mb-2 text-xs uppercase tracking-widest text-[#d4af37]">
          {product.category}
        </p>

        <h2 className="text-xl font-bold">
          {product.name}
        </h2>

        <p className="mt-2 min-h-12 text-sm text-gray-400">
          {product.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-xl font-bold text-[#d4af37]">
            ${Number(product.price).toLocaleString("es-CO")}
          </span>

          <span className="text-xs text-gray-500">
            {isAvailable
              ? `${product.stock} disponibles`
              : "Agotado"}
          </span>
        </div>

        <Button
          disabled={!isAvailable}
          onClick={() => addToCart(product)}
          className="mt-5 flex w-full items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />

          {isAvailable
            ? "Agregar al carrito"
            : "Agotado"}
        </Button>
      </div>
    </article>
  );
}

export default ProductCard;