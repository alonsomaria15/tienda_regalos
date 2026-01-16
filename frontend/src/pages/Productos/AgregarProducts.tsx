import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../types/Product";

const Products: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // ⚡ id de la URL

  // Categorías
  const categorias = [
    { id: 1, nombre: "Ropa" },
    { id: 2, nombre: "Calzado" },
    { id: 3, nombre: "Accesorios" },
    { id: 4, nombre: "Regalos" },
    { id: 5, nombre: "Festividad" },
  ];

  // Lista de productos simulada
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Camiseta",
      costo: 100,
      precio: 150,
      stock: 10,
      categoria_id: 1,
      foto: "",
      sucursal: 1,
      estado: "",
      codigo_barras: "PROD-20260115-0001",
      festividad: "",
      detalles: { talla: "M", modelo: "Clásico", color: "Rojo" },
    },
    {
      id: 2,
      name: "Zapatos",
      costo: 350,
      precio: 500,
      stock: 8,
      categoria_id: 2,
      foto: "",
      sucursal: 1,
      estado: "",
      codigo_barras: "PROD-20260115-0003",
      festividad: "",
      detalles: { talla: "26", modelo: "Deportivo", color: "Negro" },
    },
  ]);

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
  });

  // Producto a editar
  const [productoEditar, setProductoEditar] = useState<Product | null>(null);
  const [selectedSucursal, setSelectedSucursal] = useState("0");

  // Modal de detalles
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [productDetails, setProductDetails] = useState({
    talla: "",
    modelo: "",
    color: "",
  });

  // ⚡ Detectar si es edición y rellenar formulario
  useEffect(() => {
    if (id) {
      const prod = products.find((p) => p.id === Number(id));
      if (prod) setProductoEditar(prod);
    } else {
      setProductoEditar(null);
      setNewProduct({
        name: "",
        costo: 0,
        precio: 0,
        stock: 0,
        categoria_id: 0,
        foto: "",
        codigo_barras: "",
        festividad: "",
      });
      setProductDetails({ talla: "", modelo: "", color: "" });
    }
  }, [id, products]);

  // ⚡ Llenar formulario cuando productoEditar cambie
  useEffect(() => {
    if (productoEditar) {
      setNewProduct({
        name: productoEditar.name,
        costo: productoEditar.costo,
        precio: productoEditar.precio,
        stock: productoEditar.stock,
        categoria_id: productoEditar.categoria_id,
        foto: productoEditar.foto,
        codigo_barras: productoEditar.codigo_barras,
        festividad: productoEditar.festividad || "",
      });

      if (productoEditar.detalles) {
        setProductDetails({
          talla: productoEditar.detalles.talla,
          modelo: productoEditar.detalles.modelo,
          color: productoEditar.detalles.color,
        });
      }
    }
  }, [productoEditar]);

  // Guardar producto
  const addProduct = () => {
    if (!newProduct.name || !newProduct.categoria_id) {
      alert("Debes ingresar el nombre y seleccionar categoría");
      return;
    }

    const productoAGuardar = { ...newProduct, detalles: productDetails };
    console.log(
      productoEditar ? "Producto actualizado:" : "Producto agregado:",
      productoAGuardar
    );

    // Resetear
    setNewProduct({
      name: "",
      costo: 0,
      precio: 0,
      stock: 0,
      categoria_id: 0,
      foto: "",
      codigo_barras: "",
      festividad: "",
    });
    setProductDetails({ talla: "", modelo: "", color: "" });
    setProductoEditar(null);
  };

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">
          {productoEditar ? "Actualizar Producto" : "Agregar Producto"}
        </h1>
        {/* Imagen + código */}
        {productoEditar && (
          <div className="flex gap-4 mb-4 items-center col-span-2">
            <div className="w-24 h-24 border rounded overflow-hidden">
              <img
                src={productoEditar.foto || "/placeholder.png"}
                alt={productoEditar.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <label className="block font-semibold mb-1">
                Código de barras
              </label>
              <input
                type="text"
                value={productoEditar.codigo_barras}
                readOnly
                className="border p-2 w-full rounded bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>
        )}
        {/* Filtrar por sucursal */}
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
        <div className="grid grid-cols-2 gap-4">
          {/* Nombre */}
          <div>
            <label className="block font-semibold">Producto</label>
            <input
              type="text"
              placeholder="Nombre del producto"
              className="border p-2 w-full rounded"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block font-semibold">Stock</label>
            <input
              type="number"
              placeholder="Stock"
              className="border p-2 w-full rounded"
              value={newProduct.stock}
              onChange={(e) =>
                setNewProduct({ ...newProduct, stock: Number(e.target.value) })
              }
            />
          </div>

          {/* Costo */}
          <div>
            <label className="block font-semibold">Costo</label>
            <input
              type="number"
              placeholder="Costo"
              className="border p-2 w-full rounded"
              value={newProduct.costo}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  costo: Number(e.target.value.replace(/[^0-9.]/g, "")),
                })
              }
            />
          </div>

          {/* Precio */}
          <div>
            <label className="block font-semibold">Precio de venta</label>
            <input
              type="number"
              placeholder="Precio"
              className="border p-2 w-full rounded"
              value={newProduct.precio}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  precio: Number(e.target.value.replace(/[^0-9.]/g, "")),
                })
              }
            />
          </div>

          {/* Categoría + Festividad */}
          <div className="col-span-2">
            <label className="block font-semibold mb-1">Categoría</label>
            <div className="flex items-center gap-2">
              <select
                className="border p-2 rounded w-64"
                value={newProduct.categoria_id}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    categoria_id: Number(e.target.value),
                  })
                }
              >
                <option value={0}>Selecciona categoría</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))}
              </select>

              {/* Botón ➕ solo en modo agregar */}
              {!productoEditar &&
                (newProduct.categoria_id === 1 ||
                  newProduct.categoria_id === 2) && (
                  <button
                    type="button"
                    onClick={() => setShowDetailsModal(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    ➕
                  </button>
                )}

              {/* Combo de festividades */}
              {newProduct.categoria_id === 5 && (
                <select
                  className="border p-2 rounded flex-grow"
                  value={newProduct.festividad || ""}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      festividad: e.target.value,
                    })
                  }
                >
                  <option value="">Selecciona festividad</option>
                  <option value="Navidad">Navidad</option>
                  <option value="San Valentín">San Valentín</option>
                  <option value="Día de las Madres">Día de las Madres</option>
                  <option value="Halloween">Halloween</option>
                  <option value="15 Septiembre">15 Septiembre</option>
                </select>
              )}
            </div>

            {/* 🔹 Tabla de detalles (solo en actualización y Ropa/Calzado) */}
            {productoEditar &&
              (newProduct.categoria_id === 1 ||
                newProduct.categoria_id === 2) && (
                <div className="mt-4">
                  <h2 className="text-lg font-bold mb-2">
                    Detalles del producto
                  </h2>
                  {productoEditar.detalles ? (
                    <table className="w-full border border-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border px-3 py-2 text-left">Talla</th>
                          <th className="border px-3 py-2 text-left">Modelo</th>
                          <th className="border px-3 py-2 text-left">Color</th>
                          <th className="border px-3 py-2 text-center">
                            Acción
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border px-3 py-2">
                            {productoEditar.detalles.talla}
                          </td>
                          <td className="border px-3 py-2">
                            {productoEditar.detalles.modelo}
                          </td>
                          <td className="border px-3 py-2">
                            {productoEditar.detalles.color}
                          </td>
                          <td className="border px-3 py-2 text-center">
                            <button
                              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                              onClick={() => {
                                setProductDetails(
                                  productoEditar.detalles ?? {
                                    talla: "",
                                    modelo: "",
                                    color: "",
                                  }
                                );
                                setShowDetailsModal(true);
                              }}
                            >
                              Actualizar
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-gray-600 italic">
                      Este producto no tiene detalles registrados.
                    </p>
                  )}
                </div>
              )}
          </div>

          {/* Imagen */}
          <div className="col-span-2 mt-4">
            <label className="block font-semibold">Imagen</label>
            <input
              type="file"
              accept="image/*"
              className="border p-2 w-full rounded"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  const imageUrl = URL.createObjectURL(file);
                  setNewProduct({ ...newProduct, foto: imageUrl });
                }
              }}
            />
            {newProduct.foto && (
              <img
                src={newProduct.foto}
                alt="Preview"
                className="w-24 h-24 object-cover mt-2 rounded"
              />
            )}
          </div>
        </div>
        {/* Botón Guardar */}
        <div className="flex justify-end mt-6">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={addProduct}
          >
            {productoEditar ? "Actualizar producto" : "Guardar producto"}
          </button>
        </div>
      </div>

      {/* Modal de Detalles */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h3 className="text-lg font-bold mb-4">Detalles del Producto</h3>

            <div className="mb-2">
              <label>Talla</label>
              <input
                type="text"
                className="border p-2 w-full"
                value={productDetails.talla}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    talla: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-2">
              <label>Modelo</label>
              <input
                type="text"
                className="border p-2 w-full"
                value={productDetails.modelo}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    modelo: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-4">
              <label>Color</label>
              <input
                type="text"
                className="border p-2 w-full"
                value={productDetails.color}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    color: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowDetailsModal(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => {
                  setProductoEditar({
                    ...productoEditar!,
                    detalles: { ...productDetails },
                  });
                  setShowDetailsModal(false);
                  alert("Detalles actualizados");
                }}
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

export default Products;
