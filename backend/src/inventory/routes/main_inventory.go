package routes

import (
	"github.com/gin-gonic/gin"
	"variedades_carolina/src/inventory/handlers"
)

func Registerinventory(inventorygroup *gin.RouterGroup){
	inventorygroup.GET("/inventory/categories", handlers.ListCategories)
	inventorygroup.POST("/inventory/categories", handlers.CreateCategorie)
	inventorygroup.GET("/inventory/measurement-units", handlers.ListMeasurementunits)
	inventorygroup.POST("inventory/measurement-units", handlers.CreateMeasurementunits)
}