package routes

import (
	"github.com/gin-gonic/gin"
	"variedades_carolina/src/inventory/handlers"
)

func RegisterCategories(categoriesGroups *gin.RouterGroup){
	categoriesGroups.GET("/categories", handlers.ListCategories)
	categoriesGroups.POST("/categories", handlers.CreateCategorie)
	categoriesGroups.PATCH("/categories/:id", handlers.UpdateCategories)
	categoriesGroups.DELETE("/categories/:id", handlers.DeleteCategories)
}