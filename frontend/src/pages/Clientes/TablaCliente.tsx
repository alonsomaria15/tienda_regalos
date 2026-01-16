import React, { useState } from "react";
//Librerias para excel
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
//Librerias para pdf
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Clientes } from "../../types/Clientes";

const TablaClientes: React.FC = () => {
  //Tabla clientes
  const [clientes] = useState<Clientes[]>([
    {
      id_cliente: 1,
      nombre: "Maribel",
      telefono: "72376393033",
      correo: "maribeldelaluz@hotmail.com",
      id_sucursal: 2,
    },
  ]);

  //declaramos los estados
  const [selectedSucursal, setSelectedSucursal] = useState("0");
  const [search, setSearch] = useState(""); // texto del buscador

  //Filtro sucursal
  // 🔍 Filtro combinado (Sucursal + Categoría)
  const filteredProducts = clientes.filter((p) => {
    const matchSucursal =
      selectedSucursal === "0" || p.id_sucursal.toString() === selectedSucursal;

    const matchSearch = p.nombre.toLowerCase().includes(search.toLowerCase());
    return matchSucursal && matchSearch;
  });

  //para paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  //Funcion para exportar a Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(clientes); // tus datos
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "productos.xlsx");
  };

  //export pdf
  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.text("Reporte de productos", 14, 15);

    const tableColumn = ["Producto", "Categoría", "Stock"];
    const tableRows = clientes.map((p) => [
      p.nombre,
      p.telefono,
      p.correo,
      p.id_sucursal,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      theme: "grid",
      headStyles: { fillColor: [46, 204, 113] }, // verde
      styles: { fontSize: 10 },
    });

    doc.save("productos.pdf");
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Agregar Cliente</h1>
        {/*Filtramos por sucursal*/}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            🏬 Sucursal
          </label>
          <select
            className="w-full border-gray-300 rounded-lg shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            value={selectedSucursal}
            onChange={(e) => {
              setSelectedSucursal(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="0">Todas las sucursales</option>
            <option value="1">Alberto G. 411</option>
            <option value="2">Francisco V. 104</option>
          </select>
        </div>
        &nbsp;
        {/* 🔍 Buscador + Botones de exportación */}
        <div className="flex justify-end items-center gap-2 mb-4">
          {/* Input de búsqueda */}
          <input
            type="text"
            placeholder="Buscar por código o nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)} // 🔹 cada letra actualiza el estado
            className="border border-gray-300 rounded-md px-3 py-1 w-64"
          />

          {/* Botón Exportar a Excel */}
          <button
            type="button"
            onClick={exportToExcel}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            📗 Excel
          </button>

          {/* Botón Exportar a PDF */}
          <button
            type="button"
            onClick={exportToPDF}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            📕 PDF
          </button>
        </div>
        {/*Tabla*/}
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4 border">N°</th>
              <th className="py-2 px-4 border">Nombre</th>
              <th className="py-2 px-4 border">Teléfono</th>
              <th className="py-2 px-4 border">Correo</th>
              <th className="py-2 px-4 border">Estado</th>
              <th className="py-2 px-4 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((p, index) => (
              <tr key={p.id_cliente} className="border-b hiver:bg-gray-50">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{p.nombre}</td>
                <td className="border p-2">{p.telefono}</td>
                <td className="border p-2">{p.correo}</td>
                <td className="border p-2">estado</td>
                <td className="py-2 px-4">
                  <button
                    type="button"
                    className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Actualizar
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaClientes;
