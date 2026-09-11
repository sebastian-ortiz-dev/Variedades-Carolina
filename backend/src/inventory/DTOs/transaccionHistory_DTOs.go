package DTOs

import "time"

type HistoryQueryFilterDTO struct {
	Page             int    `form:"page" binding:"required"`
	Limit            int    `form:"limit" binding:"required"`
	Q           	 string `form:"q"`             
	IDTipoMovimiento string `form:"id_tipo_movimiento"`         
	FechaInicio      string `form:"fecha_inicio" binding:"required"`       
	FechaFin         string `form:"fecha_fin" binding:"required"`          
}

type HistoryItemDTO struct {
	IDHistorialVisual string    `json:"id_historial_visual"`
	TipoMovimiento    string    `json:"tipo_movimiento"`
	Cantidad          int       `json:"cantidad"`
	Descripcion       string    `json:"descripcion"`
	FechaHora         time.Time `json:"fecha_hora"`
	Producto       struct {
		Nombre      string `json:"nombre"`       
		CodigoBarra string `json:"codigo_barra"` 
		Imagen      string `json:"imagen"`       
	} `json:"producto"`
	Usuario struct {
		Nombre string `json:"nombre"` 
	} `json:"usuario"`
}

type HistoryPaginationMeta struct {
	TotalItems     int `json:"total_items"`
	TotalPages     int   `json:"total_pages"`
	CurrentPage    int   `json:"current_page"`
	Limit          int   `json:"limit"`
	PageItemsCount int   `json:"page_items_count"` 
}

type PaginatedHistoryResponseDTO struct {
	Data []HistoryItemDTO      `json:"data"`
	Meta HistoryPaginationMeta `json:"meta"`
}