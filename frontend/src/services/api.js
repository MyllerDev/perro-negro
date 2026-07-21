const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const request = async (
  endpoint,
  options = {},
  requiresAuth = false
) => {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (requiresAuth) {
    const token = localStorage.getItem("adminToken");

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Error en la solicitud"
    );
  }

  return data;
};

// Productos públicos
export const getProducts = async () => {
  const response = await request("/products");

  return response.data;
};

// Productos del administrador
export const getAdminProducts = async () => {
  return request(
    "/admin/products",
    {},
    true
  );
};

// Crear producto
export const createProduct = async (
  product
) => {
  return request(
    "/admin/products",
    {
      method: "POST",
      body: JSON.stringify(product),
    },
    true
  );
};

// Actualizar producto
export const updateProduct = async (
  id,
  product
) => {
  return request(
    `/admin/products/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(product),
    },
    true
  );
};

// Activar/desactivar producto
export const toggleProductStatus = async (
  id
) => {
  return request(
    `/admin/products/${id}/status`,
    {
      method: "PATCH",
    },
    true
  );
};

export const getProductStats = async () => {
  return request(
    "/admin/products/stats",
    {},
    true
  );
};

