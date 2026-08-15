CREATE SCHEMA IF NOT EXISTS "autenticacion";

CREATE SCHEMA IF NOT EXISTS "inventario";

CREATE SCHEMA IF NOT EXISTS "ventas";

CREATE SCHEMA IF NOT EXISTS "currency";

CREATE SCHEMA IF NOT EXISTS "deudores";

CREATE TABLE IF NOT EXISTS "autenticacion"."usuarios" (
  "id_usuario" SERIAL PRIMARY KEY,
  "id_usuario_visual" varchar(500) UNIQUE NOT NULL,
  "nombre" varchar(100) NOT NULL,
  "password" varchar(500) NOT NULL,
  "correo" varchar(150) UNIQUE,
  "cedula" int UNIQUE,
  "rol" int NOT NULL DEFAULT 'operador',
  "fecha_creacion" timestamp DEFAULT (now()),
  "borrado" bool DEFAULT false,
  "imagen" varchar(250) NOT NULL
);

CREATE TABLE IF NOT EXISTS "autenticacion"."refreh_token" (
  "id_refresh" SERIAL PRIMARY KEY,
  "id_usuario" varchar(500) UNIQUE NOT NULL,
  "uuid" varchar(500) UNIQUE NOT NULL,
  "fecha" date NOT NULL,
  "revoked" bool NOT NULL DEFAULT 'False'
);

CREATE TABLE IF NOT EXISTS "autenticacion"."roles" (
  "id_rol" SERIAL PRIMARY KEY,
  "id_rol_visual" int UNIQUE NOT NULL,
  "nombre_rol" varchar(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS "inventario"."medidas" (
  "id_medida" SERIAL PRIMARY KEY,
  "id_medida_visual" varchar(250) UNIQUE NOT NULL,
  "nombre" varchar(100) NOT NULL,
  "fecha_creacion" timestamp DEFAULT (now()),
  "borrado" bool DEFAULT false
);

CREATE TABLE IF NOT EXISTS "inventario"."categorias" (
  "id_categoria" SERIAL PRIMARY KEY,
  "id_categoria_visual" varchar(250) UNIQUE NOT NULL,
  "nombre" varchar(100) NOT NULL,
  "fecha_creacion" timestamp DEFAULT (now()),
  "borrado" bool DEFAULT false
);

CREATE TABLE IF NOT EXISTS "inventario"."billete_minimo" (
  "id_billete" SERIAL PRIMARY KEY,
  "id_billete_visual" int UNIQUE NOT NULL,
  "billete" decimal(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS "inventario"."productos" (
  "id_product" SERIAL PRIMARY KEY,
  "id_product_visual" varchar(250) UNIQUE NOT NULL,
  "product_codigo_barra" varchar(250) UNIQUE NOT NULL,
  "nombre" varchar(250) NOT NULL,
  "cantidad" int NOT NULL,
  "precio_compra" decimal(10, 4) NOT NULL,
  "porcentaje_ganancia" decimal(10, 4) NOT NULL,
  "descripcion" varchar(300),
  "id_categoria" int NOT NULL,
  "id_medida" int NOT NULL,
  "ultimo_movimiento" bool DEFAULT true,
  "cantidad_minima" int DEFAULT 5,
  "fecha_creacion" timestamp DEFAULT (now()),
  "borrado" bool DEFAULT false,
  CONSTRAINT limit_amount_product CHECK(("cantidad" >= 0)),
  CONSTRAINT limit_price_product CHECK(("precio_compra" >= (0)::numeric)),
  CONSTRAINT limit_earn_product CHECK(("porcentaje_ganancia" >= (0)::numeric))
);

CREATE TABLE IF NOT EXISTS "inventario"."movimientos" (
  "id_movimiento" SERIAL PRIMARY KEY,
  "id_visual" varchar(50) UNIQUE NOT NULL,
  "nombre" varchar(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS "inventario"."historial" (
  "id_historial" SERIAL PRIMARY KEY,
  "id_historial_visual" varchar(500) UNIQUE NOT NULL,
  "id_historial_codigo" varchar(250) UNIQUE NOT NULL,
  "id_movimiento" int NOT NULL,
  "id_producto" int NOT NULL,
  "cantidad" int NOT NULL,
  "id_usuario" int,
  "descripcion" text,
  "fecha_hora" timestamp DEFAULT (now()),
  CONSTRAINT limit_historial CHECK(("cantidad" >= 0))
);

CREATE TABLE IF NOT EXISTS "ventas"."movimiento_caja" (
  "id_movimiento" SERIAL PRIMARY KEY,
  "nombre" varchar(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS "ventas"."historial_ventas" (
  "id_venta" SERIAL PRIMARY KEY,
  "id_venta_visual" varchar(500) UNIQUE NOT NULL,
  "id_venta_codigo" varchar(250) UNIQUE NOT NULL,
  "dia_fecha" timestamp DEFAULT (now()),
  "id_metodo" int NOT NULL,
  "id_pago_detalles" int NOT NULL,
  "total" decimal(10, 2) NOT NULL,
  CONSTRAINT limit_sells CHECK(("total" >= (0)::numeric))
);

CREATE TABLE IF NOT EXISTS "ventas"."productos_vendidos" (
  "id_venta_producto" SERIAL PRIMARY KEY NOT NULL,
  "id_venta_historial" int NOT NULL,
  "id_producto" int NOT NULL,
  "cantidad" int NOT NULL,
  "precio_unitario" decimal(10, 2) NOT NULL,
  CONSTRAINT limit_sells_product_amount CHECK(("cantidad" >= 0)),
  CONSTRAINT limit_sells_product CHECK(("precio_unitario" >= (0)::numeric))
);

CREATE TABLE IF NOT EXISTS "ventas"."ofertas_vendidas" (
  "id_venta_oferta" SERIAL PRIMARY KEY NOT NULL,
  "id_venta" int NOT NULL,
  "id_oferta" int NOT NULL,
  "cantidad" int NOT NULL,
  "precio_unitario" decimal(10, 2) NOT NULL,
  CONSTRAINT limit_offer_amount CHECK(("cantidad" >= 0)),
  CONSTRAINT limit_offer CHECK(("precio_unitario" >= (0)::numeric))
);

CREATE TABLE IF NOT EXISTS "ventas"."avances" (
  "id_venta_avance" SERIAL PRIMARY KEY NOT NULL,
  "id_venta_historial" int NOT NULL,
  "cantidad_ganancia" decimal(10,2) NOT NULL,
  "porcentaje_cobrado" decimal(10,2) NOT NULL,
  CONSTRAINT limit_cash_earn CHECK(("cantidad_ganancia" >= (0)::numeric)),
  CONSTRAINT limit_cash CHECK(("porcentaje_cobrado" >= (0)::numeric))
);

CREATE TABLE IF NOT EXISTS "ventas"."Recarga_telefonica" (
  "id_venta_recarga" SERIAL PRIMARY KEY NOT NULL,
  "id_venta_historial" int NOT NULL,
  "cantidad_ganancia" decimal(10,2) NOT NULL,
  "porcentaje_cobrado" decimal(10,2) NOT NULL,
  CONSTRAINT limit_recharge_earn CHECK(("cantidad_ganancia" >= (0)::numeric)),
  CONSTRAINT limit_recharge CHECK(("porcentaje_cobrado" >= (0)::numeric))
);

CREATE TABLE IF NOT EXISTS "ventas"."pago_detalles" (
  "id_pago_detal" SERIAL PRIMARY KEY,
  "id_venta" int NOT NULL,
  "detalles" jsonb NOT NULL,
  "monto" decimal(10,2) NOT NULL,
  CONSTRAINT limit_details_amount CHECK(("monto" >= (0)::numeric))
);

CREATE TABLE IF NOT EXISTS "ventas"."historial_cierre" (
  "id_cierre" SERIAL PRIMARY KEY,
  "id_cierre_visual" varchar(500) UNIQUE NOT NULL,
  "id_cierre_codigo" varchar(250) UNIQUE NOT NULL,
  "total" decimal(10,2) NOT NULL,
  "balance_dia" jsonb NOT NULL,
  "fecha_cierre" timestamp DEFAULT (now()),
  CONSTRAINT limit_close_total CHECK(("total" >= (0)::numeric))
);

CREATE TABLE IF NOT EXISTS "ventas"."ofertas" (
  "id_oferta" SERIAL PRIMARY KEY,
  "id_oferta_visible" varchar(250) UNIQUE NOT NULL,
  "id_producto" int NOT NULL,
  "cantidad" int NOT NULL,
  "precio_oferta" decimal(10,2) NOT NULL,
  "oferta_activa" bool NOT NULL DEFAULT 'True',
  CONSTRAINT limit_offer_amount CHECK(("cantidad" >= 0)),
  CONSTRAINT limit_offer_price CHECK(("precio_oferta" >= (0)::numeric))
);

CREATE TABLE IF NOT EXISTS "ventas"."devolucion" (
  "id_venta_producto" SERIAL PRIMARY KEY NOT NULL,
  "id_venta_historial" int NOT NULL,
  "id_producto" int NOT NULL,
  "cantidad" int NOT NULL,
  "detalles" text,
  "motivo" varchar(50),
  CONSTRAINT limit_return_amount CHECK(("cantidad" >= 0))
);

CREATE TABLE IF NOT EXISTS "ventas"."motivos_devolucion" (
  "id_motivo" SERIAL PRIMARY KEY NOT NULL,
  "motivo" varchar(250) NOT NULL
);

CREATE TABLE IF NOT EXISTS "ventas"."parametros" (
  "id_clave" SERIAL PRIMARY KEY,
  "label" text NOT NULL,
  "valor" decimal(10,2) NOT NULL,
  "descripcion" text,
  "ultima_actualizado" timestamp NOT NULL,
  CONSTRAINT limit_value CHECK(("valor" >= (0)::numeric))
);

CREATE TABLE IF NOT EXISTS "currency"."historial_tasas" (
  "id_tasa" SERIAL PRIMARY KEY,
  "id_tasas_visual" varchar(250) UNIQUE NOT NULL,
  "id_tasas_codigo" varchar(250) UNIQUE NOT NULL,
  "fecha_tasa" date UNIQUE NOT NULL,
  "valores_currency" jsonb NOT NULL,
  "ultima_actualizacion" timestamp DEFAULT (now())
);

CREATE TABLE IF NOT EXISTS "currency"."bancos" (
  "id_banco" SERIAL PRIMARY KEY,
  "nombre" varchar(250) UNIQUE NOT NULL,
  "codigo_banco" varchar(250) UNIQUE
);

CREATE TABLE IF NOT EXISTS "currency"."tarifas_operadoras" (
  "operadora" varchar(500) PRIMARY KEY NOT NULL,
  "tarifas" jsonb NOT NULL,
  "ultima_actua" timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS "currency"."pago_movil" (
  "id_movil" SERIAL PRIMARY KEY,
  "id_movil_visual" int UNIQUE NOT NULL,
  "id_user" int NOT NULL,
  "telefono" varchar(250) NOT NULL,
  "id_banco" int NOT NULL,
  "activo" bool NOT NULL DEFAULT 'True'
);

CREATE TABLE IF NOT EXISTS "deudores"."clientes" (
  "id_cliente" SERIAL PRIMARY KEY,
  "id_cliente_visual" varchar(50) UNIQUE NOT NULL,
  "nombre" varchar(150) NOT NULL,
  "telefono" varchar(50),
  "direccion" text,
  "fecha_creacion" timestamp DEFAULT (now()),
  "borrado" bool DEFAULT false
);

CREATE TABLE IF NOT EXISTS "deudores"."estado_cuenta" (
  "id_estado" SERIAL PRIMARY KEY NOT NULL,
  "estado" varchar(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS "deudores"."cuentas_por_cobrar" (
  "id_cuenta" SERIAL PRIMARY KEY,
  "id_cuenta_visible" varchar(250) NOT NULL UNIQUE,
  "id_cuenta_codigo" varchar(250) NOT NULL UNIQUE,
  "id_cliente" int NOT NULL,
  "monto_original" int NOT NULL,
  "saldo_pendiente" int NOT NULL,
  "estado_cuenta" int NOT NULL,
  "id_venta_final" int UNIQUE,
  "fecha_creado" timestamp NOT NULL,
  "fecha_ultimo_pago" timestamp,
  "ultima_actualizacion" timestamp DEFAULT (now())
);

CREATE TABLE IF NOT EXISTS "deudores"."productos_fiados" (
  "id_tabla" SERIAL PRIMARY KEY,
  "id_cuenta" int NOT NULL,
  "id_producto" int NOT NULL,
  "cantidad" int NOT NULL,
  "precio_unitario" decimal(10,2) NOT NULL,
  CONSTRAINT limit_product_amount CHECK(("cantidad" >= 0)),
  CONSTRAINT limit_product_acount CHECK(("precio_unitario" >= (0)::numeric))
);

CREATE TABLE IF NOT EXISTS "deudores"."historial_fiado" (
  "id_fiado" SERIAL PRIMARY KEY,
  "id_visible" int NOT NULL,
  "id_cuenta" int NOT NULL,
  "id_usuario" int NOT NULL,
  "fecha" timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS "deudores"."historial_pagos" (
  "id_pago" SERIAL PRIMARY KEY,
  "id_cuenta" int NOT NULL,
  "tipo_pago" varchar(30) NOT NULL,
  "monto_pagado_moneda_local" int NOT NULL,
  "tasa_cambio_momento" int NOT NULL,
  "equivalente_divisa" int NOT NULL,
  "id_metodo_pago" int NOT NULL,
  "fecha_pago" timestamp DEFAULT (now()),
  "nota" text
);

COMMENT ON COLUMN "inventario"."productos"."precio_compra" IS 'Guardado en centavos';

COMMENT ON COLUMN "inventario"."historial"."id_usuario" IS 'Llave foránea lógica al módulo usuarios';

COMMENT ON COLUMN "ventas"."movimiento_caja"."nombre" IS 'Ej: Efectivo, Débito, Pago Móvil, Divisa';

COMMENT ON COLUMN "ventas"."historial_ventas"."id_venta_visual" IS 'Ej: FAC-0001';

COMMENT ON COLUMN "ventas"."historial_ventas"."dia_fecha" IS 'Fecha y hora exacta de la transacción';

COMMENT ON COLUMN "ventas"."historial_ventas"."total" IS 'Total de la venta en centavos/enteros';

COMMENT ON COLUMN "ventas"."productos_vendidos"."id_producto" IS 'FK lógica al módulo de inventario';

COMMENT ON COLUMN "ventas"."productos_vendidos"."precio_unitario" IS 'Precio de compra congelado en el momento de la venta';

COMMENT ON COLUMN "ventas"."historial_cierre"."fecha_cierre" IS 'Fecha y hora exacta del cierre';

COMMENT ON COLUMN "currency"."historial_tasas"."fecha_tasa" IS 'Una fila por día para evitar duplicados';

COMMENT ON COLUMN "currency"."historial_tasas"."valores_currency" IS 'Objeto NoSQL flexible: {"EUR": 0.92, "VES": 36.5, "COP": 3900}';

COMMENT ON COLUMN "deudores"."cuentas_por_cobrar"."estado_cuenta" IS 'false = Abierta/Debe, true = Cerrada/Pagada';

COMMENT ON COLUMN "deudores"."cuentas_por_cobrar"."id_venta_final" IS 'ID de la factura generada en ventas al cerrar la cuenta';

COMMENT ON COLUMN "deudores"."historial_pagos"."tipo_pago" IS 'abono o completo';

ALTER TABLE "autenticacion"."refreh_token" ADD FOREIGN KEY ("id_usuario") REFERENCES "autenticacion"."usuarios" ("id_usuario") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "autenticacion"."usuarios" ADD FOREIGN KEY ("rol") REFERENCES "autenticacion"."roles" ("id_rol_visual") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "inventario"."productos" ADD FOREIGN KEY ("id_categoria") REFERENCES "inventario"."categorias" ("id_categoria") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "inventario"."productos" ADD FOREIGN KEY ("id_medida") REFERENCES "inventario"."medidas" ("id_medida") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "inventario"."historial" ADD FOREIGN KEY ("id_producto") REFERENCES "inventario"."productos" ("id_product") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "inventario"."historial" ADD FOREIGN KEY ("id_movimiento") REFERENCES "inventario"."movimientos" ("id_movimiento") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "ventas"."historial_ventas" ADD FOREIGN KEY ("id_metodo") REFERENCES "ventas"."movimiento_caja" ("id_movimiento") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "ventas"."pago_detalles" ADD FOREIGN KEY ("id_venta") REFERENCES "ventas"."historial_ventas" ("id_venta") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "ventas"."productos_vendidos" ADD FOREIGN KEY ("id_venta_historial") REFERENCES "ventas"."historial_ventas" ("id_venta") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "ventas"."avances" ADD FOREIGN KEY ("id_venta_historial") REFERENCES "ventas"."historial_ventas" ("id_venta") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "ventas"."Recarga_telefonica" ADD FOREIGN KEY ("id_venta_historial") REFERENCES "ventas"."historial_ventas" ("id_venta") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "ventas"."ofertas_vendidas" ADD FOREIGN KEY ("id_oferta") REFERENCES "ventas"."ofertas" ("id_oferta") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "ventas"."devolucion" ADD FOREIGN KEY ("id_venta_historial") REFERENCES "ventas"."historial_ventas" ("id_venta") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "ventas"."ofertas_vendidas" ADD FOREIGN KEY ("id_venta") REFERENCES "ventas"."historial_ventas" ("id_venta") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "ventas"."devolucion" ADD FOREIGN KEY ("motivo") REFERENCES "ventas"."motivos_devolucion" ("id_motivo") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "ventas"."productos_vendidos" ADD FOREIGN KEY ("id_producto") REFERENCES "inventario"."productos" ("id_product") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "ventas"."ofertas" ADD FOREIGN KEY ("id_producto") REFERENCES "inventario"."productos" ("id_product") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "ventas"."devolucion" ADD FOREIGN KEY ("id_producto") REFERENCES "inventario"."productos" ("id_product") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "deudores"."cuentas_por_cobrar" ADD FOREIGN KEY ("id_cliente") REFERENCES "deudores"."clientes" ("id_cliente") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "deudores"."productos_fiados" ADD FOREIGN KEY ("id_cuenta") REFERENCES "deudores"."historial_fiado" ("id_fiado") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "deudores"."historial_fiado" ADD FOREIGN KEY ("id_cuenta") REFERENCES "deudores"."cuentas_por_cobrar" ("id_cuenta") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "deudores"."historial_pagos" ADD FOREIGN KEY ("id_cuenta") REFERENCES "deudores"."cuentas_por_cobrar" ("id_cuenta") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "deudores"."productos_fiados" ADD FOREIGN KEY ("id_producto") REFERENCES "inventario"."productos" ("id_product") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "deudores"."cuentas_por_cobrar" ADD FOREIGN KEY ("id_venta_final") REFERENCES "ventas"."historial_ventas" ("id_venta") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "deudores"."cuentas_por_cobrar" ADD FOREIGN KEY ("estado_cuenta") REFERENCES "deudores"."estado_cuenta" ("id_estado") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "inventario"."historial" ADD FOREIGN KEY ("id_usuario") REFERENCES "autenticacion"."usuarios" ("id_usuario") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "currency"."pago_movil" ADD FOREIGN KEY ("id_banco") REFERENCES "currency"."bancos" ("id_banco") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "currency"."pago_movil" ADD FOREIGN KEY ("id_user") REFERENCES "autenticacion"."usuarios" ("id_usuario") DEFERRABLE INITIALLY IMMEDIATE;
