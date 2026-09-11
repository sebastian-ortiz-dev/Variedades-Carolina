package models

import "time"

type InventoryHistory struct {
	Id                int       `db:"id_historial" json:"-"`
	IdHistorialVisual string    `db:"id_historial_visual" json:"id_historial_visual"`
	Movimiento        string    `db:"id_movimiento" json:"id_movimiento"`
	Producto          string    `db:"id_producto" json:"id_producto"`
	Cantidad          int       `db:"cantidad" json:"cantidad"`
	Usuario           string    `db:"id_usuario" json:"id_usuario"`
	Descripcion       string    `db:"descripcion" json:"descripcion"`
	FechaHora         time.Time `db:"fecha_hora" json:"fecha_hora"`
}