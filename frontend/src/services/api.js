const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export const getProducts = async () => {
  const response = await fetch(
    `${API_URL}/products`
  );

  if (!response.ok) {
    throw new Error(
      "Error obteniendo los productos"
    );
  }

  const result = await response.json();

  return result.data;
};