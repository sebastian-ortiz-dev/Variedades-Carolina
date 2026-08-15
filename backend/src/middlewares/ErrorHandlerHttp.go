package middlewares

import(
	"errors"
	"net/http"
	"github.com/gin-gonic/gin"
	"variedades_carolina/src/errors"
)

func Errorhandler() gin.HandlerFunc{
	return func(c *gin.Context) {
		defer func() {
			if len(c.Errors) > 0 {
				err := c.Errors.Last().Err

				var httpError *errorHttp.HttpError
				if errors.As(err, &httpError){
					c.AbortWithStatusJSON(httpError.Status, gin.H{
						"type": "https://variedades_carolina.local/errores/transicion-invalida",
						"title": "Transición inválida",
						"detail": httpError.Detail,
						"codigo": httpError.Codigo,
					})
				} else {
					c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
						"type": "https://variedades_carolina.local/errores/transicion-invalida",
						"title": "Transición inválida",
						"detail": "Something went wrong",
						"codigo": "Internal Server Error",
					})
				}
			}
		}()

		c.Next()
	}
}
