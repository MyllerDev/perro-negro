import { useEffect, useState } from "react";

import Container from "../../components/ui/Container";
import ProductCard from "../../components/products/ProductCard";

import { getProducts } from "../../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        console.error(error);

        setError(
          "No fue posible cargar los productos."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <Container className="py-20">
      <div className="mb-12">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#d4af37]">
          Menú
        </p>

        <h1 className="text-4xl font-black md:text-6xl">
          Nuestros productos
        </h1>

        <p className="mt-4 max-w-2xl text-gray-400">
          Descubre los productos disponibles de Perro Negro.
        </p>
      </div>

      {loading && (
        <div className="py-20 text-center text-gray-400">
          Cargando productos...
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-center text-red-400">
          {error}
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="py-20 text-center text-gray-400">
          No hay productos disponibles.
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </Container>
  );
}

export default Products;