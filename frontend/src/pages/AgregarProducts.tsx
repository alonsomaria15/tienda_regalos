import React, { useState } from "react";

const Products: React.FC = () => {
  // Categorías
  const categorias = [
    { id: 1, nombre: "Ropa" },
    { id: 2, nombre: "Calzado" },
    { id: 3, nombre: "Accesorios" },
    { id: 4, nombre: "Regalos" },
    { id: 5, nombre: "Festividades" },
  ];

  // Estado del nuevo producto
  const [newProduct, setNewProduct] = useState({
    name: "",
    costo: 0,
    precio: 0,
    stock: 0,
    categoria_id: 0,
    foto: "",
    ocasion: "",
  });

  // Estado del modal de detalles
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Detalles del producto
  const [productDetails, setProductDetails] = useState({
    talla: "",
    modelo: "",
    color: "",
  });

  // Guardar producto
  const addProduct = () => {
    if (!newProduct.name || !newProduct.categoria_id) {
      alert("Debes ingresar el nombre y seleccionar categoría");
      return;
    }

    console.log("Producto agregado:", {
      ...newProduct,
      detalles: productDetails,
    });

    // Resetear
    setNewProduct({
      name: "",
      costo: 0,
      precio: 0,
      stock: 0,
      categoria_id: 0,
      foto: "",
      ocasion: "",
    });
    setProductDetails({ talla: "", modelo: "", color: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Agregar Producto</h1>

      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl">
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

          {/* Categoría + botón de detalles */}
          <div className="flex flex-col">
            <label className="block font-semibold mb-1">Categoría</label>
            <div className="flex items-center gap-2">
              <select
                className="border p-2 w-full rounded"
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

              {/* Botón de Detalles */}
              {(newProduct.categoria_id === 1 ||
                newProduct.categoria_id === 2) && (
                <button
                  type="button"
                  onClick={() => setShowDetailsModal(true)}
                  className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  ➕
                </button>
              )}
            </div>
          </div>

          {/* Ocasión (solo si es Festividades) */}
          {newProduct.categoria_id === 5 && (
            <div>
              <label className="block font-semibold">Ocasión</label>
              <select
                className="border p-2 w-full rounded"
                value={newProduct.ocasion}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, ocasion: e.target.value })
                }
              >
                <option value="">Selecciona ocasión</option>
                <option value="Día de Reyes">Día de Reyes</option>
                <option value="Navidad">Navidad</option>
                <option value="Halloween">Halloween</option>
                <option value="15 de Septiembre">15 de Septiembre</option>
              </select>
            </div>
          )}
        </div>

        {/* Imagen */}
        <div className="mt-4">
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

        {/* Botón Guardar */}
        <div className="flex justify-end mt-6">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={addProduct}
          >
            Guardar producto
          </button>
        </div>
      </div>

      {/* 🟢 Modal de Detalles */}
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
                onClick={() => setShowDetailsModal(false)}
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
