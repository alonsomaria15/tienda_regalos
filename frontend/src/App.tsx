import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./componentes/Layout";
import Products from "./pages/Products"; // <-- importa tu página

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/productos" element={<Products />} />
          <Route path="*" element={<Products />} /> {/* Ruta por defecto */}
        </Routes>
      </Layout>
    </Router>
  );
}
