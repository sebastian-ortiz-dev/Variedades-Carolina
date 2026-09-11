package DTOs

type AllMovimients struct{
	Id		string	`json:"id"`
	Nombre 	string	`json:"nombre"`
}

type CreateMovementDTO struct {
	MovementTypeID string  `json:"id_tipo_movimiento" validate:"required"` 
	ProductID      string  `json:"id_producto"`        
	UserID         string  `json:"id_usuario" validate:"required"`         
	Quantity       int     `json:"cantidad" validate:"required,gt=0"`      
	Description    *string `json:"descripcion,omitempty"`     
	ProductCodigoBarra *string `json:"product_codigo_barra"`
	Nombre             *string  `json:"nombre"`
	PrecioCompra       *float64 `json:"precio_compra"`
	PorcentajeGanancia *float64 `json:"porcentaje_ganancia"`
	IDCategoria        *string     `json:"id_categoria"`
	IDMedida           *string     `json:"id_medida"`
	DescriptionPro     *string `json:"descripcion_producto"`
	CantidadMinima     *int     `json:"cantidad_minima"`
	Imagen             string  `json:"imagen"`            
}