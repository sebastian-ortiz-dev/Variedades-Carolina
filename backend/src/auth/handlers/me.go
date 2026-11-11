package handlers

import (
	"net/http"
	"variedades_carolina/src/auth/DTOs"
	"variedades_carolina/src/errors"
	"variedades_carolina/src/secure"
	"github.com/gin-gonic/gin"
)

// @Summary      Get the authenticated user
// @Description  Returns the identity of the authenticated user from the validated JWT.
// @Tags         auth
// @Produce      json
// @Security     BearerAuth
// @Success      200 {object} DTOs.Userdata 	  "ok"
// @Failure      401 {object} errorHttp.HttpError "Unauthorized"
// @Failure      500 {object} errorHttp.HttpError "Internal server error"
// @Router       /auth/me [get]
func Me(c *gin.Context) {
	value, exists := c.Get("claims")
	if !exists {
		c.Error(&errorHttp.HttpError{Status: http.StatusUnauthorized, Detail: "No autenticado", Codigo: "UNAUTHORIZED",})
		return
	}

	claims, ok := value.(*secure.ClaimsUser)

	if !ok {
		c.Error(&errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "No se pudieron leer los datos de la sesión", Codigo: "INTERNAL_SERVER_ERROR",})
		return
	}

	user := &DTOs.Userdata{
		Id:    claims.UserId,
		Name:  claims.Nombre,
		Email: claims.Correo,
		Rol:   claims.Rol,
	}

	c.JSON(http.StatusOK, user)
}
