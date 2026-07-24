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
        const productsData =
          await getProducts();

        setProducts(productsData);
      } catch (error) {
        console.error(
          "Error cargando productos:",
          error
        );

        setError(
          "No fue posible cargar los productos"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <Container className="py-32 text-center">
        <p className="text-gray-400">
          Cargando productos...
        </p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-32 text-center">
        <p className="text-red-400">
          {error}
        </p>
      </Container>
    );
  }

  return (
    <Container className="py-20">
      <div className="mb-12">
        <h1 className="text-4xl font-black">
          Nuestros productos
        </h1>

        <p className="mt-3 text-gray-400">
          Descubre nuestra selección de productos.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-gray-400">
            No hay productos disponibles.
          </p>
        </div>
      ) : (
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