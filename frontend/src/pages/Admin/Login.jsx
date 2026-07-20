import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginAdmin } from "../../services/authService";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await loginAdmin(
        email,
        password
      );

      localStorage.setItem(
        "adminToken",
        data.token
      );

      localStorage.setItem(
        "admin",
        JSON.stringify(data.admin)
      );

      navigate("/admin");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <h1 className="text-3xl font-black">
          Panel administrativo
        </h1>

        <p className="mt-2 text-gray-400">
          Inicia sesión para continuar.
        </p>

        {error && (
          <div className="mt-6 rounded-lg bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Correo electrónico
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-[#d4af37]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Contraseña
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-[#d4af37]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#d4af37] px-4 py-3 font-bold text-black transition hover:opacity-90 disabled:opacity-50"
          >
            {loading
              ? "Iniciando sesión..."
              : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;