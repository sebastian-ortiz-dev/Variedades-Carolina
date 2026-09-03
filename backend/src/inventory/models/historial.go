package models

import "time"

type InventoryHistory struct {
	Id                int       `db:"id_historial" json:"-"`
	IdHistorialVisual string    `db:"id_historial_visual" json:"id_historial_visual"`
	IdHistorialCodigo string    `db:"id_historial_codigo" json:"id_historial_codigo"`
	IdMovimiento      int       `db:"id_movimiento" json:"id_movimiento"`
	IdProducto        int       `db:"id_producto" json:"id_producto"`
	Cantidad          int       `db:"cantidad" json:"cantidad"`
	IdUsuario         int       `db:"id_usuario" json:"id_usuario"`
	Descripcion       string    `db:"descripcion" json:"descripcion"`
	FechaHora         time.Time `db:"fecha_hora" json:"fecha_hora"`
}