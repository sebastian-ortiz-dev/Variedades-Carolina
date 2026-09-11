package routes

import (
	"github.com/gin-gonic/gin"
	"variedades_carolina/src/inventory/handlers"
)

func RegisterMoviments(groupMoviments *gin.RouterGroup){
	groupMoviments.GET("/moviments", handlers.GetListMoviments)
	groupMoviments.POST("/moviments", handlers.MovimentExec)
}