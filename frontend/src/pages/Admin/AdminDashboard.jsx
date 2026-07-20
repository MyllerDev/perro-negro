import { useAuth } from "../../context/AuthContext";
import ProductManagement from "../../components/admin/ProductManagement";

function AdminDashboard() {
  const { admin, logout } = useAuth();

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
        
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">
              Panel administrativo
            </p>

            <h1 className="mt-2 text-3xl font-black">
              Bienvenido, {admin?.name}
            </h1>
          </div>

          <button
            onClick={logout}
            className="rounded-lg border border-red-500/30 px-4 py-2 text-red-400 transition hover:bg-red-500/10"
          >
            Cerrar sesión
          </button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-gray-400">
              Ventas
            </p>

            <p className="mt-3 text-3xl font-bold">
              0
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-gray-400">
              Productos
            </p>

            <p className="mt-3 text-3xl font-bold">
              0
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-gray-400">
              Clientes
            </p>

            <p className="mt-3 text-3xl font-bold">
              0
            </p>
          </div>
        </div>
         <ProductManagement />
      </div>
      
    </main>
  );
}

export default AdminDashboard;