import React from "react";

const DashboardHome: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard General</h1>
      <p className="text-gray-600">
        Bienvenido a tu sistema de Tienda Regalos 🎁
      </p>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-gray-500 text-sm">Ventas del día</h2>
          <p className="text-2xl font-bold text-green-600">$4,250</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-gray-500 text-sm">Ingresos en caja</h2>
          <p className="text-2xl font-bold text-blue-600">$8,540</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-gray-500 text-sm">Productos en stock</h2>
          <p className="text-2xl font-bold text-yellow-600">356</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-gray-500 text-sm">Clientes registrados</h2>
          <p className="text-2xl font-bold text-purple-600">128</p>
        </div>
      </div>

      {/* Tabla o sección adicional */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-3">
          Últimos movimientos de caja
        </h2>
        <table className="w-full text-left border-t">
          <thead>
            <tr className="text-gray-600">
              <th className="py-2">Fecha</th>
              <th className="py-2">Tipo</th>
              <th className="py-2">Concepto</th>
              <th className="py-2">Monto</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="py-2">2026-01-13</td>
              <td className="py-2 text-green-600 font-medium">Entrada</td>
              <td className="py-2">Venta mostrador</td>
              <td className="py-2">$500.00</td>
            </tr>
            <tr className="border-t">
              <td className="py-2">2026-01-13</td>
              <td className="py-2 text-red-600 font-medium">Salida</td>
              <td className="py-2">Compra de insumos</td>
              <td className="py-2">$120.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardHome;
