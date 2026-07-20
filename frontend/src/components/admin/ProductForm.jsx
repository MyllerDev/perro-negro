import { useEffect, useState } from "react";

import {
  createProduct,
  updateProduct,
} from "../../services/api";

const initialForm = {
  name: "",
  description: "",
  price: "",
  stock: "",
  image_url: "",
  category: "",
  is_active: true,
};

function ProductForm({
  product,
  onSuccess,
  onCancel,
}) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        stock: product.stock ?? "",
        image_url: product.image_url || "",
        category: product.category || "",
        is_active: Boolean(product.is_active),
      });
    } else {
      setForm(initialForm);
    }
  }, [product]);

  const handleChange = (event) => {
    const { name, value, type, checked } =
      event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const productData = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      };

      if (product) {
        await updateProduct(
          product.id,
          productData
        );
      } else {
        await createProduct(productData);
      }

      onSuccess();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8 rounded-xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold">
          {product
            ? "Editar producto"
            : "Nuevo producto"}
        </h3>

        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-white"
        >
          Cerrar
        </button>
      </div>

      {error && (
        <div className="mb-5 rounded-lg bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid gap-5 md:grid-cols-2"
      >
        <div>
          <label className="mb-2 block text-sm text-gray-400">
            Nombre
          </label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-400">
            Categoría
          </label>

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-gray-400">
            Descripción
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-400">
            Precio
          </label>

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            min="0"
            required
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-400">
            Stock
          </label>

          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            min="0"
            required
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-gray-400">
            URL de imagen
          </label>

          <input
            type="url"
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none"
          />
        </div>

        {product && (
          <label className="flex items-center gap-3 text-sm text-gray-400">
            <input
              type="checkbox"
              name="is_active"
              checked={form.is_active}
              onChange={handleChange}
            />

            Producto activo
          </label>
        )}

        <div className="flex gap-3 md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-[#d4af37] px-5 py-3 font-bold text-black disabled:opacity-50"
          >
            {loading
              ? "Guardando..."
              : product
                ? "Guardar cambios"
                : "Crear producto"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-white/10 px-5 py-3"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;