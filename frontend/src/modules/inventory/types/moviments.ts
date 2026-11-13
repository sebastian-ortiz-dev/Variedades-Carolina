export interface ListMoviment{
    id: string;
    nombre: string;
}

export interface NewProductDraft {
  nombre: string;
  codigo: string;
  id_categoria: string;
  id_medida: string;
  precio_compra: string;
  porcentaje_ganancia: string;
  cantidad_minima: string;
  descripcion_producto: string;
}

export interface MovementPayload {
  id_tipo_movimiento: string;
  id_producto: string;
  id_usuario: string;
  cantidad: number;
  descripcion?: string;
  product_codigo_barra?: string;
  nombre?: string;
  precio_compra?: number;
  porcentaje_ganancia?: number;
  id_categoria?: string;
  id_medida?: string;
  descripcion_producto?: string;
  cantidad_minima?: number;
  imagen?: string;
}