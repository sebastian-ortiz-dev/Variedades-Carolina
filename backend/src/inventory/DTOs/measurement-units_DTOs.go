package dtos

type CreateMeasurentUnit struct{
	Nombre string `json:"nombre" binding:"required"`
}

type ListMeasurentUnit struct{
	Id string `json:"id"`
	Nombre string `json:"nombre"`
}