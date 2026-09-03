package models

type Movimients struct{
	Id				 int		`db:"id_movimiento" json:"-"`
	IdVisual		 string		`db:"id_visual" json:"id_visual"`
	Nombre			 string 	`db:"nombre" json:"nombre"`
}