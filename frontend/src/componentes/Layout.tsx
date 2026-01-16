import React, { useState, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const location = useLocation();

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // Función para verificar si una ruta está activa
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-5 flex flex-col">
        <h2 className="text-2xl font-bold mb-8 text-center">
          🎁 Tienda Regalos
        </h2>

        <nav className="flex flex-col gap-2">
          {/* Dashboard */}
          <Link
            to="/"
            className={`px-3 py-2 rounded flex items-center gap-2 transition ${
              isActive("/")
                ? "bg-gray-700 text-yellow-300"
                : "hover:bg-gray-700"
            }`}
          >
            🏠 <span>Dashboard</span>
          </Link>

          {/* ========= PRODUCTOS ========= */}
          <button
            onClick={() => toggleMenu("productos")}
            className={`flex justify-between items-center px-3 py-2 rounded w-full text-left transition ${
              openMenu === "productos"
                ? "bg-gray-700 text-yellow-300"
                : "hover:bg-gray-700"
            }`}
          >
            <span>📦 Productos</span>
            <span
              className={`transition-transform duration-300 ${
                openMenu === "productos" ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>
          <div
            className={`ml-6 flex flex-col gap-1 overflow-hidden transition-all duration-300 ${
              openMenu === "productos"
                ? "max-h-60 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <Link
              to="/productos"
              className="hover:bg-gray-700 px-3 py-1 rounded"
            >
              📋 Lista
            </Link>
            <Link
              to="/productos/agregar"
              className="hover:bg-gray-700 px-3 py-1 rounded"
            >
              ➕ Agregar
            </Link>
            <Link
              to="/productos/bajo-stock"
              className="hover:bg-gray-700 px-3 py-1 rounded"
            >
              ⚠️ Bajo stock
            </Link>
            <Link
              to="/productos/movimientos"
              className="hover:bg-gray-700 px-3 py-1 rounded"
            >
              🔁 Movimientos
            </Link>
          </div>

          {/* ========= VENTAS ========= */}
          <button
            onClick={() => toggleMenu("ventas")}
            className={`flex justify-between items-center px-3 py-2 rounded w-full text-left transition ${
              openMenu === "ventas"
                ? "bg-gray-700 text-yellow-300"
                : "hover:bg-gray-700"
            }`}
          >
            <span>💸 Ventas</span>
            <span
              className={`transition-transform duration-300 ${
                openMenu === "ventas" ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>
          <div
            className={`ml-6 flex flex-col gap-1 overflow-hidden transition-all duration-300 ${
              openMenu === "ventas"
                ? "max-h-40 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <Link
              to="/ventas/nueva"
              className="hover:bg-gray-700 px-3 py-1 rounded"
            >
              🧾 Registrar
            </Link>
            <Link
              to="/ventas/historial"
              className="hover:bg-gray-700 px-3 py-1 rounded"
            >
              📜 Historial
            </Link>
            <Link
              to="/ventas/pendientes"
              className="hover:bg-gray-700 px-3 py-1 rounded"
            >
              ⏳ Pendientes
            </Link>
          </div>

          {/* ========= ABONOS ========= */}
          <button
            onClick={() => toggleMenu("abonos")}
            className={`flex justify-between items-center px-3 py-2 rounded w-full text-left transition ${
              openMenu === "abonos"
                ? "bg-gray-700 text-yellow-300"
                : "hover:bg-gray-700"
            }`}
          >
            <span>💳 Abonos</span>
            <span
              className={`transition-transform duration-300 ${
                openMenu === "abonos" ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>
          <div
            className={`ml-6 flex flex-col gap-1 overflow-hidden transition-all duration-300 ${
              openMenu === "abonos"
                ? "max-h-24 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <Link
              to="/abonos/nuevo"
              className="hover:bg-gray-700 px-3 py-1 rounded"
            >
              ➕ Registrar
            </Link>
            <Link
              to="/abonos/historial"
              className="hover:bg-gray-700 px-3 py-1 rounded"
            >
              📋 Historial
            </Link>
          </div>

          {/* ========= CLIENTES ========= */}
          <button
            onClick={() => toggleMenu("clientes")}
            className={`flex justify-between items-center px-3 py-2 rounded w-full text-left transition ${
              openMenu === "clientes"
                ? "bg-gray-700 text-yellow-300"
                : "hover:bg-gray-700"
            }`}
          >
            <span>💳 Clientes</span>
            <span
              className={`transition-transform duration-300 ${
                openMenu === "clientes" ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>
          <div
            className={`ml-6 flex flex-col gap-1 overflow-hidden transition-all duration-300 ${
              openMenu === "clientes"
                ? "max-h-24 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <Link
              to="/clientes/nuevo"
              className="hover:bg-gray-700 px-3 py-1 rounded"
            >
              ➕ Registrar
            </Link>
            <Link
              to="/clientes/lista"
              className="hover:bg-gray-700 px-3 py-1 rounded"
            >
              📋 Lista
            </Link>
          </div>

          {/* ========= CAJA ========= */}
          <button
            onClick={() => toggleMenu("caja")}
            className={`flex justify-between items-center px-3 py-2 rounded w-full text-left transition ${
              openMenu === "caja"
                ? "bg-gray-700 text-yellow-300"
                : "hover:bg-gray-700"
            }`}
          >
            <span>💰 Caja / Finanzas</span>
            <span
              className={`transition-transform duration-300 ${
                openMenu === "caja" ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>
          <div
            className={`ml-6 flex flex-col gap-1 overflow-hidden transition-all duration-300 ${
              openMenu === "caja" ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <Link
              to="/caja/entradas"
              className="hover:bg-gray-700 px-3 py-1 rounded"
            >
              💵 Entradas
            </Link>
            <Link
              to="/caja/salidas"
              className="hover:bg-gray-700 px-3 py-1 rounded"
            >
              💸 Salidas
            </Link>
            <Link
              to="/caja/reporte"
              className="hover:bg-gray-700 px-3 py-1 rounded"
            >
              📊 Reporte
            </Link>
          </div>

          {/* ========= REPORTES ========= */}
          <button
            onClick={() => toggleMenu("reportes")}
            className={`flex justify-between items-center px-3 py-2 rounded w-full text-left transition ${
              openMenu === "reportes"
                ? "bg-gray-700 text-yellow-300"
                : "hover:bg-gray-700"
            }`}
          >
            <span>📈 Reportes</span>
            <span
              className={`transition-transform duration-300 ${
                openMenu === "reportes" ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>
          <div
            className={`ml-6 flex flex-col gap-1 overflow-hidden transition-all duration-300 ${
              openMenu === "reportes"
                ? "max-h-40 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <Link
              to="/reportes/ventas"
              className="hover:bg-gray-700 px-3 py-1 rounded"
            >
              🧾 Ventas
            </Link>
            <Link
              to="/reportes/productos"
              className="hover:bg-gray-700 px-3 py-1 rounded"
            >
              📦 Productos
            </Link>
            <Link
              to="/reportes/abonos"
              className="hover:bg-gray-700 px-3 py-1 rounded"
            >
              💳 Abonos
            </Link>
            <Link
              to="/reportes/caja"
              className="hover:bg-gray-700 px-3 py-1 rounded"
            >
              💰 Caja
            </Link>
          </div>
        </nav>
      </div>

      {/* Contenido derecho */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">{children}</div>
    </div>
  );
};

export default Layout;
