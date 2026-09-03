package DTOs

type MovementFilterDTO struct {
	Preset    string `form:"preset"`     
	StartDate string `form:"start_date"` 
	EndDate   string `form:"end_date"`  
	Type      string `form:"type"`       
	Search    string `form:"q"`          
	Page      int    `form:"page"`
	Limit     int    `form:"limit"`
}