import React, { useState } from "react";
import { Product } from "../../types/Product";

const Products: React.FC = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Mes actual por defecto (1-12)

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

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const [movimientos, setMovimientos] = useState([
    {
      id: 1,
      codigo: "PROD-20260115-0001",
      producto: "Camiseta",
      cantidad: 5,
      fecha: "2026-01-15",
      tipo: "Entrada",
      origen: "Proveedor",
      destino: "Almacén",
      concepto: "Compra inicial",
    },
    {
      id: 2,
      codigo: "PROD-20260115-0001",
      producto: "Camiseta",
      cantidad: 2,
      fecha: "2026-01-16",
      tipo: "Salida",
      origen: "Almacén",
      destino: "Cliente",
      concepto: "Venta online",
    },
  ]);

  // Diccionario de sucursales
  const sucursales = [
    { id: 1, nombre: "Alberto G. 411" },
    { id: 2, nombre: "Francisco V. 104" },
  ];

  const tipoMovimiento = [
    { id: 1, nombre: "Entrada" },
    { id: 2, nombre: "Salida" },
    { id: 3, nombre: "Ajuste" },
    { id: 2, nombre: "Traspaso" },
  ];

  // Estado del producto (para el formulario)
  const [newProduct, setNewProduct] = useState({
    name: "",
    costo: 0,
    precio: 0,
    stock: 0,
    categoria_id: 0,
    foto: "",
    codigo_barras: "",
    festividad: "",
    sucursal: 0,
    tipoMovimiento: 0,
  });

  // Modal de imagen
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  // Modal
  const [registrarMovimiento, setRegistrarMovimiento] = useState(false);
  const [traspaso, setTraspaso] = useState(false);
  const [selectedSucursal, setSelectedSucursal] = useState("0");
  const [search, setSearch] = useState(""); // texto del buscador
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
            <select
              className="border p-2 rounded"
              value={newProduct.sucursal}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  sucursal: Number(e.target.value),
                })
              }
            >
              <option value={0}>Selecciona una Sucursal</option>
              {sucursales.map((suc) => (
                <option key={suc.id} value={suc.id}>
                  {suc.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Tipo Movimiento</label>
            <select
              className="border p-2 rounded"
              value={newProduct.tipoMovimiento}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  tipoMovimiento: Number(e.target.value),
                })
              }
            >
              <option value={0}>Selecciona una Sucursal</option>
              {tipoMovimiento.map((mov) => (
                <option key={mov.id} value={mov.id}>
                  {mov.nombre}
                </option>
              ))}
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
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => setRegistrarMovimiento(true)}
          >
            + Registrar Movimiento
          </button>

          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => setTraspaso(true)}
          >
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

      {/*Tabla */}
      <table className="w-full border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-200 text-letf">
            <th className="py-2 px-4 border">Código</th>
            <th className="py-2 px-4 border">Producto</th>
            <th className="py-2 px-4 border">Cantidad</th>
            <th className="py-2 px-4 border">Fecha</th>
            <th className="py-2 px-4 border">Tipo</th>
            <th className="py-2 px-4 border">Origen</th>
            <th className="py-2 px-4 border">Destino</th>
            <th className="py-2 px-4 border">Concepto</th>
          </tr>
        </thead>
        <tbody>
          {movimientos.map((m) => (
            <tr key={m.id}>
              <td className="border p-2">{m.codigo}</td>
              <td className="border p-2">{m.producto}</td>
              <td className="border p-2">{m.cantidad}</td>
              <td className="border p-2">{m.fecha}</td>
              <td className="border p-2">{m.tipo}</td>
              <td className="border p-2">{m.origen}</td>
              <td className="border p-2">{m.destino}</td>
              <td className="border p-2">{m.concepto}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/*Modal Registrar MOvimiento */}
      {registrarMovimiento && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h3 className="text-lg font-bold mb-4">Detalles del Producto</h3>
            <div className="mb-2">
              <label className="block font-semibold mb-1">Tipo</label>
              <select className="border p-2 rounded">
                <option value="">Selecciona un tipo</option>
                <option value="entrada">Entrada</option>
                <option value="salida">Salida</option>
                <option value="ajuste">Ajuste</option>
                <option value="traspaso">Traspaso</option>
              </select>
            </div>

            <div className="mb-2">
              <label>Producto</label>
              {/* Input de búsqueda */}
              <input
                type="text"
                placeholder="Buscar por código o nombre..."
                value={search}
                onChange={(e) => setSearch(e.target.value)} // 🔹 cada letra actualiza el estado
                className="border border-gray-300 rounded-md px-3 py-1 w-64"
              />
            </div>
            <div className="mb-2">
              <label>Cantidad</label>
              <input
                type="text"
                placeholder="Buscar por código o nombre..."
                className="border border-gray-300 rounded-md px-3 py-1 w-64"
              />
            </div>
            <div className="mb-2">
              <label>Sucursal</label>
              <select className="border p-2 rounded">
                <option value="0">Selecciona un tipo</option>
                <option value="1">Alberto Garcia</option>
                <option value="2">Francisco Villa</option>
              </select>
            </div>
            <div className="mb-2">
              <label>Cantidad Agregar</label>
              <input
                type="text"
                placeholder="Nombre del producto"
                className="border p-2 w-full rounded"
              />
            </div>
            <div className="mb-2">
              <label>Concepto</label>
              <input
                type="text"
                placeholder="Nombre del producto"
                className="border p-2 w-full rounded"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setRegistrarMovimiento(false)}
              >
                Cancelar
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded">
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
      {/*Modal Traspaso */}
      {traspaso && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h3 className="text-lg font-bold mb-4">Traspaso</h3>
            <div className="mb-2">
              <label className="block font-semibold mb-1">Tipo</label>
              <select className="border p-2 rounded">
                <option value="">Selecciona un tipo</option>
                <option value="entrada">Entrada</option>
                <option value="salida">Salida</option>
                <option value="ajuste">Ajuste</option>
                <option value="traspaso">Traspaso</option>
              </select>
            </div>

            <div className="mb-2">
              <label>Producto</label>
              {/* Input de búsqueda */}
              <input
                type="text"
                placeholder="Buscar por código o nombre..."
                value={search}
                onChange={(e) => setSearch(e.target.value)} // 🔹 cada letra actualiza el estado
                className="border border-gray-300 rounded-md px-3 py-1 w-64"
              />
            </div>
            <div className="mb-2">
              <label>Cantidad</label>
              <input
                type="text"
                placeholder="Buscar por código o nombre..."
                className="border border-gray-300 rounded-md px-3 py-1 w-64"
              />
            </div>
            <div className="mb-2">
              <label>Sucursal</label>
              <select className="border p-2 rounded">
                <option value="0">Selecciona un tipo</option>
                <option value="1">Alberto Garcia</option>
                <option value="2">Francisco Villa</option>
              </select>
            </div>
            <div className="mb-2">
              <label>Cantidad Agregar</label>
              <input
                type="text"
                placeholder="Nombre del producto"
                className="border p-2 w-full rounded"
              />
            </div>
            <div className="mb-2">
              <label>Concepto</label>
              <input
                type="text"
                placeholder="Nombre del producto"
                className="border p-2 w-full rounded"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setTraspaso(false)}
              >
                Cancelar
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded">
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
