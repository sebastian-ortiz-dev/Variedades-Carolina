package models

import "time"

type Categories struct {
	ID                 int    		`db:"id_categoria" json:"-"`
	IdCategoriesVisual string 		`db:"id_categoria_visual" json:"id_categoria_visual"`
	Nombre             string 		`db:"Nombre" json:"Nombre"`
	FechaCreacion      time.Time 	`db:"fecha_creacion" json:"fecha_creacion"`
	Borrado 			bool 		`db:"borrado" json:"borrado"`
}