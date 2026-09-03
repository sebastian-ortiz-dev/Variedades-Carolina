package models

import "time"

type Inventory struct {
	Id              int     	`db:"id_product" json:"-"`
	IdVisual        string  	`db:"id_product_visual" json:"id_product_visual"`
	CodeBearer      string  	`db:"product_codigo_barra" json:"product_codigo_barra"`
	Nombre          string  	`db:"nombre" json:"nombre"`
	Imagen			string		`db:"imagen" json:"imagen"`
	Cantidad        int     	`db:"cantidad" json:"cantidad"`
	Precio_Com      float64 	`db:"precio_compra" json:"precio_compra"`
	Porcentaje_Gan  float64 	`db:"porcentaje_ganancia" json:"porcentaje_ganancia"`
	Descripcion     string  	`db:"descripcion" json:"descripcion"`
	Categoria    	string     	`db:"id_categoria" json:"categoria"`
	Medida       	string     	`db:"id_medida" json:"medida"`
	UltimoMovi     	bool    	`db:"ultimo_movimiento" json:"ultimo_movimiento"`
	CantidadMinima 	int     	`db:"cantidad_minima" json:"cantidad_minima"`
	FechaCreacion  	time.Time	`db:"fecha_creacion" json:"fecha_creacion"`
	Borrado			bool		`db:"borrado" json:"borrado"`
}