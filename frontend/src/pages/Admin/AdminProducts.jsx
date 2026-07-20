import ProductManagement from "../../components/admin/ProductManagement";

function AdminProducts() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm text-gray-400">
          Administración
        </p>

        <h1 className="mt-2 text-3xl font-black">
          Gestión de productos
        </h1>

        <p className="mt-2 text-gray-400">
          Administra el catálogo y el inventario de Perro Negro.
        </p>
      </div>

      <ProductManagement />
    </div>
  );
}

export default AdminProducts;