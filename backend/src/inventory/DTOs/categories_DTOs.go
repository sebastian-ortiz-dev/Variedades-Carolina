package dtos

type CreateCategories struct{
	Nombre string `json:"nombre" binding:"required"`
}

type ListCategories struct{
	Id string `json:"id"`
	Nombre string `json:"nombre"`
}