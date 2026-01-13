import React, { useState } from "react";
import { Product } from "../types/Product";

const ProductTable: React.FC = () => {
  // ✅ useState debe ir dentro del componente
  const [products] = useState<Product[]>([
    {
      id: 1, name: "Camiseta", costo: 100, precio: 150, stock: 10, categoria_id: 1, foto: "",
      sucursal: 0,
      estado: ""
    },
    {
      id: 2, name: "Pantalón", costo: 200, precio: 300, stock: 5, categoria_id: 1, foto: "", sucursal: 0,
      estado: ""
    },
    {
      id: 3, name: "Zapatos", costo: 350, precio: 500, stock: 8, categoria_id: 2, foto: "", sucursal: 0,
      estado: ""
    },
  ]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Lista de Productos</h1>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="py-2 px-4 border">Producto</th>
            <th className="py-2 px-4 border">Precio</th>
            <th className="py-2 px-4 border">Costo</th>
            <th className="py-2 px-4 border">Stock</th>
            <th className="py-2 px-4 border">Categoría</th>
            <th className="py-2 px-4 border">Imagen</th>
            <th className="py-2 px-4 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{p.name}</td>
              <td className="py-2 px-4">${p.precio}</td>
              <td className="py-2 px-4">${p.costo}</td>
              <td className="py-2 px-4">{p.stock}</td>
              <td className="py-2 px-4">{p.categoria_id}</td>
              <td className="py-2 px-4">
                {p.foto ? (
                  <img src={p.foto} alt={p.name} className="w-12 h-12 object-cover rounded" />
                ) : (
                  <span className="text-gray-400">Sin imagen</span>
                )}
              </td>
              <td className="py-2 px-4">
                <button type="button" className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700">Actualizar</button>&nbsp;
                <button type="button" className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700">Eliminar</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
