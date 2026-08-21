package routes

import (
	"github.com/gin-gonic/gin"
	"variedades_carolina/src/inventory/handlers"
)

func Registerinventory(inventorygroup *gin.RouterGroup){
	inventorygroup.GET("/inventory/categories", handlers.ListCategories)
	//inventorygroup.GET("/inventory/measurement-units", handlers.Listar)
	inventorygroup.GET("/inventory/modify", handlers.Modificar)
}