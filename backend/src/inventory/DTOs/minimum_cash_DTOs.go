package DTOs

type UpdateMinimum struct{
	MinimumCash float64  `json:"minimim_cash" binding:"required"`
}

type ListMinimumCash struct{
	IdBilleteVisual	string   `json:"id_billete_visual"`
	MinimumCash 	float64  `json:"minimim_cash"`
}