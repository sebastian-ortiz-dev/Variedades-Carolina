package models

import "time"

type RefreshToken struct {
	IDRefresh int       `db:"id_refresh" json:"id_refresh"`
	IDUsuario int       `db:"id_usuario" json:"id_usuario"`
	UUID      string    `db:"uuid" json:"uuid"`
	Fecha     time.Time `db:"fecha" json:"fecha"`
	Revoked   bool      `db:"revoked" json:"revoked"`
}