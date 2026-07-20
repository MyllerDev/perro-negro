const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export const loginAdmin = async (
  email,
  password
) => {
  const response = await fetch(
    `${API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        "Error iniciando sesión"
    );
  }

  return result.data;
};