export interface historialParameters{
    page: number;  
    limit: number;
    q: string;
    id_tipo_movimiento: string;
    fecha_inicio: string;
    fecha_fin: string;
}

interface Movement {
  cantidad: number;
  descripcion: string;
  fecha_hora: string;
  id_historial_visual: string;
  producto: {
    codigo_barra: string;
    imagen: string;
    nombre: string;
  };
  tipo_movimiento: string; 
  usuario: {
    nombre: string;
  };
}

export interface PaginationMeta {
    data: Movement[];
    meta: {
      current_page: number;
      limit: number;
      page_items_count: number;
      total_items: number;
      total_pages: number;
    }
}