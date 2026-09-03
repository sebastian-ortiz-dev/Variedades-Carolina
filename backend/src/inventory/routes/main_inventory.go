package routes

import (
	"github.com/gin-gonic/gin"
)

// @Tags   inventory
func Registerinventory(inventorygroup *gin.RouterGroup){
	// group of inventory
	groups := inventorygroup.Group("/inventory")
	{
		RegisterProducts(groups)
		RegisterCategories(groups)
		RegisterMeasurementUnits(groups)
		RegisterMinimumCash(groups)
	}
}