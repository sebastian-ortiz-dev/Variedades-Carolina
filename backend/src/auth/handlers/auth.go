package handlers

import (
	"net/http"
	"variedades_carolina/src/auth/DTOs"
	"variedades_carolina/src/auth/services"
	"variedades_carolina/src/errors"

	"github.com/gin-gonic/gin"
)

// CreateUser godoc
// @Summary      Login users
// @Description  Login of the application.
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        userdata  body      DTOs.LoginUserEntrydata  true  "Datos del usuario"
// @Success      200
// @router		 /auth/login [POST]
func Login(c *gin.Context){
	ctx := c.Request.Context()
	var userdata *DTOs.LoginUserEntrydata

	if err := c.ShouldBindJSON(&userdata); err != nil{
		c.Error(&errorHttp.HttpError{Status: http.StatusBadRequest, Detail: "Los datos enviados son invalidos", Codigo: "BAD_REQUEST"})
		return
	}
	
	reponse, err := services.ProcessLogin(ctx, userdata)

	if err != nil{
		c.Error(err)
		return
	}

	c.JSON(http.StatusOK, reponse)

}