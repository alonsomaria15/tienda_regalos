export interface Product {
  id: number;
  name: string;
  costo: number;       // ✅ agregar costo
  precio: number;      // precio de venta
  stock: number;
  categoria_id: number;
  foto: string;
  detalles?: {          // ✅ opcional, solo para Ropa/Calzado
    talla: string;
    modelo: string;
    color: string;
  };
}