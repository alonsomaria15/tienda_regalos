import React, { useState } from "react";

const AgregarCliente: React.FC = () => {
  //declaramos un estado
  const [selectedSucursal, setSelectedSucursal] = useState("0");

  //Funcion para Guardar Cliente
  const addCliente = () => {};

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Agregar Cliente</h1>
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
            }}
          >
            <option value="0">Todas las sucursales</option>
            <option value="1">Alberto G. 411</option>
            <option value="2">Francisco V. 104</option>
          </select>
        </div>
        &nbsp;
        {/*Agregamos un campo para guardar cliente */}
        <div>
          <label className="block font-semibold">Cliente</label>
          <input
            type="text"
            placeholder="Nombre del Cliente"
            className="border p-2 w-full rounded"
          ></input>
        </div>
        &nbsp;
        {/*Agregamos un campo para guardar telefono */}
        <div>
          <label className="block font-semibold">Telefono</label>
          <input
            type="text"
            placeholder="Telefono"
            className="border p-2 w-full rounded"
          ></input>
        </div>
        &nbsp;
        {/*Agregamos un campo para guardar correo */}
        <div>
          <label className="block font-semibold">Correo</label>
          <input
            type="text"
            placeholder="Correo"
            className="border p-2 w-full rounded"
          ></input>
        </div>
        &nbsp;
        {/*Botones*/}
        <div className="flex justity-end mt-6">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={addCliente}
          >
            Guardar Cliente
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgregarCliente;
