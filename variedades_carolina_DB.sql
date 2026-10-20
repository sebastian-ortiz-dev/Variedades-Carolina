--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2026-10-20 19:41:56

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 99570)
-- Name: autenticacion; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA autenticacion;


ALTER SCHEMA autenticacion OWNER TO postgres;

--
-- TOC entry 9 (class 2615 OID 99573)
-- Name: currency; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA currency;


ALTER SCHEMA currency OWNER TO postgres;

--
-- TOC entry 10 (class 2615 OID 99574)
-- Name: deudores; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA deudores;


ALTER SCHEMA deudores OWNER TO postgres;

--
-- TOC entry 7 (class 2615 OID 99571)
-- Name: inventario; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA inventario;


ALTER SCHEMA inventario OWNER TO postgres;

--
-- TOC entry 8 (class 2615 OID 99572)
-- Name: ventas; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA ventas;


ALTER SCHEMA ventas OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 225 (class 1259 OID 99593)
-- Name: refreh_token; Type: TABLE; Schema: autenticacion; Owner: postgres
--

CREATE TABLE autenticacion.refreh_token (
    id_refresh integer NOT NULL,
    id_usuario integer NOT NULL,
    uuid character varying(500) NOT NULL,
    fecha date NOT NULL,
    revoked boolean DEFAULT false NOT NULL
);


ALTER TABLE autenticacion.refreh_token OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 99592)
-- Name: refreh_token_id_refresh_seq; Type: SEQUENCE; Schema: autenticacion; Owner: postgres
--

CREATE SEQUENCE autenticacion.refreh_token_id_refresh_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE autenticacion.refreh_token_id_refresh_seq OWNER TO postgres;

--
-- TOC entry 5276 (class 0 OID 0)
-- Dependencies: 224
-- Name: refreh_token_id_refresh_seq; Type: SEQUENCE OWNED BY; Schema: autenticacion; Owner: postgres
--

ALTER SEQUENCE autenticacion.refreh_token_id_refresh_seq OWNED BY autenticacion.refreh_token.id_refresh;


--
-- TOC entry 227 (class 1259 OID 99607)
-- Name: roles; Type: TABLE; Schema: autenticacion; Owner: postgres
--

CREATE TABLE autenticacion.roles (
    id_rol integer NOT NULL,
    id_rol_visual character varying(250) NOT NULL,
    nombre_rol character varying(50) NOT NULL
);


ALTER TABLE autenticacion.roles OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 99606)
-- Name: roles_id_rol_seq; Type: SEQUENCE; Schema: autenticacion; Owner: postgres
--

CREATE SEQUENCE autenticacion.roles_id_rol_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE autenticacion.roles_id_rol_seq OWNER TO postgres;

--
-- TOC entry 5277 (class 0 OID 0)
-- Dependencies: 226
-- Name: roles_id_rol_seq; Type: SEQUENCE OWNED BY; Schema: autenticacion; Owner: postgres
--

ALTER SEQUENCE autenticacion.roles_id_rol_seq OWNED BY autenticacion.roles.id_rol;


--
-- TOC entry 223 (class 1259 OID 99576)
-- Name: usuarios; Type: TABLE; Schema: autenticacion; Owner: postgres
--

CREATE TABLE autenticacion.usuarios (
    id_usuario integer NOT NULL,
    id_usuario_visual character varying(500) NOT NULL,
    nombre character varying(100) NOT NULL,
    password character varying(500) NOT NULL,
    correo character varying(150),
    cedula character varying(250),
    rol integer NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT now(),
    borrado boolean DEFAULT false,
    imagen character varying(250) NOT NULL
);


ALTER TABLE autenticacion.usuarios OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 99575)
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE; Schema: autenticacion; Owner: postgres
--

CREATE SEQUENCE autenticacion.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE autenticacion.usuarios_id_usuario_seq OWNER TO postgres;

--
-- TOC entry 5278 (class 0 OID 0)
-- Dependencies: 222
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: autenticacion; Owner: postgres
--

ALTER SEQUENCE autenticacion.usuarios_id_usuario_seq OWNED BY autenticacion.usuarios.id_usuario;


--
-- TOC entry 267 (class 1259 OID 99831)
-- Name: bancos; Type: TABLE; Schema: currency; Owner: postgres
--

CREATE TABLE currency.bancos (
    id_banco integer NOT NULL,
    nombre character varying(250) NOT NULL,
    codigo_banco character varying(250),
    borrado boolean DEFAULT true,
    id_visible_banco character varying(250) NOT NULL
);


ALTER TABLE currency.bancos OWNER TO postgres;

--
-- TOC entry 266 (class 1259 OID 99830)
-- Name: bancos_id_banco_seq; Type: SEQUENCE; Schema: currency; Owner: postgres
--

CREATE SEQUENCE currency.bancos_id_banco_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE currency.bancos_id_banco_seq OWNER TO postgres;

--
-- TOC entry 5279 (class 0 OID 0)
-- Dependencies: 266
-- Name: bancos_id_banco_seq; Type: SEQUENCE OWNED BY; Schema: currency; Owner: postgres
--

ALTER SEQUENCE currency.bancos_id_banco_seq OWNED BY currency.bancos.id_banco;


--
-- TOC entry 265 (class 1259 OID 99815)
-- Name: historial_tasas; Type: TABLE; Schema: currency; Owner: postgres
--

CREATE TABLE currency.historial_tasas (
    id_tasa integer NOT NULL,
    id_tasas_visual character varying(250) NOT NULL,
    id_tasas_codigo character varying(250) NOT NULL,
    fecha_tasa date NOT NULL,
    valores_currency jsonb NOT NULL,
    ultima_actualizacion timestamp without time zone DEFAULT now()
);


ALTER TABLE currency.historial_tasas OWNER TO postgres;

--
-- TOC entry 5280 (class 0 OID 0)
-- Dependencies: 265
-- Name: COLUMN historial_tasas.fecha_tasa; Type: COMMENT; Schema: currency; Owner: postgres
--

COMMENT ON COLUMN currency.historial_tasas.fecha_tasa IS 'Una fila por día para evitar duplicados';


--
-- TOC entry 5281 (class 0 OID 0)
-- Dependencies: 265
-- Name: COLUMN historial_tasas.valores_currency; Type: COMMENT; Schema: currency; Owner: postgres
--

COMMENT ON COLUMN currency.historial_tasas.valores_currency IS 'Objeto NoSQL flexible: {"EUR": 0.92, "VES": 36.5, "COP": 3900}';


--
-- TOC entry 264 (class 1259 OID 99814)
-- Name: historial_tasas_id_tasa_seq; Type: SEQUENCE; Schema: currency; Owner: postgres
--

CREATE SEQUENCE currency.historial_tasas_id_tasa_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE currency.historial_tasas_id_tasa_seq OWNER TO postgres;

--
-- TOC entry 5282 (class 0 OID 0)
-- Dependencies: 264
-- Name: historial_tasas_id_tasa_seq; Type: SEQUENCE OWNED BY; Schema: currency; Owner: postgres
--

ALTER SEQUENCE currency.historial_tasas_id_tasa_seq OWNED BY currency.historial_tasas.id_tasa;


--
-- TOC entry 270 (class 1259 OID 99851)
-- Name: pago_movil; Type: TABLE; Schema: currency; Owner: postgres
--

CREATE TABLE currency.pago_movil (
    id_movil integer NOT NULL,
    id_movil_visual integer NOT NULL,
    id_user integer NOT NULL,
    telefono character varying(250) NOT NULL,
    id_banco integer NOT NULL,
    activo boolean DEFAULT true NOT NULL
);


ALTER TABLE currency.pago_movil OWNER TO postgres;

--
-- TOC entry 269 (class 1259 OID 99850)
-- Name: pago_movil_id_movil_seq; Type: SEQUENCE; Schema: currency; Owner: postgres
--

CREATE SEQUENCE currency.pago_movil_id_movil_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE currency.pago_movil_id_movil_seq OWNER TO postgres;

--
-- TOC entry 5283 (class 0 OID 0)
-- Dependencies: 269
-- Name: pago_movil_id_movil_seq; Type: SEQUENCE OWNED BY; Schema: currency; Owner: postgres
--

ALTER SEQUENCE currency.pago_movil_id_movil_seq OWNED BY currency.pago_movil.id_movil;


--
-- TOC entry 268 (class 1259 OID 99843)
-- Name: tarifas_operadoras; Type: TABLE; Schema: currency; Owner: postgres
--

CREATE TABLE currency.tarifas_operadoras (
    operadora character varying(500) NOT NULL,
    tarifas jsonb NOT NULL,
    ultima_actua timestamp without time zone NOT NULL
);


ALTER TABLE currency.tarifas_operadoras OWNER TO postgres;

--
-- TOC entry 272 (class 1259 OID 99861)
-- Name: clientes; Type: TABLE; Schema: deudores; Owner: postgres
--

CREATE TABLE deudores.clientes (
    id_cliente integer NOT NULL,
    id_cliente_visual character varying(50) NOT NULL,
    nombre character varying(150) NOT NULL,
    telefono character varying(50),
    direccion text,
    fecha_creacion timestamp without time zone DEFAULT now(),
    borrado boolean DEFAULT false
);


ALTER TABLE deudores.clientes OWNER TO postgres;

--
-- TOC entry 271 (class 1259 OID 99860)
-- Name: clientes_id_cliente_seq; Type: SEQUENCE; Schema: deudores; Owner: postgres
--

CREATE SEQUENCE deudores.clientes_id_cliente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE deudores.clientes_id_cliente_seq OWNER TO postgres;

--
-- TOC entry 5284 (class 0 OID 0)
-- Dependencies: 271
-- Name: clientes_id_cliente_seq; Type: SEQUENCE OWNED BY; Schema: deudores; Owner: postgres
--

ALTER SEQUENCE deudores.clientes_id_cliente_seq OWNED BY deudores.clientes.id_cliente;


--
-- TOC entry 276 (class 1259 OID 99881)
-- Name: cuentas_por_cobrar; Type: TABLE; Schema: deudores; Owner: postgres
--

CREATE TABLE deudores.cuentas_por_cobrar (
    id_cuenta integer NOT NULL,
    id_cuenta_visible character varying(250) NOT NULL,
    id_cuenta_codigo character varying(250) NOT NULL,
    id_cliente integer NOT NULL,
    monto_original integer NOT NULL,
    saldo_pendiente integer NOT NULL,
    estado_cuenta integer NOT NULL,
    id_venta_final integer,
    fecha_creado timestamp without time zone NOT NULL,
    fecha_ultimo_pago timestamp without time zone,
    ultima_actualizacion timestamp without time zone DEFAULT now()
);


ALTER TABLE deudores.cuentas_por_cobrar OWNER TO postgres;

--
-- TOC entry 5285 (class 0 OID 0)
-- Dependencies: 276
-- Name: COLUMN cuentas_por_cobrar.estado_cuenta; Type: COMMENT; Schema: deudores; Owner: postgres
--

COMMENT ON COLUMN deudores.cuentas_por_cobrar.estado_cuenta IS 'false = Abierta/Debe, true = Cerrada/Pagada';


--
-- TOC entry 5286 (class 0 OID 0)
-- Dependencies: 276
-- Name: COLUMN cuentas_por_cobrar.id_venta_final; Type: COMMENT; Schema: deudores; Owner: postgres
--

COMMENT ON COLUMN deudores.cuentas_por_cobrar.id_venta_final IS 'ID de la factura generada en ventas al cerrar la cuenta';


--
-- TOC entry 275 (class 1259 OID 99880)
-- Name: cuentas_por_cobrar_id_cuenta_seq; Type: SEQUENCE; Schema: deudores; Owner: postgres
--

CREATE SEQUENCE deudores.cuentas_por_cobrar_id_cuenta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE deudores.cuentas_por_cobrar_id_cuenta_seq OWNER TO postgres;

--
-- TOC entry 5287 (class 0 OID 0)
-- Dependencies: 275
-- Name: cuentas_por_cobrar_id_cuenta_seq; Type: SEQUENCE OWNED BY; Schema: deudores; Owner: postgres
--

ALTER SEQUENCE deudores.cuentas_por_cobrar_id_cuenta_seq OWNED BY deudores.cuentas_por_cobrar.id_cuenta;


--
-- TOC entry 274 (class 1259 OID 99874)
-- Name: estado_cuenta; Type: TABLE; Schema: deudores; Owner: postgres
--

CREATE TABLE deudores.estado_cuenta (
    id_estado integer NOT NULL,
    estado character varying(50) NOT NULL
);


ALTER TABLE deudores.estado_cuenta OWNER TO postgres;

--
-- TOC entry 273 (class 1259 OID 99873)
-- Name: estado_cuenta_id_estado_seq; Type: SEQUENCE; Schema: deudores; Owner: postgres
--

CREATE SEQUENCE deudores.estado_cuenta_id_estado_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE deudores.estado_cuenta_id_estado_seq OWNER TO postgres;

--
-- TOC entry 5288 (class 0 OID 0)
-- Dependencies: 273
-- Name: estado_cuenta_id_estado_seq; Type: SEQUENCE OWNED BY; Schema: deudores; Owner: postgres
--

ALTER SEQUENCE deudores.estado_cuenta_id_estado_seq OWNED BY deudores.estado_cuenta.id_estado;


--
-- TOC entry 280 (class 1259 OID 99906)
-- Name: historial_fiado; Type: TABLE; Schema: deudores; Owner: postgres
--

CREATE TABLE deudores.historial_fiado (
    id_fiado integer NOT NULL,
    id_visible integer NOT NULL,
    id_cuenta integer NOT NULL,
    id_usuario integer NOT NULL,
    fecha timestamp without time zone NOT NULL
);


ALTER TABLE deudores.historial_fiado OWNER TO postgres;

--
-- TOC entry 279 (class 1259 OID 99905)
-- Name: historial_fiado_id_fiado_seq; Type: SEQUENCE; Schema: deudores; Owner: postgres
--

CREATE SEQUENCE deudores.historial_fiado_id_fiado_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE deudores.historial_fiado_id_fiado_seq OWNER TO postgres;

--
-- TOC entry 5289 (class 0 OID 0)
-- Dependencies: 279
-- Name: historial_fiado_id_fiado_seq; Type: SEQUENCE OWNED BY; Schema: deudores; Owner: postgres
--

ALTER SEQUENCE deudores.historial_fiado_id_fiado_seq OWNED BY deudores.historial_fiado.id_fiado;


--
-- TOC entry 282 (class 1259 OID 99913)
-- Name: historial_pagos; Type: TABLE; Schema: deudores; Owner: postgres
--

CREATE TABLE deudores.historial_pagos (
    id_pago integer NOT NULL,
    id_cuenta integer NOT NULL,
    tipo_pago character varying(30) NOT NULL,
    monto_pagado_moneda_local integer NOT NULL,
    tasa_cambio_momento integer NOT NULL,
    equivalente_divisa integer NOT NULL,
    id_metodo_pago integer NOT NULL,
    fecha_pago timestamp without time zone DEFAULT now(),
    nota text
);


ALTER TABLE deudores.historial_pagos OWNER TO postgres;

--
-- TOC entry 5290 (class 0 OID 0)
-- Dependencies: 282
-- Name: COLUMN historial_pagos.tipo_pago; Type: COMMENT; Schema: deudores; Owner: postgres
--

COMMENT ON COLUMN deudores.historial_pagos.tipo_pago IS 'abono o completo';


--
-- TOC entry 281 (class 1259 OID 99912)
-- Name: historial_pagos_id_pago_seq; Type: SEQUENCE; Schema: deudores; Owner: postgres
--

CREATE SEQUENCE deudores.historial_pagos_id_pago_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE deudores.historial_pagos_id_pago_seq OWNER TO postgres;

--
-- TOC entry 5291 (class 0 OID 0)
-- Dependencies: 281
-- Name: historial_pagos_id_pago_seq; Type: SEQUENCE OWNED BY; Schema: deudores; Owner: postgres
--

ALTER SEQUENCE deudores.historial_pagos_id_pago_seq OWNED BY deudores.historial_pagos.id_pago;


--
-- TOC entry 278 (class 1259 OID 99897)
-- Name: productos_fiados; Type: TABLE; Schema: deudores; Owner: postgres
--

CREATE TABLE deudores.productos_fiados (
    id_tabla integer NOT NULL,
    id_cuenta integer NOT NULL,
    id_producto integer NOT NULL,
    cantidad integer NOT NULL,
    precio_unitario numeric(10,2) NOT NULL,
    CONSTRAINT limit_product_acount CHECK ((precio_unitario >= (0)::numeric)),
    CONSTRAINT limit_product_amount CHECK ((cantidad >= 0))
);


ALTER TABLE deudores.productos_fiados OWNER TO postgres;

--
-- TOC entry 277 (class 1259 OID 99896)
-- Name: productos_fiados_id_tabla_seq; Type: SEQUENCE; Schema: deudores; Owner: postgres
--

CREATE SEQUENCE deudores.productos_fiados_id_tabla_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE deudores.productos_fiados_id_tabla_seq OWNER TO postgres;

--
-- TOC entry 5292 (class 0 OID 0)
-- Dependencies: 277
-- Name: productos_fiados_id_tabla_seq; Type: SEQUENCE OWNED BY; Schema: deudores; Owner: postgres
--

ALTER SEQUENCE deudores.productos_fiados_id_tabla_seq OWNED BY deudores.productos_fiados.id_tabla;


--
-- TOC entry 233 (class 1259 OID 99640)
-- Name: billete_minimo; Type: TABLE; Schema: inventario; Owner: postgres
--

CREATE TABLE inventario.billete_minimo (
    id_billete integer NOT NULL,
    id_billete_visual character varying(250) NOT NULL,
    billete numeric(10,2) NOT NULL
);


ALTER TABLE inventario.billete_minimo OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 99639)
-- Name: billete_minimo_id_billete_seq; Type: SEQUENCE; Schema: inventario; Owner: postgres
--

CREATE SEQUENCE inventario.billete_minimo_id_billete_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE inventario.billete_minimo_id_billete_seq OWNER TO postgres;

--
-- TOC entry 5293 (class 0 OID 0)
-- Dependencies: 232
-- Name: billete_minimo_id_billete_seq; Type: SEQUENCE OWNED BY; Schema: inventario; Owner: postgres
--

ALTER SEQUENCE inventario.billete_minimo_id_billete_seq OWNED BY inventario.billete_minimo.id_billete;


--
-- TOC entry 231 (class 1259 OID 99629)
-- Name: categorias; Type: TABLE; Schema: inventario; Owner: postgres
--

CREATE TABLE inventario.categorias (
    id_categoria integer NOT NULL,
    id_categoria_visual character varying(250) NOT NULL,
    nombre character varying(100) NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT now(),
    borrado boolean DEFAULT false
);


ALTER TABLE inventario.categorias OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 99628)
-- Name: categorias_id_categoria_seq; Type: SEQUENCE; Schema: inventario; Owner: postgres
--

CREATE SEQUENCE inventario.categorias_id_categoria_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE inventario.categorias_id_categoria_seq OWNER TO postgres;

--
-- TOC entry 5294 (class 0 OID 0)
-- Dependencies: 230
-- Name: categorias_id_categoria_seq; Type: SEQUENCE OWNED BY; Schema: inventario; Owner: postgres
--

ALTER SEQUENCE inventario.categorias_id_categoria_seq OWNED BY inventario.categorias.id_categoria;


--
-- TOC entry 239 (class 1259 OID 99678)
-- Name: historial; Type: TABLE; Schema: inventario; Owner: postgres
--

CREATE TABLE inventario.historial (
    id_historial integer NOT NULL,
    id_historial_visual character varying(500) NOT NULL,
    id_movimiento integer NOT NULL,
    id_producto integer NOT NULL,
    cantidad integer NOT NULL,
    id_usuario integer,
    descripcion text,
    fecha_hora timestamp without time zone DEFAULT now(),
    CONSTRAINT limit_historial CHECK ((cantidad >= 0))
);


ALTER TABLE inventario.historial OWNER TO postgres;

--
-- TOC entry 5295 (class 0 OID 0)
-- Dependencies: 239
-- Name: COLUMN historial.id_usuario; Type: COMMENT; Schema: inventario; Owner: postgres
--

COMMENT ON COLUMN inventario.historial.id_usuario IS 'Llave foránea lógica al módulo usuarios';


--
-- TOC entry 238 (class 1259 OID 99677)
-- Name: historial_id_historial_seq; Type: SEQUENCE; Schema: inventario; Owner: postgres
--

CREATE SEQUENCE inventario.historial_id_historial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE inventario.historial_id_historial_seq OWNER TO postgres;

--
-- TOC entry 5296 (class 0 OID 0)
-- Dependencies: 238
-- Name: historial_id_historial_seq; Type: SEQUENCE OWNED BY; Schema: inventario; Owner: postgres
--

ALTER SEQUENCE inventario.historial_id_historial_seq OWNED BY inventario.historial.id_historial;


--
-- TOC entry 229 (class 1259 OID 99618)
-- Name: medidas; Type: TABLE; Schema: inventario; Owner: postgres
--

CREATE TABLE inventario.medidas (
    id_medida integer NOT NULL,
    id_medida_visual character varying(250) NOT NULL,
    nombre character varying(100) NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT now(),
    borrado boolean DEFAULT false
);


ALTER TABLE inventario.medidas OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 99617)
-- Name: medidas_id_medida_seq; Type: SEQUENCE; Schema: inventario; Owner: postgres
--

CREATE SEQUENCE inventario.medidas_id_medida_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE inventario.medidas_id_medida_seq OWNER TO postgres;

--
-- TOC entry 5297 (class 0 OID 0)
-- Dependencies: 228
-- Name: medidas_id_medida_seq; Type: SEQUENCE OWNED BY; Schema: inventario; Owner: postgres
--

ALTER SEQUENCE inventario.medidas_id_medida_seq OWNED BY inventario.medidas.id_medida;


--
-- TOC entry 237 (class 1259 OID 99669)
-- Name: movimientos; Type: TABLE; Schema: inventario; Owner: postgres
--

CREATE TABLE inventario.movimientos (
    id_movimiento integer NOT NULL,
    id_visual character varying(50) NOT NULL,
    nombre character varying(100) NOT NULL
);


ALTER TABLE inventario.movimientos OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 99668)
-- Name: movimientos_id_movimiento_seq; Type: SEQUENCE; Schema: inventario; Owner: postgres
--

CREATE SEQUENCE inventario.movimientos_id_movimiento_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE inventario.movimientos_id_movimiento_seq OWNER TO postgres;

--
-- TOC entry 5298 (class 0 OID 0)
-- Dependencies: 236
-- Name: movimientos_id_movimiento_seq; Type: SEQUENCE OWNED BY; Schema: inventario; Owner: postgres
--

ALTER SEQUENCE inventario.movimientos_id_movimiento_seq OWNED BY inventario.movimientos.id_movimiento;


--
-- TOC entry 235 (class 1259 OID 99649)
-- Name: productos; Type: TABLE; Schema: inventario; Owner: postgres
--

CREATE TABLE inventario.productos (
    id_product integer NOT NULL,
    id_product_visual character varying(250) NOT NULL,
    product_codigo_barra character varying(250) NOT NULL,
    cantidad integer NOT NULL,
    precio_compra numeric(10,4) NOT NULL,
    porcentaje_ganancia numeric(10,4) NOT NULL,
    descripcion character varying(300),
    id_categoria integer NOT NULL,
    id_medida integer NOT NULL,
    ultimo_movimiento boolean DEFAULT true,
    cantidad_minima integer DEFAULT 5,
    fecha_creacion timestamp without time zone DEFAULT now(),
    borrado boolean DEFAULT false,
    nombre character varying(250),
    imagen character varying(500),
    CONSTRAINT limit_amount_product CHECK ((cantidad >= 0)),
    CONSTRAINT limit_earn_product CHECK ((porcentaje_ganancia >= (0)::numeric)),
    CONSTRAINT limit_price_product CHECK ((precio_compra >= (0)::numeric))
);


ALTER TABLE inventario.productos OWNER TO postgres;

--
-- TOC entry 5299 (class 0 OID 0)
-- Dependencies: 235
-- Name: COLUMN productos.precio_compra; Type: COMMENT; Schema: inventario; Owner: postgres
--

COMMENT ON COLUMN inventario.productos.precio_compra IS 'Guardado en centavos';


--
-- TOC entry 234 (class 1259 OID 99648)
-- Name: productos_id_product_seq; Type: SEQUENCE; Schema: inventario; Owner: postgres
--

CREATE SEQUENCE inventario.productos_id_product_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE inventario.productos_id_product_seq OWNER TO postgres;

--
-- TOC entry 5300 (class 0 OID 0)
-- Dependencies: 234
-- Name: productos_id_product_seq; Type: SEQUENCE OWNED BY; Schema: inventario; Owner: postgres
--

ALTER SEQUENCE inventario.productos_id_product_seq OWNED BY inventario.productos.id_product;


--
-- TOC entry 251 (class 1259 OID 99742)
-- Name: Recarga_telefonica; Type: TABLE; Schema: ventas; Owner: postgres
--

CREATE TABLE ventas."Recarga_telefonica" (
    id_venta_recarga integer NOT NULL,
    id_venta_historial integer NOT NULL,
    cantidad_ganancia numeric(10,2) NOT NULL,
    porcentaje_cobrado numeric(10,2) NOT NULL,
    CONSTRAINT limit_recharge CHECK ((porcentaje_cobrado >= (0)::numeric)),
    CONSTRAINT limit_recharge_earn CHECK ((cantidad_ganancia >= (0)::numeric))
);


ALTER TABLE ventas."Recarga_telefonica" OWNER TO postgres;

--
-- TOC entry 250 (class 1259 OID 99741)
-- Name: Recarga_telefonica_id_venta_recarga_seq; Type: SEQUENCE; Schema: ventas; Owner: postgres
--

CREATE SEQUENCE ventas."Recarga_telefonica_id_venta_recarga_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ventas."Recarga_telefonica_id_venta_recarga_seq" OWNER TO postgres;

--
-- TOC entry 5301 (class 0 OID 0)
-- Dependencies: 250
-- Name: Recarga_telefonica_id_venta_recarga_seq; Type: SEQUENCE OWNED BY; Schema: ventas; Owner: postgres
--

ALTER SEQUENCE ventas."Recarga_telefonica_id_venta_recarga_seq" OWNED BY ventas."Recarga_telefonica".id_venta_recarga;


--
-- TOC entry 249 (class 1259 OID 99733)
-- Name: avances; Type: TABLE; Schema: ventas; Owner: postgres
--

CREATE TABLE ventas.avances (
    id_venta_avance integer NOT NULL,
    id_venta_historial integer NOT NULL,
    cantidad_ganancia numeric(10,2) NOT NULL,
    porcentaje_cobrado numeric(10,2) NOT NULL,
    CONSTRAINT limit_cash CHECK ((porcentaje_cobrado >= (0)::numeric)),
    CONSTRAINT limit_cash_earn CHECK ((cantidad_ganancia >= (0)::numeric))
);


ALTER TABLE ventas.avances OWNER TO postgres;

--
-- TOC entry 248 (class 1259 OID 99732)
-- Name: avances_id_venta_avance_seq; Type: SEQUENCE; Schema: ventas; Owner: postgres
--

CREATE SEQUENCE ventas.avances_id_venta_avance_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ventas.avances_id_venta_avance_seq OWNER TO postgres;

--
-- TOC entry 5302 (class 0 OID 0)
-- Dependencies: 248
-- Name: avances_id_venta_avance_seq; Type: SEQUENCE OWNED BY; Schema: ventas; Owner: postgres
--

ALTER SEQUENCE ventas.avances_id_venta_avance_seq OWNED BY ventas.avances.id_venta_avance;


--
-- TOC entry 259 (class 1259 OID 99788)
-- Name: devolucion; Type: TABLE; Schema: ventas; Owner: postgres
--

CREATE TABLE ventas.devolucion (
    id_venta_producto integer NOT NULL,
    id_venta_historial integer NOT NULL,
    id_producto integer NOT NULL,
    cantidad integer NOT NULL,
    detalles text,
    motivo integer NOT NULL,
    CONSTRAINT limit_return_amount CHECK ((cantidad >= 0))
);


ALTER TABLE ventas.devolucion OWNER TO postgres;

--
-- TOC entry 258 (class 1259 OID 99787)
-- Name: devolucion_id_venta_producto_seq; Type: SEQUENCE; Schema: ventas; Owner: postgres
--

CREATE SEQUENCE ventas.devolucion_id_venta_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ventas.devolucion_id_venta_producto_seq OWNER TO postgres;

--
-- TOC entry 5303 (class 0 OID 0)
-- Dependencies: 258
-- Name: devolucion_id_venta_producto_seq; Type: SEQUENCE OWNED BY; Schema: ventas; Owner: postgres
--

ALTER SEQUENCE ventas.devolucion_id_venta_producto_seq OWNED BY ventas.devolucion.id_venta_producto;


--
-- TOC entry 255 (class 1259 OID 99761)
-- Name: historial_cierre; Type: TABLE; Schema: ventas; Owner: postgres
--

CREATE TABLE ventas.historial_cierre (
    id_cierre integer NOT NULL,
    id_cierre_visual character varying(500) NOT NULL,
    id_cierre_codigo character varying(250) NOT NULL,
    total numeric(10,2) NOT NULL,
    balance_dia jsonb NOT NULL,
    fecha_cierre timestamp without time zone DEFAULT now(),
    CONSTRAINT limit_close_total CHECK ((total >= (0)::numeric))
);


ALTER TABLE ventas.historial_cierre OWNER TO postgres;

--
-- TOC entry 5304 (class 0 OID 0)
-- Dependencies: 255
-- Name: COLUMN historial_cierre.fecha_cierre; Type: COMMENT; Schema: ventas; Owner: postgres
--

COMMENT ON COLUMN ventas.historial_cierre.fecha_cierre IS 'Fecha y hora exacta del cierre';


--
-- TOC entry 254 (class 1259 OID 99760)
-- Name: historial_cierre_id_cierre_seq; Type: SEQUENCE; Schema: ventas; Owner: postgres
--

CREATE SEQUENCE ventas.historial_cierre_id_cierre_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ventas.historial_cierre_id_cierre_seq OWNER TO postgres;

--
-- TOC entry 5305 (class 0 OID 0)
-- Dependencies: 254
-- Name: historial_cierre_id_cierre_seq; Type: SEQUENCE OWNED BY; Schema: ventas; Owner: postgres
--

ALTER SEQUENCE ventas.historial_cierre_id_cierre_seq OWNED BY ventas.historial_cierre.id_cierre;


--
-- TOC entry 243 (class 1259 OID 99700)
-- Name: historial_ventas; Type: TABLE; Schema: ventas; Owner: postgres
--

CREATE TABLE ventas.historial_ventas (
    id_venta integer NOT NULL,
    id_venta_visual character varying(500) NOT NULL,
    id_venta_codigo character varying(250) NOT NULL,
    dia_fecha timestamp without time zone DEFAULT now(),
    id_metodo integer NOT NULL,
    id_pago_detalles integer NOT NULL,
    total numeric(10,2) NOT NULL,
    CONSTRAINT limit_sells CHECK ((total >= (0)::numeric))
);


ALTER TABLE ventas.historial_ventas OWNER TO postgres;

--
-- TOC entry 5306 (class 0 OID 0)
-- Dependencies: 243
-- Name: COLUMN historial_ventas.id_venta_visual; Type: COMMENT; Schema: ventas; Owner: postgres
--

COMMENT ON COLUMN ventas.historial_ventas.id_venta_visual IS 'Ej: FAC-0001';


--
-- TOC entry 5307 (class 0 OID 0)
-- Dependencies: 243
-- Name: COLUMN historial_ventas.dia_fecha; Type: COMMENT; Schema: ventas; Owner: postgres
--

COMMENT ON COLUMN ventas.historial_ventas.dia_fecha IS 'Fecha y hora exacta de la transacción';


--
-- TOC entry 5308 (class 0 OID 0)
-- Dependencies: 243
-- Name: COLUMN historial_ventas.total; Type: COMMENT; Schema: ventas; Owner: postgres
--

COMMENT ON COLUMN ventas.historial_ventas.total IS 'Total de la venta en centavos/enteros';


--
-- TOC entry 242 (class 1259 OID 99699)
-- Name: historial_ventas_id_venta_seq; Type: SEQUENCE; Schema: ventas; Owner: postgres
--

CREATE SEQUENCE ventas.historial_ventas_id_venta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ventas.historial_ventas_id_venta_seq OWNER TO postgres;

--
-- TOC entry 5309 (class 0 OID 0)
-- Dependencies: 242
-- Name: historial_ventas_id_venta_seq; Type: SEQUENCE OWNED BY; Schema: ventas; Owner: postgres
--

ALTER SEQUENCE ventas.historial_ventas_id_venta_seq OWNED BY ventas.historial_ventas.id_venta;


--
-- TOC entry 261 (class 1259 OID 99798)
-- Name: motivos_devolucion; Type: TABLE; Schema: ventas; Owner: postgres
--

CREATE TABLE ventas.motivos_devolucion (
    id_motivo integer NOT NULL,
    motivo character varying(250) NOT NULL
);


ALTER TABLE ventas.motivos_devolucion OWNER TO postgres;

--
-- TOC entry 260 (class 1259 OID 99797)
-- Name: motivos_devolucion_id_motivo_seq; Type: SEQUENCE; Schema: ventas; Owner: postgres
--

CREATE SEQUENCE ventas.motivos_devolucion_id_motivo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ventas.motivos_devolucion_id_motivo_seq OWNER TO postgres;

--
-- TOC entry 5310 (class 0 OID 0)
-- Dependencies: 260
-- Name: motivos_devolucion_id_motivo_seq; Type: SEQUENCE OWNED BY; Schema: ventas; Owner: postgres
--

ALTER SEQUENCE ventas.motivos_devolucion_id_motivo_seq OWNED BY ventas.motivos_devolucion.id_motivo;


--
-- TOC entry 241 (class 1259 OID 99693)
-- Name: movimiento_caja; Type: TABLE; Schema: ventas; Owner: postgres
--

CREATE TABLE ventas.movimiento_caja (
    id_movimiento integer NOT NULL,
    nombre character varying(100) NOT NULL
);


ALTER TABLE ventas.movimiento_caja OWNER TO postgres;

--
-- TOC entry 5311 (class 0 OID 0)
-- Dependencies: 241
-- Name: COLUMN movimiento_caja.nombre; Type: COMMENT; Schema: ventas; Owner: postgres
--

COMMENT ON COLUMN ventas.movimiento_caja.nombre IS 'Ej: Efectivo, Débito, Pago Móvil, Divisa';


--
-- TOC entry 240 (class 1259 OID 99692)
-- Name: movimiento_caja_id_movimiento_seq; Type: SEQUENCE; Schema: ventas; Owner: postgres
--

CREATE SEQUENCE ventas.movimiento_caja_id_movimiento_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ventas.movimiento_caja_id_movimiento_seq OWNER TO postgres;

--
-- TOC entry 5312 (class 0 OID 0)
-- Dependencies: 240
-- Name: movimiento_caja_id_movimiento_seq; Type: SEQUENCE OWNED BY; Schema: ventas; Owner: postgres
--

ALTER SEQUENCE ventas.movimiento_caja_id_movimiento_seq OWNED BY ventas.movimiento_caja.id_movimiento;


--
-- TOC entry 257 (class 1259 OID 99776)
-- Name: ofertas; Type: TABLE; Schema: ventas; Owner: postgres
--

CREATE TABLE ventas.ofertas (
    id_oferta integer NOT NULL,
    id_oferta_visible character varying(250) NOT NULL,
    id_producto integer NOT NULL,
    cantidad integer NOT NULL,
    precio_oferta numeric(10,2) NOT NULL,
    oferta_activa boolean DEFAULT true NOT NULL,
    CONSTRAINT limit_offer_amount CHECK ((cantidad >= 0)),
    CONSTRAINT limit_offer_price CHECK ((precio_oferta >= (0)::numeric))
);


ALTER TABLE ventas.ofertas OWNER TO postgres;

--
-- TOC entry 256 (class 1259 OID 99775)
-- Name: ofertas_id_oferta_seq; Type: SEQUENCE; Schema: ventas; Owner: postgres
--

CREATE SEQUENCE ventas.ofertas_id_oferta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ventas.ofertas_id_oferta_seq OWNER TO postgres;

--
-- TOC entry 5313 (class 0 OID 0)
-- Dependencies: 256
-- Name: ofertas_id_oferta_seq; Type: SEQUENCE OWNED BY; Schema: ventas; Owner: postgres
--

ALTER SEQUENCE ventas.ofertas_id_oferta_seq OWNED BY ventas.ofertas.id_oferta;


--
-- TOC entry 247 (class 1259 OID 99724)
-- Name: ofertas_vendidas; Type: TABLE; Schema: ventas; Owner: postgres
--

CREATE TABLE ventas.ofertas_vendidas (
    id_venta_oferta integer NOT NULL,
    id_venta integer NOT NULL,
    id_oferta integer NOT NULL,
    cantidad integer NOT NULL,
    precio_unitario numeric(10,2) NOT NULL,
    CONSTRAINT limit_offer CHECK ((precio_unitario >= (0)::numeric)),
    CONSTRAINT limit_offer_amount CHECK ((cantidad >= 0))
);


ALTER TABLE ventas.ofertas_vendidas OWNER TO postgres;

--
-- TOC entry 246 (class 1259 OID 99723)
-- Name: ofertas_vendidas_id_venta_oferta_seq; Type: SEQUENCE; Schema: ventas; Owner: postgres
--

CREATE SEQUENCE ventas.ofertas_vendidas_id_venta_oferta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ventas.ofertas_vendidas_id_venta_oferta_seq OWNER TO postgres;

--
-- TOC entry 5314 (class 0 OID 0)
-- Dependencies: 246
-- Name: ofertas_vendidas_id_venta_oferta_seq; Type: SEQUENCE OWNED BY; Schema: ventas; Owner: postgres
--

ALTER SEQUENCE ventas.ofertas_vendidas_id_venta_oferta_seq OWNED BY ventas.ofertas_vendidas.id_venta_oferta;


--
-- TOC entry 253 (class 1259 OID 99751)
-- Name: pago_detalles; Type: TABLE; Schema: ventas; Owner: postgres
--

CREATE TABLE ventas.pago_detalles (
    id_pago_detal integer NOT NULL,
    id_venta integer NOT NULL,
    detalles jsonb NOT NULL,
    monto numeric(10,2) NOT NULL,
    CONSTRAINT limit_details_amount CHECK ((monto >= (0)::numeric))
);


ALTER TABLE ventas.pago_detalles OWNER TO postgres;

--
-- TOC entry 252 (class 1259 OID 99750)
-- Name: pago_detalles_id_pago_detal_seq; Type: SEQUENCE; Schema: ventas; Owner: postgres
--

CREATE SEQUENCE ventas.pago_detalles_id_pago_detal_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ventas.pago_detalles_id_pago_detal_seq OWNER TO postgres;

--
-- TOC entry 5315 (class 0 OID 0)
-- Dependencies: 252
-- Name: pago_detalles_id_pago_detal_seq; Type: SEQUENCE OWNED BY; Schema: ventas; Owner: postgres
--

ALTER SEQUENCE ventas.pago_detalles_id_pago_detal_seq OWNED BY ventas.pago_detalles.id_pago_detal;


--
-- TOC entry 263 (class 1259 OID 99805)
-- Name: parametros; Type: TABLE; Schema: ventas; Owner: postgres
--

CREATE TABLE ventas.parametros (
    id_clave integer NOT NULL,
    label text NOT NULL,
    valor numeric(10,2) NOT NULL,
    descripcion text,
    ultima_actualizado timestamp without time zone NOT NULL,
    CONSTRAINT limit_value CHECK ((valor >= (0)::numeric))
);


ALTER TABLE ventas.parametros OWNER TO postgres;

--
-- TOC entry 262 (class 1259 OID 99804)
-- Name: parametros_id_clave_seq; Type: SEQUENCE; Schema: ventas; Owner: postgres
--

CREATE SEQUENCE ventas.parametros_id_clave_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ventas.parametros_id_clave_seq OWNER TO postgres;

--
-- TOC entry 5316 (class 0 OID 0)
-- Dependencies: 262
-- Name: parametros_id_clave_seq; Type: SEQUENCE OWNED BY; Schema: ventas; Owner: postgres
--

ALTER SEQUENCE ventas.parametros_id_clave_seq OWNED BY ventas.parametros.id_clave;


--
-- TOC entry 245 (class 1259 OID 99715)
-- Name: productos_vendidos; Type: TABLE; Schema: ventas; Owner: postgres
--

CREATE TABLE ventas.productos_vendidos (
    id_venta_producto integer NOT NULL,
    id_venta_historial integer NOT NULL,
    id_producto integer NOT NULL,
    cantidad integer NOT NULL,
    precio_unitario numeric(10,2) NOT NULL,
    CONSTRAINT limit_sells_product CHECK ((precio_unitario >= (0)::numeric)),
    CONSTRAINT limit_sells_product_amount CHECK ((cantidad >= 0))
);


ALTER TABLE ventas.productos_vendidos OWNER TO postgres;

--
-- TOC entry 5317 (class 0 OID 0)
-- Dependencies: 245
-- Name: COLUMN productos_vendidos.id_producto; Type: COMMENT; Schema: ventas; Owner: postgres
--

COMMENT ON COLUMN ventas.productos_vendidos.id_producto IS 'FK lógica al módulo de inventario';


--
-- TOC entry 5318 (class 0 OID 0)
-- Dependencies: 245
-- Name: COLUMN productos_vendidos.precio_unitario; Type: COMMENT; Schema: ventas; Owner: postgres
--

COMMENT ON COLUMN ventas.productos_vendidos.precio_unitario IS 'Precio de compra congelado en el momento de la venta';


--
-- TOC entry 244 (class 1259 OID 99714)
-- Name: productos_vendidos_id_venta_producto_seq; Type: SEQUENCE; Schema: ventas; Owner: postgres
--

CREATE SEQUENCE ventas.productos_vendidos_id_venta_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ventas.productos_vendidos_id_venta_producto_seq OWNER TO postgres;

--
-- TOC entry 5319 (class 0 OID 0)
-- Dependencies: 244
-- Name: productos_vendidos_id_venta_producto_seq; Type: SEQUENCE OWNED BY; Schema: ventas; Owner: postgres
--

ALTER SEQUENCE ventas.productos_vendidos_id_venta_producto_seq OWNED BY ventas.productos_vendidos.id_venta_producto;


--
-- TOC entry 4899 (class 2604 OID 99596)
-- Name: refreh_token id_refresh; Type: DEFAULT; Schema: autenticacion; Owner: postgres
--

ALTER TABLE ONLY autenticacion.refreh_token ALTER COLUMN id_refresh SET DEFAULT nextval('autenticacion.refreh_token_id_refresh_seq'::regclass);


--
-- TOC entry 4901 (class 2604 OID 99610)
-- Name: roles id_rol; Type: DEFAULT; Schema: autenticacion; Owner: postgres
--

ALTER TABLE ONLY autenticacion.roles ALTER COLUMN id_rol SET DEFAULT nextval('autenticacion.roles_id_rol_seq'::regclass);


--
-- TOC entry 4896 (class 2604 OID 99579)
-- Name: usuarios id_usuario; Type: DEFAULT; Schema: autenticacion; Owner: postgres
--

ALTER TABLE ONLY autenticacion.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('autenticacion.usuarios_id_usuario_seq'::regclass);


--
-- TOC entry 4934 (class 2604 OID 99834)
-- Name: bancos id_banco; Type: DEFAULT; Schema: currency; Owner: postgres
--

ALTER TABLE ONLY currency.bancos ALTER COLUMN id_banco SET DEFAULT nextval('currency.bancos_id_banco_seq'::regclass);


--
-- TOC entry 4932 (class 2604 OID 99818)
-- Name: historial_tasas id_tasa; Type: DEFAULT; Schema: currency; Owner: postgres
--

ALTER TABLE ONLY currency.historial_tasas ALTER COLUMN id_tasa SET DEFAULT nextval('currency.historial_tasas_id_tasa_seq'::regclass);


--
-- TOC entry 4936 (class 2604 OID 99854)
-- Name: pago_movil id_movil; Type: DEFAULT; Schema: currency; Owner: postgres
--

ALTER TABLE ONLY currency.pago_movil ALTER COLUMN id_movil SET DEFAULT nextval('currency.pago_movil_id_movil_seq'::regclass);


--
-- TOC entry 4938 (class 2604 OID 99864)
-- Name: clientes id_cliente; Type: DEFAULT; Schema: deudores; Owner: postgres
--

ALTER TABLE ONLY deudores.clientes ALTER COLUMN id_cliente SET DEFAULT nextval('deudores.clientes_id_cliente_seq'::regclass);


--
-- TOC entry 4942 (class 2604 OID 99884)
-- Name: cuentas_por_cobrar id_cuenta; Type: DEFAULT; Schema: deudores; Owner: postgres
--

ALTER TABLE ONLY deudores.cuentas_por_cobrar ALTER COLUMN id_cuenta SET DEFAULT nextval('deudores.cuentas_por_cobrar_id_cuenta_seq'::regclass);


--
-- TOC entry 4941 (class 2604 OID 99877)
-- Name: estado_cuenta id_estado; Type: DEFAULT; Schema: deudores; Owner: postgres
--

ALTER TABLE ONLY deudores.estado_cuenta ALTER COLUMN id_estado SET DEFAULT nextval('deudores.estado_cuenta_id_estado_seq'::regclass);


--
-- TOC entry 4945 (class 2604 OID 99909)
-- Name: historial_fiado id_fiado; Type: DEFAULT; Schema: deudores; Owner: postgres
--

ALTER TABLE ONLY deudores.historial_fiado ALTER COLUMN id_fiado SET DEFAULT nextval('deudores.historial_fiado_id_fiado_seq'::regclass);


--
-- TOC entry 4946 (class 2604 OID 99916)
-- Name: historial_pagos id_pago; Type: DEFAULT; Schema: deudores; Owner: postgres
--

ALTER TABLE ONLY deudores.historial_pagos ALTER COLUMN id_pago SET DEFAULT nextval('deudores.historial_pagos_id_pago_seq'::regclass);


--
-- TOC entry 4944 (class 2604 OID 99900)
-- Name: productos_fiados id_tabla; Type: DEFAULT; Schema: deudores; Owner: postgres
--

ALTER TABLE ONLY deudores.productos_fiados ALTER COLUMN id_tabla SET DEFAULT nextval('deudores.productos_fiados_id_tabla_seq'::regclass);


--
-- TOC entry 4908 (class 2604 OID 99643)
-- Name: billete_minimo id_billete; Type: DEFAULT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.billete_minimo ALTER COLUMN id_billete SET DEFAULT nextval('inventario.billete_minimo_id_billete_seq'::regclass);


--
-- TOC entry 4905 (class 2604 OID 99632)
-- Name: categorias id_categoria; Type: DEFAULT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.categorias ALTER COLUMN id_categoria SET DEFAULT nextval('inventario.categorias_id_categoria_seq'::regclass);


--
-- TOC entry 4915 (class 2604 OID 99681)
-- Name: historial id_historial; Type: DEFAULT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.historial ALTER COLUMN id_historial SET DEFAULT nextval('inventario.historial_id_historial_seq'::regclass);


--
-- TOC entry 4902 (class 2604 OID 99621)
-- Name: medidas id_medida; Type: DEFAULT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.medidas ALTER COLUMN id_medida SET DEFAULT nextval('inventario.medidas_id_medida_seq'::regclass);


--
-- TOC entry 4914 (class 2604 OID 99672)
-- Name: movimientos id_movimiento; Type: DEFAULT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.movimientos ALTER COLUMN id_movimiento SET DEFAULT nextval('inventario.movimientos_id_movimiento_seq'::regclass);


--
-- TOC entry 4909 (class 2604 OID 99652)
-- Name: productos id_product; Type: DEFAULT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.productos ALTER COLUMN id_product SET DEFAULT nextval('inventario.productos_id_product_seq'::regclass);


--
-- TOC entry 4923 (class 2604 OID 99745)
-- Name: Recarga_telefonica id_venta_recarga; Type: DEFAULT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas."Recarga_telefonica" ALTER COLUMN id_venta_recarga SET DEFAULT nextval('ventas."Recarga_telefonica_id_venta_recarga_seq"'::regclass);


--
-- TOC entry 4922 (class 2604 OID 99736)
-- Name: avances id_venta_avance; Type: DEFAULT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.avances ALTER COLUMN id_venta_avance SET DEFAULT nextval('ventas.avances_id_venta_avance_seq'::regclass);


--
-- TOC entry 4929 (class 2604 OID 99791)
-- Name: devolucion id_venta_producto; Type: DEFAULT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.devolucion ALTER COLUMN id_venta_producto SET DEFAULT nextval('ventas.devolucion_id_venta_producto_seq'::regclass);


--
-- TOC entry 4925 (class 2604 OID 99764)
-- Name: historial_cierre id_cierre; Type: DEFAULT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.historial_cierre ALTER COLUMN id_cierre SET DEFAULT nextval('ventas.historial_cierre_id_cierre_seq'::regclass);


--
-- TOC entry 4918 (class 2604 OID 99703)
-- Name: historial_ventas id_venta; Type: DEFAULT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.historial_ventas ALTER COLUMN id_venta SET DEFAULT nextval('ventas.historial_ventas_id_venta_seq'::regclass);


--
-- TOC entry 4930 (class 2604 OID 99801)
-- Name: motivos_devolucion id_motivo; Type: DEFAULT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.motivos_devolucion ALTER COLUMN id_motivo SET DEFAULT nextval('ventas.motivos_devolucion_id_motivo_seq'::regclass);


--
-- TOC entry 4917 (class 2604 OID 99696)
-- Name: movimiento_caja id_movimiento; Type: DEFAULT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.movimiento_caja ALTER COLUMN id_movimiento SET DEFAULT nextval('ventas.movimiento_caja_id_movimiento_seq'::regclass);


--
-- TOC entry 4927 (class 2604 OID 99779)
-- Name: ofertas id_oferta; Type: DEFAULT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.ofertas ALTER COLUMN id_oferta SET DEFAULT nextval('ventas.ofertas_id_oferta_seq'::regclass);


--
-- TOC entry 4921 (class 2604 OID 99727)
-- Name: ofertas_vendidas id_venta_oferta; Type: DEFAULT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.ofertas_vendidas ALTER COLUMN id_venta_oferta SET DEFAULT nextval('ventas.ofertas_vendidas_id_venta_oferta_seq'::regclass);


--
-- TOC entry 4924 (class 2604 OID 99754)
-- Name: pago_detalles id_pago_detal; Type: DEFAULT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.pago_detalles ALTER COLUMN id_pago_detal SET DEFAULT nextval('ventas.pago_detalles_id_pago_detal_seq'::regclass);


--
-- TOC entry 4931 (class 2604 OID 99808)
-- Name: parametros id_clave; Type: DEFAULT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.parametros ALTER COLUMN id_clave SET DEFAULT nextval('ventas.parametros_id_clave_seq'::regclass);


--
-- TOC entry 4920 (class 2604 OID 99718)
-- Name: productos_vendidos id_venta_producto; Type: DEFAULT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.productos_vendidos ALTER COLUMN id_venta_producto SET DEFAULT nextval('ventas.productos_vendidos_id_venta_producto_seq'::regclass);


--
-- TOC entry 4978 (class 2606 OID 99603)
-- Name: refreh_token refreh_token_id_usuario_key; Type: CONSTRAINT; Schema: autenticacion; Owner: postgres
--

ALTER TABLE ONLY autenticacion.refreh_token
    ADD CONSTRAINT refreh_token_id_usuario_key UNIQUE (id_usuario);


--
-- TOC entry 4980 (class 2606 OID 99601)
-- Name: refreh_token refreh_token_pkey; Type: CONSTRAINT; Schema: autenticacion; Owner: postgres
--

ALTER TABLE ONLY autenticacion.refreh_token
    ADD CONSTRAINT refreh_token_pkey PRIMARY KEY (id_refresh);


--
-- TOC entry 4982 (class 2606 OID 99605)
-- Name: refreh_token refreh_token_uuid_key; Type: CONSTRAINT; Schema: autenticacion; Owner: postgres
--

ALTER TABLE ONLY autenticacion.refreh_token
    ADD CONSTRAINT refreh_token_uuid_key UNIQUE (uuid);


--
-- TOC entry 4984 (class 2606 OID 99614)
-- Name: roles roles_id_rol_visual_key; Type: CONSTRAINT; Schema: autenticacion; Owner: postgres
--

ALTER TABLE ONLY autenticacion.roles
    ADD CONSTRAINT roles_id_rol_visual_key UNIQUE (id_rol_visual);


--
-- TOC entry 4986 (class 2606 OID 99616)
-- Name: roles roles_nombre_rol_key; Type: CONSTRAINT; Schema: autenticacion; Owner: postgres
--

ALTER TABLE ONLY autenticacion.roles
    ADD CONSTRAINT roles_nombre_rol_key UNIQUE (nombre_rol);


--
-- TOC entry 4988 (class 2606 OID 99612)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: autenticacion; Owner: postgres
--

ALTER TABLE ONLY autenticacion.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id_rol);


--
-- TOC entry 4970 (class 2606 OID 106621)
-- Name: usuarios usuarios_cedula_key; Type: CONSTRAINT; Schema: autenticacion; Owner: postgres
--

ALTER TABLE ONLY autenticacion.usuarios
    ADD CONSTRAINT usuarios_cedula_key UNIQUE (cedula);


--
-- TOC entry 4972 (class 2606 OID 99589)
-- Name: usuarios usuarios_correo_key; Type: CONSTRAINT; Schema: autenticacion; Owner: postgres
--

ALTER TABLE ONLY autenticacion.usuarios
    ADD CONSTRAINT usuarios_correo_key UNIQUE (correo);


--
-- TOC entry 4974 (class 2606 OID 99587)
-- Name: usuarios usuarios_id_usuario_visual_key; Type: CONSTRAINT; Schema: autenticacion; Owner: postgres
--

ALTER TABLE ONLY autenticacion.usuarios
    ADD CONSTRAINT usuarios_id_usuario_visual_key UNIQUE (id_usuario_visual);


--
-- TOC entry 4976 (class 2606 OID 99585)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: autenticacion; Owner: postgres
--

ALTER TABLE ONLY autenticacion.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 5065 (class 2606 OID 99842)
-- Name: bancos bancos_codigo_banco_key; Type: CONSTRAINT; Schema: currency; Owner: postgres
--

ALTER TABLE ONLY currency.bancos
    ADD CONSTRAINT bancos_codigo_banco_key UNIQUE (codigo_banco);


--
-- TOC entry 5067 (class 2606 OID 99840)
-- Name: bancos bancos_nombre_key; Type: CONSTRAINT; Schema: currency; Owner: postgres
--

ALTER TABLE ONLY currency.bancos
    ADD CONSTRAINT bancos_nombre_key UNIQUE (nombre);


--
-- TOC entry 5069 (class 2606 OID 99838)
-- Name: bancos bancos_pkey; Type: CONSTRAINT; Schema: currency; Owner: postgres
--

ALTER TABLE ONLY currency.bancos
    ADD CONSTRAINT bancos_pkey PRIMARY KEY (id_banco);


--
-- TOC entry 5057 (class 2606 OID 99829)
-- Name: historial_tasas historial_tasas_fecha_tasa_key; Type: CONSTRAINT; Schema: currency; Owner: postgres
--

ALTER TABLE ONLY currency.historial_tasas
    ADD CONSTRAINT historial_tasas_fecha_tasa_key UNIQUE (fecha_tasa);


--
-- TOC entry 5059 (class 2606 OID 99827)
-- Name: historial_tasas historial_tasas_id_tasas_codigo_key; Type: CONSTRAINT; Schema: currency; Owner: postgres
--

ALTER TABLE ONLY currency.historial_tasas
    ADD CONSTRAINT historial_tasas_id_tasas_codigo_key UNIQUE (id_tasas_codigo);


--
-- TOC entry 5061 (class 2606 OID 99825)
-- Name: historial_tasas historial_tasas_id_tasas_visual_key; Type: CONSTRAINT; Schema: currency; Owner: postgres
--

ALTER TABLE ONLY currency.historial_tasas
    ADD CONSTRAINT historial_tasas_id_tasas_visual_key UNIQUE (id_tasas_visual);


--
-- TOC entry 5063 (class 2606 OID 99823)
-- Name: historial_tasas historial_tasas_pkey; Type: CONSTRAINT; Schema: currency; Owner: postgres
--

ALTER TABLE ONLY currency.historial_tasas
    ADD CONSTRAINT historial_tasas_pkey PRIMARY KEY (id_tasa);


--
-- TOC entry 5075 (class 2606 OID 99859)
-- Name: pago_movil pago_movil_id_movil_visual_key; Type: CONSTRAINT; Schema: currency; Owner: postgres
--

ALTER TABLE ONLY currency.pago_movil
    ADD CONSTRAINT pago_movil_id_movil_visual_key UNIQUE (id_movil_visual);


--
-- TOC entry 5077 (class 2606 OID 99857)
-- Name: pago_movil pago_movil_pkey; Type: CONSTRAINT; Schema: currency; Owner: postgres
--

ALTER TABLE ONLY currency.pago_movil
    ADD CONSTRAINT pago_movil_pkey PRIMARY KEY (id_movil);


--
-- TOC entry 5073 (class 2606 OID 99849)
-- Name: tarifas_operadoras tarifas_operadoras_pkey; Type: CONSTRAINT; Schema: currency; Owner: postgres
--

ALTER TABLE ONLY currency.tarifas_operadoras
    ADD CONSTRAINT tarifas_operadoras_pkey PRIMARY KEY (operadora);


--
-- TOC entry 5071 (class 2606 OID 106633)
-- Name: bancos unique_id_view; Type: CONSTRAINT; Schema: currency; Owner: postgres
--

ALTER TABLE ONLY currency.bancos
    ADD CONSTRAINT unique_id_view UNIQUE (id_visible_banco);


--
-- TOC entry 5079 (class 2606 OID 99872)
-- Name: clientes clientes_id_cliente_visual_key; Type: CONSTRAINT; Schema: deudores; Owner: postgres
--

ALTER TABLE ONLY deudores.clientes
    ADD CONSTRAINT clientes_id_cliente_visual_key UNIQUE (id_cliente_visual);


--
-- TOC entry 5081 (class 2606 OID 99870)
-- Name: clientes clientes_pkey; Type: CONSTRAINT; Schema: deudores; Owner: postgres
--

ALTER TABLE ONLY deudores.clientes
    ADD CONSTRAINT clientes_pkey PRIMARY KEY (id_cliente);


--
-- TOC entry 5085 (class 2606 OID 99893)
-- Name: cuentas_por_cobrar cuentas_por_cobrar_id_cuenta_codigo_key; Type: CONSTRAINT; Schema: deudores; Owner: postgres
--

ALTER TABLE ONLY deudores.cuentas_por_cobrar
    ADD CONSTRAINT cuentas_por_cobrar_id_cuenta_codigo_key UNIQUE (id_cuenta_codigo);


--
-- TOC entry 5087 (class 2606 OID 99891)
-- Name: cuentas_por_cobrar cuentas_por_cobrar_id_cuenta_visible_key; Type: CONSTRAINT; Schema: deudores; Owner: postgres
--

ALTER TABLE ONLY deudores.cuentas_por_cobrar
    ADD CONSTRAINT cuentas_por_cobrar_id_cuenta_visible_key UNIQUE (id_cuenta_visible);


--
-- TOC entry 5089 (class 2606 OID 99895)
-- Name: cuentas_por_cobrar cuentas_por_cobrar_id_venta_final_key; Type: CONSTRAINT; Schema: deudores; Owner: postgres
--

ALTER TABLE ONLY deudores.cuentas_por_cobrar
    ADD CONSTRAINT cuentas_por_cobrar_id_venta_final_key UNIQUE (id_venta_final);


--
-- TOC entry 5091 (class 2606 OID 99889)
-- Name: cuentas_por_cobrar cuentas_por_cobrar_pkey; Type: CONSTRAINT; Schema: deudores; Owner: postgres
--

ALTER TABLE ONLY deudores.cuentas_por_cobrar
    ADD CONSTRAINT cuentas_por_cobrar_pkey PRIMARY KEY (id_cuenta);


--
-- TOC entry 5083 (class 2606 OID 99879)
-- Name: estado_cuenta estado_cuenta_pkey; Type: CONSTRAINT; Schema: deudores; Owner: postgres
--

ALTER TABLE ONLY deudores.estado_cuenta
    ADD CONSTRAINT estado_cuenta_pkey PRIMARY KEY (id_estado);


--
-- TOC entry 5095 (class 2606 OID 99911)
-- Name: historial_fiado historial_fiado_pkey; Type: CONSTRAINT; Schema: deudores; Owner: postgres
--

ALTER TABLE ONLY deudores.historial_fiado
    ADD CONSTRAINT historial_fiado_pkey PRIMARY KEY (id_fiado);


--
-- TOC entry 5097 (class 2606 OID 99921)
-- Name: historial_pagos historial_pagos_pkey; Type: CONSTRAINT; Schema: deudores; Owner: postgres
--

ALTER TABLE ONLY deudores.historial_pagos
    ADD CONSTRAINT historial_pagos_pkey PRIMARY KEY (id_pago);


--
-- TOC entry 5093 (class 2606 OID 99904)
-- Name: productos_fiados productos_fiados_pkey; Type: CONSTRAINT; Schema: deudores; Owner: postgres
--

ALTER TABLE ONLY deudores.productos_fiados
    ADD CONSTRAINT productos_fiados_pkey PRIMARY KEY (id_tabla);


--
-- TOC entry 5002 (class 2606 OID 106635)
-- Name: billete_minimo billete_minimo_id_billete_visual_key; Type: CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.billete_minimo
    ADD CONSTRAINT billete_minimo_id_billete_visual_key UNIQUE (id_billete_visual);


--
-- TOC entry 5004 (class 2606 OID 99645)
-- Name: billete_minimo billete_minimo_pkey; Type: CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.billete_minimo
    ADD CONSTRAINT billete_minimo_pkey PRIMARY KEY (id_billete);


--
-- TOC entry 4996 (class 2606 OID 99638)
-- Name: categorias categorias_id_categoria_visual_key; Type: CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.categorias
    ADD CONSTRAINT categorias_id_categoria_visual_key UNIQUE (id_categoria_visual);


--
-- TOC entry 4998 (class 2606 OID 99636)
-- Name: categorias categorias_pkey; Type: CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id_categoria);


--
-- TOC entry 5018 (class 2606 OID 99689)
-- Name: historial historial_id_historial_visual_key; Type: CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.historial
    ADD CONSTRAINT historial_id_historial_visual_key UNIQUE (id_historial_visual);


--
-- TOC entry 5020 (class 2606 OID 99687)
-- Name: historial historial_pkey; Type: CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.historial
    ADD CONSTRAINT historial_pkey PRIMARY KEY (id_historial);


--
-- TOC entry 4990 (class 2606 OID 99627)
-- Name: medidas medidas_id_medida_visual_key; Type: CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.medidas
    ADD CONSTRAINT medidas_id_medida_visual_key UNIQUE (id_medida_visual);


--
-- TOC entry 4992 (class 2606 OID 99625)
-- Name: medidas medidas_pkey; Type: CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.medidas
    ADD CONSTRAINT medidas_pkey PRIMARY KEY (id_medida);


--
-- TOC entry 5012 (class 2606 OID 99676)
-- Name: movimientos movimientos_id_visual_key; Type: CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.movimientos
    ADD CONSTRAINT movimientos_id_visual_key UNIQUE (id_visual);


--
-- TOC entry 5014 (class 2606 OID 99674)
-- Name: movimientos movimientos_pkey; Type: CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.movimientos
    ADD CONSTRAINT movimientos_pkey PRIMARY KEY (id_movimiento);


--
-- TOC entry 5006 (class 2606 OID 99665)
-- Name: productos productos_id_product_visual_key; Type: CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.productos
    ADD CONSTRAINT productos_id_product_visual_key UNIQUE (id_product_visual);


--
-- TOC entry 5008 (class 2606 OID 99663)
-- Name: productos productos_pkey; Type: CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id_product);


--
-- TOC entry 5010 (class 2606 OID 99667)
-- Name: productos productos_product_codigo_barra_key; Type: CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.productos
    ADD CONSTRAINT productos_product_codigo_barra_key UNIQUE (product_codigo_barra);


--
-- TOC entry 5000 (class 2606 OID 106642)
-- Name: categorias unique_name_category; Type: CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.categorias
    ADD CONSTRAINT unique_name_category UNIQUE (nombre);


--
-- TOC entry 4994 (class 2606 OID 106644)
-- Name: medidas unique_name_medi; Type: CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.medidas
    ADD CONSTRAINT unique_name_medi UNIQUE (nombre);


--
-- TOC entry 5016 (class 2606 OID 106646)
-- Name: movimientos unique_name_moviments; Type: CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.movimientos
    ADD CONSTRAINT unique_name_moviments UNIQUE (nombre);


--
-- TOC entry 5037 (class 2606 OID 99749)
-- Name: Recarga_telefonica Recarga_telefonica_pkey; Type: CONSTRAINT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas."Recarga_telefonica"
    ADD CONSTRAINT "Recarga_telefonica_pkey" PRIMARY KEY (id_venta_recarga);


--
-- TOC entry 5035 (class 2606 OID 99740)
-- Name: avances avances_pkey; Type: CONSTRAINT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.avances
    ADD CONSTRAINT avances_pkey PRIMARY KEY (id_venta_avance);


--
-- TOC entry 5051 (class 2606 OID 99796)
-- Name: devolucion devolucion_pkey; Type: CONSTRAINT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.devolucion
    ADD CONSTRAINT devolucion_pkey PRIMARY KEY (id_venta_producto);


--
-- TOC entry 5041 (class 2606 OID 99774)
-- Name: historial_cierre historial_cierre_id_cierre_codigo_key; Type: CONSTRAINT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.historial_cierre
    ADD CONSTRAINT historial_cierre_id_cierre_codigo_key UNIQUE (id_cierre_codigo);


--
-- TOC entry 5043 (class 2606 OID 99772)
-- Name: historial_cierre historial_cierre_id_cierre_visual_key; Type: CONSTRAINT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.historial_cierre
    ADD CONSTRAINT historial_cierre_id_cierre_visual_key UNIQUE (id_cierre_visual);


--
-- TOC entry 5045 (class 2606 OID 99770)
-- Name: historial_cierre historial_cierre_pkey; Type: CONSTRAINT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.historial_cierre
    ADD CONSTRAINT historial_cierre_pkey PRIMARY KEY (id_cierre);


--
-- TOC entry 5025 (class 2606 OID 99713)
-- Name: historial_ventas historial_ventas_id_venta_codigo_key; Type: CONSTRAINT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.historial_ventas
    ADD CONSTRAINT historial_ventas_id_venta_codigo_key UNIQUE (id_venta_codigo);


--
-- TOC entry 5027 (class 2606 OID 99711)
-- Name: historial_ventas historial_ventas_id_venta_visual_key; Type: CONSTRAINT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.historial_ventas
    ADD CONSTRAINT historial_ventas_id_venta_visual_key UNIQUE (id_venta_visual);


--
-- TOC entry 5029 (class 2606 OID 99709)
-- Name: historial_ventas historial_ventas_pkey; Type: CONSTRAINT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.historial_ventas
    ADD CONSTRAINT historial_ventas_pkey PRIMARY KEY (id_venta);


--
-- TOC entry 5053 (class 2606 OID 99803)
-- Name: motivos_devolucion motivos_devolucion_pkey; Type: CONSTRAINT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.motivos_devolucion
    ADD CONSTRAINT motivos_devolucion_pkey PRIMARY KEY (id_motivo);


--
-- TOC entry 5023 (class 2606 OID 99698)
-- Name: movimiento_caja movimiento_caja_pkey; Type: CONSTRAINT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.movimiento_caja
    ADD CONSTRAINT movimiento_caja_pkey PRIMARY KEY (id_movimiento);


--
-- TOC entry 5047 (class 2606 OID 99786)
-- Name: ofertas ofertas_id_oferta_visible_key; Type: CONSTRAINT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.ofertas
    ADD CONSTRAINT ofertas_id_oferta_visible_key UNIQUE (id_oferta_visible);


--
-- TOC entry 5049 (class 2606 OID 99784)
-- Name: ofertas ofertas_pkey; Type: CONSTRAINT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.ofertas
    ADD CONSTRAINT ofertas_pkey PRIMARY KEY (id_oferta);


--
-- TOC entry 5033 (class 2606 OID 99731)
-- Name: ofertas_vendidas ofertas_vendidas_pkey; Type: CONSTRAINT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.ofertas_vendidas
    ADD CONSTRAINT ofertas_vendidas_pkey PRIMARY KEY (id_venta_oferta);


--
-- TOC entry 5039 (class 2606 OID 99759)
-- Name: pago_detalles pago_detalles_pkey; Type: CONSTRAINT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.pago_detalles
    ADD CONSTRAINT pago_detalles_pkey PRIMARY KEY (id_pago_detal);


--
-- TOC entry 5055 (class 2606 OID 99813)
-- Name: parametros parametros_pkey; Type: CONSTRAINT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.parametros
    ADD CONSTRAINT parametros_pkey PRIMARY KEY (id_clave);


--
-- TOC entry 5031 (class 2606 OID 99722)
-- Name: productos_vendidos productos_vendidos_pkey; Type: CONSTRAINT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.productos_vendidos
    ADD CONSTRAINT productos_vendidos_pkey PRIMARY KEY (id_venta_producto);


--
-- TOC entry 5021 (class 1259 OID 123004)
-- Name: idx_historial_moviment_date; Type: INDEX; Schema: inventario; Owner: postgres
--

CREATE INDEX idx_historial_moviment_date ON inventario.historial USING btree (id_movimiento, fecha_hora DESC);


--
-- TOC entry 5099 (class 2606 OID 99922)
-- Name: refreh_token refreh_token_id_usuario_fkey; Type: FK CONSTRAINT; Schema: autenticacion; Owner: postgres
--

ALTER TABLE ONLY autenticacion.refreh_token
    ADD CONSTRAINT refreh_token_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES autenticacion.usuarios(id_usuario) DEFERRABLE;


--
-- TOC entry 5098 (class 2606 OID 99927)
-- Name: usuarios usuarios_rol_fkey; Type: FK CONSTRAINT; Schema: autenticacion; Owner: postgres
--

ALTER TABLE ONLY autenticacion.usuarios
    ADD CONSTRAINT usuarios_rol_fkey FOREIGN KEY (rol) REFERENCES autenticacion.roles(id_rol) DEFERRABLE;


--
-- TOC entry 5117 (class 2606 OID 100052)
-- Name: pago_movil pago_movil_id_banco_fkey; Type: FK CONSTRAINT; Schema: currency; Owner: postgres
--

ALTER TABLE ONLY currency.pago_movil
    ADD CONSTRAINT pago_movil_id_banco_fkey FOREIGN KEY (id_banco) REFERENCES currency.bancos(id_banco) DEFERRABLE;


--
-- TOC entry 5118 (class 2606 OID 100057)
-- Name: pago_movil pago_movil_id_user_fkey; Type: FK CONSTRAINT; Schema: currency; Owner: postgres
--

ALTER TABLE ONLY currency.pago_movil
    ADD CONSTRAINT pago_movil_id_user_fkey FOREIGN KEY (id_user) REFERENCES autenticacion.usuarios(id_usuario) DEFERRABLE;


--
-- TOC entry 5119 (class 2606 OID 100042)
-- Name: cuentas_por_cobrar cuentas_por_cobrar_estado_cuenta_fkey; Type: FK CONSTRAINT; Schema: deudores; Owner: postgres
--

ALTER TABLE ONLY deudores.cuentas_por_cobrar
    ADD CONSTRAINT cuentas_por_cobrar_estado_cuenta_fkey FOREIGN KEY (estado_cuenta) REFERENCES deudores.estado_cuenta(id_estado) DEFERRABLE;


--
-- TOC entry 5120 (class 2606 OID 100012)
-- Name: cuentas_por_cobrar cuentas_por_cobrar_id_cliente_fkey; Type: FK CONSTRAINT; Schema: deudores; Owner: postgres
--

ALTER TABLE ONLY deudores.cuentas_por_cobrar
    ADD CONSTRAINT cuentas_por_cobrar_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES deudores.clientes(id_cliente) DEFERRABLE;


--
-- TOC entry 5121 (class 2606 OID 100037)
-- Name: cuentas_por_cobrar cuentas_por_cobrar_id_venta_final_fkey; Type: FK CONSTRAINT; Schema: deudores; Owner: postgres
--

ALTER TABLE ONLY deudores.cuentas_por_cobrar
    ADD CONSTRAINT cuentas_por_cobrar_id_venta_final_fkey FOREIGN KEY (id_venta_final) REFERENCES ventas.historial_ventas(id_venta) DEFERRABLE;


--
-- TOC entry 5124 (class 2606 OID 100022)
-- Name: historial_fiado historial_fiado_id_cuenta_fkey; Type: FK CONSTRAINT; Schema: deudores; Owner: postgres
--

ALTER TABLE ONLY deudores.historial_fiado
    ADD CONSTRAINT historial_fiado_id_cuenta_fkey FOREIGN KEY (id_cuenta) REFERENCES deudores.cuentas_por_cobrar(id_cuenta) DEFERRABLE;


--
-- TOC entry 5125 (class 2606 OID 100027)
-- Name: historial_pagos historial_pagos_id_cuenta_fkey; Type: FK CONSTRAINT; Schema: deudores; Owner: postgres
--

ALTER TABLE ONLY deudores.historial_pagos
    ADD CONSTRAINT historial_pagos_id_cuenta_fkey FOREIGN KEY (id_cuenta) REFERENCES deudores.cuentas_por_cobrar(id_cuenta) DEFERRABLE;


--
-- TOC entry 5122 (class 2606 OID 100017)
-- Name: productos_fiados productos_fiados_id_cuenta_fkey; Type: FK CONSTRAINT; Schema: deudores; Owner: postgres
--

ALTER TABLE ONLY deudores.productos_fiados
    ADD CONSTRAINT productos_fiados_id_cuenta_fkey FOREIGN KEY (id_cuenta) REFERENCES deudores.historial_fiado(id_fiado) DEFERRABLE;


--
-- TOC entry 5123 (class 2606 OID 100032)
-- Name: productos_fiados productos_fiados_id_producto_fkey; Type: FK CONSTRAINT; Schema: deudores; Owner: postgres
--

ALTER TABLE ONLY deudores.productos_fiados
    ADD CONSTRAINT productos_fiados_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES inventario.productos(id_product) DEFERRABLE;


--
-- TOC entry 5102 (class 2606 OID 99947)
-- Name: historial historial_id_movimiento_fkey; Type: FK CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.historial
    ADD CONSTRAINT historial_id_movimiento_fkey FOREIGN KEY (id_movimiento) REFERENCES inventario.movimientos(id_movimiento) DEFERRABLE;


--
-- TOC entry 5103 (class 2606 OID 99942)
-- Name: historial historial_id_producto_fkey; Type: FK CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.historial
    ADD CONSTRAINT historial_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES inventario.productos(id_product) DEFERRABLE;


--
-- TOC entry 5104 (class 2606 OID 100047)
-- Name: historial historial_id_usuario_fkey; Type: FK CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.historial
    ADD CONSTRAINT historial_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES autenticacion.usuarios(id_usuario) DEFERRABLE;


--
-- TOC entry 5100 (class 2606 OID 99932)
-- Name: productos productos_id_categoria_fkey; Type: FK CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.productos
    ADD CONSTRAINT productos_id_categoria_fkey FOREIGN KEY (id_categoria) REFERENCES inventario.categorias(id_categoria) DEFERRABLE;


--
-- TOC entry 5101 (class 2606 OID 99937)
-- Name: productos productos_id_medida_fkey; Type: FK CONSTRAINT; Schema: inventario; Owner: postgres
--

ALTER TABLE ONLY inventario.productos
    ADD CONSTRAINT productos_id_medida_fkey FOREIGN KEY (id_medida) REFERENCES inventario.medidas(id_medida) DEFERRABLE;


--
-- TOC entry 5111 (class 2606 OID 99972)
-- Name: Recarga_telefonica Recarga_telefonica_id_venta_historial_fkey; Type: FK CONSTRAINT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas."Recarga_telefonica"
    ADD CONSTRAINT "Recarga_telefonica_id_venta_historial_fkey" FOREIGN KEY (id_venta_historial) REFERENCES ventas.historial_ventas(id_venta) DEFERRABLE;


--
-- TOC entry 5110 (class 2606 OID 99967)
-- Name: avances avances_id_venta_historial_fkey; Type: FK CONSTRAINT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.avances
    ADD CONSTRAINT avances_id_venta_historial_fkey FOREIGN KEY (id_venta_historial) REFERENCES ventas.historial_ventas(id_venta) DEFERRABLE;


--
-- TOC entry 5114 (class 2606 OID 100007)
-- Name: devolucion devolucion_id_producto_fkey; Type: FK CONSTRAINT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.devolucion
    ADD CONSTRAINT devolucion_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES inventario.productos(id_product) DEFERRABLE;


--
-- TOC entry 5115 (class 2606 OID 99982)
-- Name: devolucion devolucion_id_venta_historial_fkey; Type: FK CONSTRAINT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.devolucion
    ADD CONSTRAINT devolucion_id_venta_historial_fkey FOREIGN KEY (id_venta_historial) REFERENCES ventas.historial_ventas(id_venta) DEFERRABLE;


--
-- TOC entry 5116 (class 2606 OID 99992)
-- Name: devolucion devolucion_motivo_fkey; Type: FK CONSTRAINT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.devolucion
    ADD CONSTRAINT devolucion_motivo_fkey FOREIGN KEY (motivo) REFERENCES ventas.motivos_devolucion(id_motivo) DEFERRABLE;


--
-- TOC entry 5105 (class 2606 OID 99952)
-- Name: historial_ventas historial_ventas_id_metodo_fkey; Type: FK CONSTRAINT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.historial_ventas
    ADD CONSTRAINT historial_ventas_id_metodo_fkey FOREIGN KEY (id_metodo) REFERENCES ventas.movimiento_caja(id_movimiento) DEFERRABLE;


--
-- TOC entry 5113 (class 2606 OID 100002)
-- Name: ofertas ofertas_id_producto_fkey; Type: FK CONSTRAINT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.ofertas
    ADD CONSTRAINT ofertas_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES inventario.productos(id_product) DEFERRABLE;


--
-- TOC entry 5108 (class 2606 OID 99977)
-- Name: ofertas_vendidas ofertas_vendidas_id_oferta_fkey; Type: FK CONSTRAINT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.ofertas_vendidas
    ADD CONSTRAINT ofertas_vendidas_id_oferta_fkey FOREIGN KEY (id_oferta) REFERENCES ventas.ofertas(id_oferta) DEFERRABLE;


--
-- TOC entry 5109 (class 2606 OID 99987)
-- Name: ofertas_vendidas ofertas_vendidas_id_venta_fkey; Type: FK CONSTRAINT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.ofertas_vendidas
    ADD CONSTRAINT ofertas_vendidas_id_venta_fkey FOREIGN KEY (id_venta) REFERENCES ventas.historial_ventas(id_venta) DEFERRABLE;


--
-- TOC entry 5112 (class 2606 OID 99957)
-- Name: pago_detalles pago_detalles_id_venta_fkey; Type: FK CONSTRAINT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.pago_detalles
    ADD CONSTRAINT pago_detalles_id_venta_fkey FOREIGN KEY (id_venta) REFERENCES ventas.historial_ventas(id_venta) DEFERRABLE;


--
-- TOC entry 5106 (class 2606 OID 99997)
-- Name: productos_vendidos productos_vendidos_id_producto_fkey; Type: FK CONSTRAINT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.productos_vendidos
    ADD CONSTRAINT productos_vendidos_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES inventario.productos(id_product) DEFERRABLE;


--
-- TOC entry 5107 (class 2606 OID 99962)
-- Name: productos_vendidos productos_vendidos_id_venta_historial_fkey; Type: FK CONSTRAINT; Schema: ventas; Owner: postgres
--

ALTER TABLE ONLY ventas.productos_vendidos
    ADD CONSTRAINT productos_vendidos_id_venta_historial_fkey FOREIGN KEY (id_venta_historial) REFERENCES ventas.historial_ventas(id_venta) DEFERRABLE;


-- Completed on 2026-10-20 19:41:57

--
-- PostgreSQL database dump complete
--

