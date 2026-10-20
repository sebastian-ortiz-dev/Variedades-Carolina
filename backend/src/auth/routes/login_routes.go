package routesLogin

import(
	"github.com/gin-gonic/gin"
	"variedades_carolina/src/auth/handlers"
)

func RegisterLogin(logingroup *gin.RouterGroup){
	logingroup.POST("/auth/login", handlers.Login)
	logingroup.POST("/auth/logout", handlers.Logout)
}