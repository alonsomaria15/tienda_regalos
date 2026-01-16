import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./componentes/Layout";
import Dashboard from "./pages/Dasboard";
import ProductTable from "./pages/Productos/ProductTable";
import Products from "./pages/Productos/AgregarProducts";
import BajoStock from "./pages/Productos/BajoStock";
import Movimientos from "./pages/Productos/Movimientos";
import AgregarCliente from "./pages/Clientes/AgregarClientes";
import TablaClientes from "./pages/Clientes/TablaCliente";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* ✅ Ruta principal */}
          <Route path="/" element={<Dashboard />} />
          {/* ✅ Ruta de productos */}
          <Route path="/productos" element={<ProductTable />} />
          {/* ✅ Ruta de agregar producto */}
          <Route path="/productos/agregar" element={<Products />} />
          {/* ✅ Ruta productos bajo stock */}
          <Route path="/productos/bajo-stock" element={<BajoStock />} />
          {/* ✅ Ruta movimientos */}
          <Route path="/productos/movimientos" element={<Movimientos />} />
          {/* ✅ Ruta para actualizar un producto */}
          <Route path="/producto/:id" element={<Products />} />

          {/* ✅ Ruta para agregar cliente */}
          <Route path="/clientes/nuevo" element={<AgregarCliente />} />
          {/* ✅ Ruta para mostrar Tabla Cliente */}
          <Route path="/clientes/lista" element={<TablaClientes />} />

          {/* ✅ Redirección si no existe la ruta */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}
