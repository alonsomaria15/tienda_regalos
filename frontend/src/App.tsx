import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./componentes/Layout";
import Dashboard from "./pages/Dasboard";
import ProductTable from "./pages/ProductTable";
import Products from "./pages/AgregarProducts";
import BajoStock from "./pages/BajoStock";
import Movimientos from "./pages/Movimientos";

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
          {/* ✅ Redirección si no existe la ruta */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}
