package DTOs

import "time"

type ListInventory struct{
	IdVisual        string  	`json:"id_product_visual"`
	CodeBearer      string  	`json:"product_codigo_barra"`
	Nombre          string  	`json:"nombre"`
	Imagen			string		`json:"imagen"`
	Cantidad        int     	`json:"cantidad"`
	Precio_Com      float64 	`json:"precio_compra"`
	Porcentaje_Gan  float64 	`json:"porcentaje_ganancia"`
	Descripcion     string  	`json:"descripcion"`
	Categoria    	string     	`json:"categoria"`
	Medida       	string     	`json:"medida"`
	UltimoMovi     	bool    	`json:"ultimo_movimiento"`
	CantidadMinima 	int     	`json:"cantidad_minima"`
	FechaCreacion  	time.Time	`json:"fecha_creacion"`
	Borrado			bool		`json:"borrado"`
}

type GetInventoryCatalog struct{
	IdVisual        string  	`json:"id_product_visual"`
	CodeBearer      string  	`json:"product_codigo_barra"`
	Nombre          string  	`json:"nombre"`
	Imagen			string		`json:"imagen"`
	Cantidad        int     	`json:"cantidad"`
	Precio_Com      float64 	`json:"precio_compra"`
	Porcentaje_Gan  float64 	`json:"porcentaje_ganancia"`
	Categoria    	string     	`json:"categoria"`
	Medida       	string     	`json:"medida"`
}

type ListCatalogComplete struct{
	Products		[]GetInventoryCatalog	`json:"products"`
	NextCursor		*string					`json:"nextCursor"`
	HasMore			bool					`json:"more"`
}

type ListParameters struct{
	Q 				string 	`form:"q"`
	Cursor 			string		`form:"cursor"`
	Limit			string		`form:"limit" binding:"required"`
	Categoria		string		`form:"categoria"`
	LowStock		*bool		`form:"lowStock" binding:"required"`
}

type UpdateProduct struct{
	CodeBearer      *string  	`json:"product_codigo_barra"`
	Nombre          *string  	`json:"nombre"`
	Imagen			*string		`json:"imagen"`
	Precio_Com      *float64 	`json:"precio_compra"`
	Porcentaje_Gan  *float64 	`json:"porcentaje_ganancia"`
	Descripcion     *string  	`json:"descripcion"`
	Categoria    	*string     `json:"categoria"`
	Medida       	*string     `json:"medida"`
	CantidadMinima 	*int     	`json:"cantidad_minima"`
}

type AlertCount struct{
	Alert 			int			`json:"Alert_count"`
}