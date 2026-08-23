package DTOs

type CreateCategories struct{
	Nombre string `json:"nombre" binding:"required"`
}

type UpdateCategories struct{
	Nombre string `json:"nombre" binding:"required,omitempty"`
}

type ListCategories struct{
	Id string `json:"id"`
	Nombre string `json:"nombre"`
}