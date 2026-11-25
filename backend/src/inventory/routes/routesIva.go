package routes

import (
	"github.com/gin-gonic/gin"
	"variedades_carolina/src/inventory/handlers"
)

func RegisterIva(ivaGroups *gin.RouterGroup) {
	ivaGroups.GET("/iva", handlers.ListIva)
}
