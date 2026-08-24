package routes

import(
	"github.com/gin-gonic/gin"
	"variedades_carolina/src/inventory/handlers"
)

func RegisterMinimumCash(cashGroup *gin.RouterGroup){
	cashGroup.GET("/settings/minimum-cash", handlers.GetMinimumCash)
	cashGroup.PATCH("/settings/minimum-cash/:id", handlers.SetMinimumCash)
}