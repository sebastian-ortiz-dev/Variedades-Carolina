package models

import "time"

type Usuario struct {
	ID              int       `db:"id" json:"-"`
	IDUsuarioVisual string    `db:"id_usuario_visual" json:"id_usuario_visual"`
	Nombre          string    `db:"nombre" json:"nombre"`
	Password        string    `db:"password" json:"-"` 
	Correo          string    `db:"correo" json:"correo"`
	Cedula          string    `db:"cedula" json:"cedula"`
	Rol             int       `db:"rol" json:"rol"`
	FechaCreacion   time.Time `db:"fecha_creacion" json:"fecha_creacion"`
	Borrado         bool      `db:"borrado" json:"borrado"`
	Imagen          string    `db:"imagen" json:"imagen"`
}