import React, { useState } from "react";

const Products: React.FC = () => {
 const [month, setMonth] = useState(new Date().getMonth() + 1); // Mes actual por defecto (1-12)

  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  // Diccionario de sucursales
  const sucursales: { [key: number]: string } = {
    1: "Alberto G. 411",
    2: "Francisco V. 104",
  };

  const [selectedSucursal, setSelectedSucursal] = useState("0");
  // 📄 Paginación
   // const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    //const indexOfLastItem = currentPage * itemsPerPage;
   // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    //const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    //const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Movimientos de Inventario
      </h1>

      {/* Panel de acciones y filtros */}
      <div className="flex flex-wrap justify-between items-end gap-4 mb-4">
        {/* Filtros */}
        <div className="flex flex-wrap gap-4">
              <div>
      <label className="block font-semibold mb-1">Mes</label>
      <select
        className="border p-2 rounded"
        value={month}
        onChange={(e) => setMonth(Number(e.target.value))}
      >
        <option value={0}>Todos los meses</option>
        {months.map((m, i) => (
          <option key={i} value={i + 1}>
            {m}
          </option>
        ))}
      </select>
    </div>

          <div>
            <label className="block font-semibold mb-1">Sucursales</label>
            <select className="border p-2 rounded" value={sucursales} >
            </select>
          </div>
        </div>

        {/* Botones de acción y buscador */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Input de búsqueda */}
          <input
            type="text"
            placeholder="Buscar por código o nombre..."
            className="border border-gray-300 rounded-md px-3 py-1 w-64"
          />

          {/* Botones de acción */}
          <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            + Registrar Movimiento
          </button>

          <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            🔁 Registrar Traspaso
          </button>

          {/* Exportación */}
          <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
            📗 Excel
          </button>
          <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
            📕 PDF
          </button>
        </div>
      </div>
       

    </div>
  );
};

export default Products;
