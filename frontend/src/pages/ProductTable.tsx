import React, { useState } from "react";
import { Product } from "../types/Product";
import { useNavigate } from "react-router-dom";
//Librerias para excel
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
//Librerias para pdf
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ProductTable: React.FC = () => {
  const navigate = useNavigate(); //nos ayuda a cambiar de pagina
  const [search, setSearch] = useState(""); // texto del buscador
  const [productoEditar, setProductoEditar] = useState<Product | null>(null);
  // ✅ useState debe ir dentro del componente
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Camiseta",
      categoria_id: 2,
      sucursal: 1,
      stock: 3,
      estado: "Bajo",
      costo: 0,
      precio: 0,
      foto: "https://media.istockphoto.com/id/483960103/es/foto/camiseta-negra-frontal-en-blanco-con-trazado-de-recorte.jpg?s=612x612&w=0&k=20&c=WTtkplvVBMxKTStHvG6rzKlw1G246bJ5apgJcNiFT_Q=",
      codigo_barras: "PROD-20260115-0001",
      detalles: { color: "Azul", talla: "M", modelo: "tiburon" },
      festividad: "",
    },
    {
      id: 2,
      name: "Pantalón",
      categoria_id: 1,
      sucursal: 1,
      stock: 2,
      estado: "Bajo",
      costo: 0,
      precio: 0,
      foto: "https://m.media-amazon.com/images/I/71UHzx+7SKL._AC_SX679_.jpg",
      codigo_barras: "PROD-20260115-0002",
      detalles: {
        color: "Negro",
        talla: "L",
        modelo: "",
      },
      festividad: "",
    },
    {
      id: 3,
      name: "Zapatos",
      categoria_id: 3,
      sucursal: 2,
      stock: 1,
      estado: "Bajo",
      costo: 0,
      precio: 0,
      foto: "",
      codigo_barras: "PROD-20260115-0003",
      detalles: {
        color: "Negro",
        talla: "42",
        modelo: "",
      },
      festividad: "",
    },
    {
      id: 4,
      name: "Sombrero",
      categoria_id: 4,
      sucursal: 2,
      stock: 5,
      estado: "Bajo",
      costo: 0,
      precio: 0,
      foto: "",
      codigo_barras: "PROD-20260115-0004",
      detalles: {
        color: "Beige",
        talla: "",
        modelo: "",
      },
      festividad: "",
    },
    {
      id: 5,
      name: "Bufanda",
      categoria_id: 1,
      sucursal: 1,
      stock: 2,
      estado: "Bajo",
      costo: 0,
      precio: 0,
      foto: "",
      codigo_barras: "PROD-20260115-0005",
      detalles: {
        color: "Rojo",
        talla: "",
        modelo: "",
      },
      festividad: "",
    },
  ]);

  // Modal de imagen
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  // Sucursales
  const sucursales: { [key: number]: string } = {
    1: "Alberto G. 411",
    2: "Francisco V. 104",
  };

  // Filtros
  const [selectedSucursal, setSelectedSucursal] = useState("0");
  const [selectedCategoria, setSelectedCategoria] = useState("0");
  const [selectedFestividad, setSelectedFestividad] = useState("0");

  // 🔍 Filtro combinado (Sucursal + Categoría)
  const filteredProducts = products.filter((p) => {
    const matchSucursal =
      selectedSucursal === "0" || p.sucursal.toString() === selectedSucursal;

    const matchCategoria =
      selectedCategoria === "0" ||
      p.categoria_id.toString() === selectedCategoria;

    const matchFestividad =
      selectedFestividad === "0" ||
      p.festividad.toString() === selectedFestividad;

    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) || // 🔹 busca por nombre
      p.codigo_barras.toLowerCase().includes(search.toLowerCase()); // 🔹 busca por código

    return matchSucursal && matchCategoria && matchSearch && matchFestividad;
  });

  // 📄 Paginación
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
    const worksheet = XLSX.utils.json_to_sheet(products); // tus datos
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
    const tableRows = products.map((p) => [p.name, p.categoria_id, p.stock]);

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
    <div className="bg-white shadow-md rounded-lg p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Lista de Productos
      </h1>

      {/* Filtros */}
      <div className="flex gap-4 mb-4">
        {/* Filtrar por sucursal */}
        <div>
          <label className="block font-semibold mb-1">Sucursal</label>
          <select
            className="border p-2 rounded"
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

        {/* Filtrar por categoría */}
        <div>
          <label className="block font-semibold mb-1">Categoría</label>
          <select
            value={selectedCategoria}
            onChange={(e) => {
              setSelectedCategoria(e.target.value);
              setCurrentPage(1);
            }}
            className="border p-2 rounded"
          >
            <option value="0">Todas las categorías</option>
            <option value="1">Ropa</option>
            <option value="2">Calzado</option>
            <option value="3">Accesorios</option>
            <option value="4">Sombreros</option>
          </select>
        </div>

        {/* Filtrar por festividades */}
        <div>
          <label className="block font-semibold mb-1">Festividades</label>
          <select
            value={selectedFestividad}
            onChange={(e) => {
              setSelectedFestividad(e.target.value);
              setCurrentPage(1);
            }}
            className="border p-2 rounded"
          >
            <option value="0">Todas las festividades</option>
            <option value="1">15 Septiembre</option>
            <option value="2">Hallowen</option>
            <option value="3">Navidad</option>
          </select>
        </div>
      </div>

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

      {/* Tabla */}
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="py-2 px-4 border">Producto</th>
            <th className="py-2 px-4 border">Detalles</th>
            <th className="py-2 px-4 border">Costo/Precio Venta</th>
            <th className="py-2 px-4 border">Stock</th>
            <th className="py-2 px-4 border">Sucursal</th>
            <th className="py-2 px-4 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="border p-2 flex items-center gap-2">
                <img
                  src={p.foto}
                  alt={`${p.name} - ${p.codigo_barras}`}
                  className="w-8 h-8 object-cover rounded cursor-pointer"
                  onClick={() => setZoomImage(p.foto)}
                />
                <div className="flex flex-col">
                  <span className="font-medium">{p.name}</span>
                  <span className="text-gray-500 text-sm">
                    {p.codigo_barras}
                  </span>
                </div>
              </td>

              <td className="border p-2">
                {p.detalles ? (
                  <div className="flex flex-col">
                    {p.detalles.color && <span>Color: {p.detalles.color}</span>}
                    {p.detalles.talla && <span>Talla: {p.detalles.talla}</span>}
                    {p.detalles.modelo && (
                      <span>Modelo: {p.detalles.modelo}</span>
                    )}
                  </div>
                ) : (
                  "-"
                )}
              </td>
              <td className="py-2 px-4">
                ${p.costo} / ${p.precio}
              </td>

              <td className="py-2 px-4">{p.stock}</td>
              <td className="py-2 px-4">{p.sucursal}</td>
              <td className="py-2 px-4">
                <button
                  type="button"
                  className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  onClick={() => navigate(`/producto/${p.id}`)} // ⚡ enviamos el id del producto
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

      {/* Paginación + contador */}
      <div className="flex items-center justify-center gap-4 mt-4">
        {/* Contador de productos */}
        <div className="text-gray-700 mb-2">
          Mostrando {indexOfFirstItem + 1} -{" "}
          {Math.min(indexOfLastItem, filteredProducts.length)} de{" "}
          {filteredProducts.length} productos
        </div>

        {/* Botones de paginación */}
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
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
        {/* Modal Imagen */}
        {zoomImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
            onClick={() => setZoomImage(null)}
          >
            <img
              src={zoomImage}
              alt="Producto"
              className="max-w-[90%] max-h-[90%] object-contain rounded shadow-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTable;
