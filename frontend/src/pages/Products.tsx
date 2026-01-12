import React, { useState } from "react";
import ProductTable from "../componentes/ProductTable";
import { Product } from "../types/Product";

const Products: React.FC = () => {
  // Estado de productos
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Camiseta", costo: 100, precio: 150, stock: 10, categoria_id: 1, foto: "" },
    { id: 2, name: "Pantalón", costo: 200, precio: 300, stock: 5, categoria_id: 1, foto: "" },
    { id: 3, name: "Zapatos", costo: 350, precio: 500, stock: 8, categoria_id: 2, foto: "" },
  ]);

  // Categorías
  const categorias = [
    { id: 1, nombre: "Ropa" },
    { id: 2, nombre: "Calzado" },
    { id: 3, nombre: "Accesorios" },
    { id: 4, nombre: "Regalos" },
    { id: 5, nombre: "Festividades" },
  ];

  // Estados para modales
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Nuevo producto
  const [newProduct, setNewProduct] = useState({
    name: "",
    costo: 0,
    precio: 0,
    stock: 0,
    categoria_id: 0,
    foto: "",
    ocasion: "",
  });

  // Detalles de producto (solo ropa/calzado)
  const [productDetails, setProductDetails] = useState({
    talla: "",
    modelo: "",
    color: "",
  });

  // Agregar producto
  const addProduct = () => {
    if (!newProduct.name || !newProduct.categoria_id) {
      alert("Debes ingresar el nombre y seleccionar categoría");
      return;
    }

    const id = products.length + 1;

    setProducts([...products, { id, ...newProduct, detalles: productDetails }]);

    // Resetear estados
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
    setShowModal(false);
    setShowDetailsModal(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Productos</h1>

      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setShowModal(true)}
      >
        Agregar producto
      </button>

      <ProductTable products={products} />

      {/* Modal Principal */}
      {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-4 rounded shadow-md w-2/5 max-w-lg">
      <h2 className="text-xl font-bold mb-4">Nuevo Producto</h2>

      {/* Grid de inputs */}
      <div className="grid grid-cols-2 gap-3">
        {/* Producto */}
        <div>
          <label>Producto</label>
          <input
            type="text"
            placeholder="Nombre"
            className="border p-2 w-full"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
        </div>

        {/* Stock */}
        <div>
          <label>Stock</label>
          <input
            type="number"
            placeholder="Stock"
            className="border p-2 w-full"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
          />
        </div>
        {/* Costo */}
        <div>
          <label>Costo</label>
          <input
            type="number"
            placeholder="Costo"
            className="border p-2 w-full"
            value={newProduct.costo}
            onChange={(e) => {
        // Eliminar todo lo que no sea número o punto
        const value = e.target.value.replace(/[^0-9.]/g, "");
        // Convertir a número y actualizar
        setNewProduct({ ...newProduct, costo: Number(value) });
      }}
          />
        </div>

        {/* Precio Venta */}
        <div>
          <label>Precio Venta</label>
          <input
            type="number"
            placeholder="Precio"
            className="border p-2 w-full"
            value={newProduct.precio}
            onChange={(e) => {
        const value = e.target.value.replace(/[^0-9.]/g, "");
        setNewProduct({ ...newProduct, precio: Number(value) });
      }}
          />
        </div>


        {/* Categoría */}
        <div>
          <label>Categoría</label>
          <select
            className="border p-2 w-full"
            value={newProduct.categoria_id}
            onChange={(e) =>
              setNewProduct({ ...newProduct, categoria_id: Number(e.target.value) })
            }
          >
            <option value={0}>Selecciona categoría</option>
            <option value={1}>Ropa</option>
            <option value={2}>Calzado</option>
            <option value={3}>Accesorios</option>
            <option value={4}>Regalos</option>
            <option value={5}>Festividades</option>
          </select>
        </div>

        {/* Ocasión solo si es festividad */}
        {newProduct.categoria_id === 5 && (
          <div>
            <label>Ocasión</label>
            <select
              className="border p-2 w-full"
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

        {/* Botón de Detalles para Ropa/Calzado */}
        {(newProduct.categoria_id === 1 || newProduct.categoria_id === 2) && (
          <div>
            <button
              className="px-3 py-1 bg-green-500 text-white rounded mt-2"
              onClick={() => setShowDetailsModal(true)}
            >
              Agregar Detalles
            </button>
          </div>
        )}
      </div>

      {/* Imagen */}
      <div className="mt-3">
        <label>Imagen</label>
        <input
          type="file"
          accept="image/*"
          className="border p-2 w-full"
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
            className="w-24 h-24 object-cover mt-2"
          />
        )}
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => setShowModal(false)}
        >
          Cancelar
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={addProduct}
        >
          Agregar
        </button>
      </div>
    </div>
  </div>
)}

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
                  setProductDetails({ ...productDetails, talla: e.target.value })
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
                  setProductDetails({ ...productDetails, modelo: e.target.value })
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
                  setProductDetails({ ...productDetails, color: e.target.value })
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
                className="px-4 py-2 bg-blue-500 text-white rounded"
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
