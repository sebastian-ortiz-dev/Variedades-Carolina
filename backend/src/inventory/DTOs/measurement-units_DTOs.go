package DTOs

type CreateMeasurentUnit struct{
	Nombre string `json:"nombre,omitempty" binding:"required"`
}

type UpdateMeasurentUnit struct{
	Nombre string `json:"nombre" binding:"required,omitempty"`
}

type ListMeasurentUnit struct{
	Id string `json:"id"`
	Nombre string `json:"nombre"`
}