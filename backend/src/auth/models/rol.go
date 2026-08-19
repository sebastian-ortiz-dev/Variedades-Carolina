package models

type Rol struct {
	IDRol       int    `db:"id_rol" json:"id_rol"`
	IDRolVisual string `db:"id_rol_visual" json:"id_rol_visual"`
	NombreRol   string `db:"nombre_rol" json:"nombre_rol"`
}
