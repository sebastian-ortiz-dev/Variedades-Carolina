package routes 

import(
	"github.com/gin-gonic/gin"
	"variedades_carolina/src/inventory/handlers"
)

func RegisterHistorial(groupHistorial *gin.RouterGroup){
	groupHistorial.GET("/historial", handlers.GetListHistorial)
}