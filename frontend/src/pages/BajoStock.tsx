import React, { useState } from "react";
import { Product } from "../types/Product";

const BajoStock: React.FC = () => {
  const [products] = useState<Product[]>([
    { id: 1, name: "Camiseta", categoria_id: 2, sucursal: 1, stock: 3, estado: "Bajo", costo: 0, precio: 0, foto: "" },
    { id: 2, name: "Pantalón", categoria_id: 1, sucursal: 1, stock: 2, estado: "Bajo", costo: 0, precio: 0, foto: "" },
    { id: 3, name: "Zapatos", categoria_id: 3, sucursal: 2, stock: 1, estado: "Bajo", costo: 0, precio: 0, foto: "" },
    { id: 4, name: "Sombrero", categoria_id: 4, sucursal: 2, stock: 5, estado: "Bajo", costo: 0, precio: 0, foto: "" },
    { id: 5, name: "Bufanda", categoria_id: 1, sucursal: 1, stock: 2, estado: "Bajo", costo: 0, precio: 0, foto: "" },
  ]);

  // Sucursales
  const sucursales: { [key: number]: string } = {
    1: "Alberto G. 411",
    2: "Francisco V. 104",
  };

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Filtrado por sucursal
  const [selectedSucursal, setSelectedSucursal] = useState("0");
  const filteredProducts = selectedSucursal === "0"
    ? products
    : products.filter(p => p.sucursal.toString() === selectedSucursal);

//Agregar stock de los productos
const [showStockModal,setAgregarStock] = useState(false);

  // Paginación de productos
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">⚠️ Productos con stock bajo</h1>

      {/* Filtrar por sucursal */}
      <div className="flex flex-col mb-4">
        <label className="block font-semibold mb-1">Sucursal</label>
        <select
          className="border p-2 w-64 rounded"
          value={selectedSucursal}
          onChange={(e) => {
            setSelectedSucursal(e.target.value);
            setCurrentPage(1); // reinicia a la página 1 al cambiar sucursal
          }}
        >
          <option value="0">Todas las sucursales</option>
          <option value="1">Alberto G. 411</option>
          <option value="2">Francisco V. 104</option>
        </select>
      </div>

      {/* Tabla */}
      <table className="w-full border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-200 text-left">
             <th className="py-2 px-4 border">Producto</th>
                <th className="py-2 px-4 border">Detalles</th>
                <th className="py-2 px-4 border">Categoría</th>
                <th className="py-2 px-4 border">Sucursal</th>
                <th className="py-2 px-4 border">Stock</th>
                <th className="py-2 px-4 border">Estado</th>
                <th className="py-2 px-4 border">Acción</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{p.name}</td>
                <td className="py-2 px-4">{p.detalles?.talla}{p.detalles?.modelo}{p.detalles?.color}{p.precio}</td>
              <td className="py-2 px-4">{p.categoria_id}</td>
              <td className="py-2 px-4">{sucursales[p.sucursal]}</td>
              <td className="py-2 px-4">{p.stock}</td>
              <td className="py-2 px-4">{p.estado}</td>
              <td className="py-2 px-4">
                <button type="button" onClick={() => setAgregarStock(true)} className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700">+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex gap-2">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : ""}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>

      {/* Contador */}
      <div className="mt-4">
        <span className="bg-red-100 text-red-700 font-semibold px-3 py-1 rounded">
          Mostrando {filteredProducts.length} productos con Stock bajo
        </span>
      </div>

        {/*Modal Agregar Stock*/}
        {showStockModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h3 className="text-lg font-bold mb-4">Detalles del Producto</h3>

            <div className="mb-2">
              <label>Producto <b>Sandalias Tiburon</b></label>
            </div>

            <div className="mb-2">
              <label>Modelo <b>Tiburon</b></label>
            </div>

            <div className="mb-2">
              <label>Talla <b>24</b></label>
            </div>
            <div className="mb-2">
              <label>Sucursal <b>1</b></label>
            </div>

              <div className="mb-2">
              <label>Cantidad Agregar</label>
              <input
              type="text"
              placeholder="Nombre del producto"
              className="border p-2 w-full rounded"></input>
            </div>



            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setAgregarStock(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => setAgregarStock(false)}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
        )}
    </div>
  );
};

export default BajoStock;
