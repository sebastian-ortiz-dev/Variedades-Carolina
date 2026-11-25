package models

// Iva representa una alícuota de IVA almacenada en la base de datos.
type Iva struct {
	ID      int    `db:"id" json:"-"`
	IdVista string `db:"id_vista" json:"id_vista"`
	Valor   int64  `db:"iva" json:"iva"`
}
