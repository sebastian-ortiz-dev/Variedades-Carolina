package routes

import(
	"github.com/gin-gonic/gin"
	"variedades_carolina/src/inventory/handlers"
)

func RegisterMeasurementUnits(measurementGroups *gin.RouterGroup){
	measurementGroups.GET("/measurement-units", handlers.ListMeasurementunits)
	measurementGroups.POST("/measurement-units", handlers.CreateMeasurementunits)
	measurementGroups.PATCH("/measurement-units/:id", handlers.UpdateMeasurementunit)
	measurementGroups.DELETE("/measurement-units/:id", handlers.DeleteMeasurementunit)
}