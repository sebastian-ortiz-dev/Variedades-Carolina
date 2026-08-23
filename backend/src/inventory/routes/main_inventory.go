package routes

import (
	"github.com/gin-gonic/gin"
	"variedades_carolina/src/inventory/handlers"
)

func Registerinventory(inventorygroup *gin.RouterGroup){

	inventorygroup.GET("/inventory/categories", handlers.ListCategories)
	inventorygroup.POST("/inventory/categories", handlers.CreateCategorie)
	inventorygroup.PATCH("/inventory/categories/:id", handlers.UpdateCategories)
	inventorygroup.DELETE("/inventory/categories/:id", handlers.DeleteCategories)

	inventorygroup.GET("/inventory/measurement-units", handlers.ListMeasurementunits)
	inventorygroup.POST("inventory/measurement-units", handlers.CreateMeasurementunits)
	inventorygroup.PATCH("/inventory/measurement-units/:id", handlers.UpdateMeasurementunit)
	inventorygroup.DELETE("/inventory/measurement-units/:id", handlers.DeleteMeasurementunit)
}