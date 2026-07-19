import { useEffect, useState } from "react";
import { Flame, Clock3 } from "lucide-react";

import { getProducts } from "../../services/api";
import ProductCard from "../products/ProductCard";

function HotSale() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(
          data.filter((product) => product.stock > 0)
        );
      } catch (error) {
        console.error(
          "Error cargando productos para HotSale:",
          error
        );
      }
    };

    loadProducts();
  }, []);

  return (
    <section
      id="hot-sale"
      className="relative overflow-hidden py-24"
    >
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-2 text-[#d4af37]">
            <Flame size={22} />

            <span className="font-bold uppercase tracking-widest">
              Hot Sale
            </span>
          </div>

          <h2 className="text-4xl font-black md:text-5xl">
            Productos disponibles
          </h2>

          <p className="mt-4 text-gray-400">
            Disfruta nuestros productos y haz tu pedido.
          </p>
        </div>

        {products.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 3).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

        <div className="mt-12 flex items-center justify-center gap-3 text-sm text-gray-500">
          <Clock3 size={18} />

          Disponibilidad sujeta al inventario
        </div>
      </div>
    </section>
  );
}

export default HotSale;