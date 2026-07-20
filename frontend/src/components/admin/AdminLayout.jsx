import { NavLink, Outlet } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function AdminLayout() {
  const { admin, logout } = useAuth();

  const navItems = [
    {
      label: "Dashboard",
      path: "/admin",
    },
    {
      label: "Productos",
      path: "/admin/products",
    },
    {
      label: "Ventas",
      path: "/admin/sales",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-white/10 bg-[#080808] lg:block">
        <div className="flex h-full flex-col p-6">
          <div>
            <p className="text-sm text-gray-500">
              PERRO NEGRO
            </p>

            <h1 className="mt-1 text-xl font-black">
              Administración
            </h1>
          </div>

          <nav className="mt-10 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-3 transition ${
                    isActive
                      ? "bg-[#d4af37] font-bold text-black"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto border-t border-white/10 pt-6">
            <p className="mb-3 text-sm text-gray-400">
              {admin?.name}
            </p>

            <button
              onClick={logout}
              className="w-full rounded-lg border border-red-500/20 px-4 py-3 text-left text-red-400 transition hover:bg-red-500/10"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </aside>

      <main className="lg:ml-64">
        <div className="mx-auto max-w-7xl p-6 lg:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;