package models

type Minimum_cash struct{
	Id				 int		`db:"id_billete" json="-"`
	IdBilleteVisual  string     `db:"id_billete_visual" json:"id_billete_visual"`
	Billete 		 float64	`db:"billete" json:"billete"`	
}