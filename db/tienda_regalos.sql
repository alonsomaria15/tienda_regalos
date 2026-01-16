-- ------------------------------------------------------------
-- Base de datos: tienda_regalos
-- Sistema de gestión para tienda de regalos con múltiples sucursales
-- ------------------------------------------------------------

CREATE DATABASE IF NOT EXISTS tienda_regalos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tienda_regalos;

-- ------------------------------------------------------------
-- Tabla: sucursales
-- ------------------------------------------------------------
CREATE TABLE sucursales (
  id_sucursal INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  direccion VARCHAR(200),
  telefono VARCHAR(20),
  activo TINYINT(1) DEFAULT 1,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Tabla: categorias
-- ------------------------------------------------------------
CREATE TABLE categorias (
  id_categoria INT AUTO_INCREMENT PRIMARY KEY,
  nombre_categoria VARCHAR(100) NOT NULL,
  activo TINYINT(1) DEFAULT 1,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Tabla: festividades
-- (Solo se usa cuando la categoría del producto es “Festividad”)
-- ------------------------------------------------------------
CREATE TABLE festividades (
  id_festividad INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  fecha_inicio DATE NULL,
  fecha_fin DATE NULL,
  activo TINYINT(1) DEFAULT 1,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Tabla: productos
-- ------------------------------------------------------------
CREATE TABLE productos (
  id_producto INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  codigo_barras VARCHAR(50) UNIQUE,
  categoria_id INT,
  festividad_id INT NULL, -- 🔹 Solo aplica si la categoría es "Festividad"
  costo DECIMAL(10,2),
  precio DECIMAL(10,2),
  foto VARCHAR(255) DEFAULT NULL,
  sucursal_id INT, -- 🔹 En qué sucursal está el producto
  activo TINYINT(1) DEFAULT 1,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id_categoria),
  FOREIGN KEY (festividad_id) REFERENCES festividades(id_festividad),
  FOREIGN KEY (sucursal_id) REFERENCES sucursales(id_sucursal)
);

-- ------------------------------------------------------------
-- Tabla: detalles_producto (solo para ropa y calzado)
-- ------------------------------------------------------------
CREATE TABLE detalles_producto (
  id_detalle INT AUTO_INCREMENT PRIMARY KEY,
  producto_id INT,
  talla VARCHAR(20),
  modelo VARCHAR(100),
  color VARCHAR(50),
  FOREIGN KEY (producto_id) REFERENCES productos(id_producto)
);

-- ------------------------------------------------------------
-- Tabla: inventario_sucursal
-- ------------------------------------------------------------
CREATE TABLE inventario_sucursal (
  id_inventario INT AUTO_INCREMENT PRIMARY KEY,
  producto_id INT,
  sucursal_id INT,
  stock INT DEFAULT 0,
  activo TINYINT(1) DEFAULT 1,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (producto_id) REFERENCES productos(id_producto),
  FOREIGN KEY (sucursal_id) REFERENCES sucursales(id_sucursal)
);

-- ------------------------------------------------------------
-- Tabla: movimientos_inventario
-- Registra entradas, salidas, ajustes y traspasos entre sucursales
-- ------------------------------------------------------------
CREATE TABLE movimientos_inventario (
  id_movimiento INT AUTO_INCREMENT PRIMARY KEY,
  producto_id INT NOT NULL,
  tipo_movimiento ENUM('entrada', 'salida', 'ajuste', 'traspaso') NOT NULL,
  cantidad INT NOT NULL,
  sucursal_origen_id INT NULL,
  sucursal_destino_id INT NULL,
  concepto VARCHAR(150),
  observaciones VARCHAR(255),
  usuario VARCHAR(100),
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (producto_id) REFERENCES productos(id_producto),
  FOREIGN KEY (sucursal_origen_id) REFERENCES sucursales(id_sucursal),
  FOREIGN KEY (sucursal_destino_id) REFERENCES sucursales(id_sucursal)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Tabla: clientes
-- ------------------------------------------------------------
CREATE TABLE clientes (
  id_cliente INT AUTO_INCREMENT PRIMARY KEY,
  sucursal_id INT,
  nombre VARCHAR(100),
  telefono VARCHAR(20),
  correo VARCHAR(100),
  activo TINYINT(1) DEFAULT 1,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (sucursal_id) REFERENCES sucursales(id_sucursal)
);
-- ------------------------------------------------------------
-- Tabla: ventas
-- ------------------------------------------------------------
CREATE TABLE ventas (
  id_venta INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT,
  sucursal_id INT,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10,2),
  descuento DECIMAL(10,2) DEFAULT 0,
  metodo_pago ENUM('efectivo', 'tarjeta', 'transferencia', 'abono') DEFAULT 'efectivo',
  activo TINYINT(1) DEFAULT 1,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id_cliente),
  FOREIGN KEY (sucursal_id) REFERENCES sucursales(id_sucursal)
);

-- ------------------------------------------------------------
-- Tabla: detalle_venta
-- ------------------------------------------------------------
CREATE TABLE detalle_venta (
  id_detalle INT AUTO_INCREMENT PRIMARY KEY,
  venta_id INT,
  producto_id INT,
  cantidad INT,
  precio_unitario DECIMAL(10,2),
  subtotal DECIMAL(10,2),
  activo TINYINT(1) DEFAULT 1,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (venta_id) REFERENCES ventas(id_venta),
  FOREIGN KEY (producto_id) REFERENCES productos(id_producto)
);

-- ------------------------------------------------------------
-- Tabla: abonos
-- ------------------------------------------------------------
CREATE TABLE abonos (
  id_abono INT AUTO_INCREMENT PRIMARY KEY,
  venta_id INT,
  monto DECIMAL(10,2),
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  movimiento_caja_id INT NULL,
  activo TINYINT(1) DEFAULT 1,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (venta_id) REFERENCES ventas(id_venta)
);

-- ------------------------------------------------------------
-- Tabla: movimientos_caja
-- ------------------------------------------------------------
CREATE TABLE movimientos_caja (
  id_movimiento INT AUTO_INCREMENT PRIMARY KEY,
  sucursal_id INT NOT NULL,
  tipo ENUM('entrada', 'salida') NOT NULL,
  concepto VARCHAR(150) NOT NULL,
  monto DECIMAL(10,2) NOT NULL,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  observaciones VARCHAR(255),
  FOREIGN KEY (sucursal_id) REFERENCES sucursales(id_sucursal)
);

-- Relación abonos → movimientos_caja
ALTER TABLE abonos
ADD FOREIGN KEY (movimiento_caja_id) REFERENCES movimientos_caja(id_movimiento);

-- ------------------------------------------------------------
-- Datos iniciales
-- ------------------------------------------------------------

-- Sucursales
INSERT INTO sucursales (nombre, direccion, telefono) VALUES
('Sucursal 1', 'Centro', '555-111-2222'),
('Sucursal 2', 'Norte', '555-333-4444');

-- Categorías
INSERT INTO categorias (nombre_categoria) VALUES
('Ropa'),
('Calzado'),
('Accesorios'),
('Belleza'),
('Regalos'),
('Festividad');

-- Festividades
INSERT INTO festividades (nombre, fecha_inicio, fecha_fin) VALUES
('Navidad', '2026-12-01', '2026-12-31'),
('San Valentín', '2026-02-01', '2026-02-14'),
('Día de las Madres', '2026-05-01', '2026-05-10'),
('Halloween', '2026-10-01', '2026-10-31'),
('15 Septiembre', '2026-09-01', '2026-09-16'),
('Día de Reyes', '2026-01-01', '2026-01-06');

-- Fin del script

