import { useEffect, useState } from "react";

import { getAdminProducts, toggleProductStatus } from "../../services/api";
import ProductForm from "./ProductForm";

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminProducts();

      setProducts(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleFormSuccess = async () => {
    setShowForm(false);
    setSelectedProduct(null);

    await loadProducts();
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleToggleStatus = async (productId) => {
    try {
      await toggleProductStatus(productId);

      await loadProducts();
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <p className="text-gray-400">Cargando productos...</p>;
  }

  return (
    <section className="mt-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">Inventario</p>

          <h2 className="text-2xl font-bold">Productos</h2>
        </div>

        <button
          onClick={handleCreate}
          className="rounded-lg bg-[#d4af37] px-4 py-2 font-bold text-black"
        >
          Nuevo producto
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      )}

      {showForm && (
        <ProductForm
          product={selectedProduct}
          onSuccess={handleFormSuccess}
          onCancel={handleCancelForm}
        />
      )}

      <div className="overflow-hidden rounded-xl border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-white/10 bg-white/[0.03]">
              <tr>
                <th className="px-6 py-4">Producto</th>

                <th className="px-6 py-4">Categoría</th>

                <th className="px-6 py-4">Precio</th>

                <th className="px-6 py-4">Stock</th>

                <th className="px-6 py-4">Estado</th>

                <th className="px-6 py-4">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-white/5">
                  <td className="px-6 py-4">
                    <p className="font-semibold">{product.name}</p>

                    <p className="text-sm text-gray-500">ID: {product.id}</p>
                  </td>

                  <td className="px-6 py-4 text-gray-400">
                    {product.category || "-"}
                  </td>

                  <td className="px-6 py-4">
                    ${Number(product.price).toLocaleString("es-CO")}
                  </td>

                  <td className="px-6 py-4">{product.stock}</td>

                  <td className="px-6 py-4">
                    <span
                      className={
                        product.is_active ? "text-green-400" : "text-red-400"
                      }
                    >
                      {product.is_active ? "Activo" : "Inactivo"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="rounded-md border border-white/10 px-3 py-2 text-sm"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => handleToggleStatus(product.id)}
                        className="rounded-md border border-white/10 px-3 py-2 text-sm"
                      >
                        {product.is_active ? "Desactivar" : "Activar"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default ProductManagement;
