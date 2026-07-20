import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { getProductStats } from "../../services/api";

function AdminDashboard() {
  const { admin } = useAuth();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response =
          await getProductStats();

        setStats(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div>
      <div className="mb-10">
        <p className="text-sm text-gray-400">
          Panel administrativo
        </p>

        <h1 className="mt-2 text-3xl font-black">
          Bienvenido, {admin?.name}
        </h1>

        <p className="mt-2 text-gray-400">
          Aquí tienes un resumen de tu negocio.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-gray-400">
          Cargando estadísticas...
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-gray-400">
              Total productos
            </p>

            <p className="mt-3 text-3xl font-black">
              {stats.total_products}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-gray-400">
              Productos activos
            </p>

            <p className="mt-3 text-3xl font-black text-green-400">
              {stats.active_products}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-gray-400">
              Stock total
            </p>

            <p className="mt-3 text-3xl font-black">
              {stats.total_stock}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-gray-400">
              Stock bajo
            </p>

            <p className="mt-3 text-3xl font-black text-red-400">
              {stats.low_stock_products}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;