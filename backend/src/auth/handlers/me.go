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
	value, exists := c.Get("claim")
	
	if !exists {
		c.Error(&errorHttp.HttpError{Status: http.StatusUnauthorized, Detail: "No autenticado", Codigo: "UNAUTHORIZED",})
		return
	}

	claim, err :=  value.(*secure.ClaimsUser)

	if !err {
		c.Error(&errorHttp.HttpError{Status: http.StatusBadRequest, Detail: "Los datos estan corrompidos", Codigo: "BAD_REQUEST"})
		return
	}

	user := DTOs.Userdata{
		Id: claim.Subject,
		Name: claim.Nombre,
		Email: claim.Correo,
		Imagen: claim.Imagen,
		Rol: claim.Rol,
	}

	c.JSON(http.StatusOK, user)
}
