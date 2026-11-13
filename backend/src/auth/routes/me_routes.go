package routesLogin

import(
	"github.com/gin-gonic/gin"
	"variedades_carolina/src/auth/handlers"
)

func RegisterMe(megroup *gin.RouterGroup){
	megroup.GET("/auth/me", handlers.Me)
}
