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
    const token =
      localStorage.getItem("adminToken");

    if (token) {
      headers.Authorization =
        `Bearer ${token}`;
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
  const response = await request(
    "/products"
  );

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

// Activar o desactivar producto
export const toggleProductStatus =
  async (id) => {
    return request(
      `/admin/products/${id}/status`,
      {
        method: "PATCH",
      },
      true
    );
  };

// Estadísticas de productos
export const getProductStats =
  async () => {
    return request(
      "/admin/products/stats",
      {},
      true
    );
  };

// Configuración de Wompi
export const getPaymentConfig =
  async () => {
    return request(
      "/payments/config"
    );
  };

// Crear pago
export const createPayment =
  async (paymentData) => {
    return request(
      "/payments/create",
      {
        method: "POST",
        body: JSON.stringify(
          paymentData
        ),
      }
    );
  };

// Crear cliente
export const createCustomer =
  async (customerData) => {
    return request(
      "/customers",
      {
        method: "POST",
        body: JSON.stringify(
          customerData
        ),
      }
    );
  };

// Crear venta
export const createSale =
  async (saleData) => {
    return request(
      "/sales",
      {
        method: "POST",
        body: JSON.stringify(
          saleData
        ),
      }
    );
  };

  export async function getPaymentStatus(
  transactionId
) {
  const response = await fetch(
    `${API_URL}/payments/${transactionId}`
  );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "No fue posible consultar el estado del pago"
    );
  }

  return data;
}

export async function updateSaleStatus(
  saleId,
  status
) {
  const response =
    await fetch(
      `${API_URL}/sales/status`,
      {
        method: "PATCH",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          saleId,
          status,
        }),
      }
    );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "No fue posible actualizar la venta"
    );
  }

  return data;
}