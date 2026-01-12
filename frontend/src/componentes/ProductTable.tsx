import React from "react";
import { Product } from "../types/Product";

// Definir los props del componente
interface ProductTableProps {
  products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-200">
    <th className="py-2 px-4 border">Producto</th>
    <th className="py-2 px-4 border">Precio</th>
    <th className="py-2 px-4 border">Costo</th>
    <th className="py-2 px-4 border">Stock</th>
    <th className="py-2 px-4 border">Categoría</th>
    <th className="py-2 px-4 border">Ocasión</th>
    <th className="py-2 px-4 border">Detalles</th>
    <th className="py-2 px-4 border">Imagen</th>
  </tr>
       
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id} className="border-b hover:bg-gray-50">
            <td className="py-2 px-4">{p.name}</td>
            <td className="py-2 px-4">${p.precio}</td>
            <td className="py-2 px-4">{p.stock}</td>
            <td className="py-2 px-4">{p.categoria_id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
