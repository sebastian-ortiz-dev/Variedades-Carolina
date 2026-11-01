package DTOs

type CreateMeasurentUnit struct{
	Nombre 			string `json:"nombre,omitempty" binding:"required"`
	Abreviatura		string `json:"abreviatura"  binding:"required"`
	Codigo			string `json:"codigo" binding:"required"`
}

type UpdateMeasurentUnit struct{
	Nombre 			string `json:"nombre" `
	Abreviatura		string `json:"abreviatura" `
	Codigo			string `json:"codigo"`
}

type ListMeasurentUnit struct{
	Id 			string `json:"id"`
	Nombre 		string `json:"nombre"`
	Abreviatura	string `json:"abreviatura"`
}