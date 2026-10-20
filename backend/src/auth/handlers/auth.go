package handlers

import (
	"net/http"
	"variedades_carolina/src/auth/DTOs"
	"variedades_carolina/src/auth/services"
	"variedades_carolina/src/errors"

	"github.com/gin-gonic/gin"
)

// @Summary      Login users get the JWT token
// @Description  Login of the application and get the token JWT.
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        userdata  body    DTOs.LoginUserEntrydata  true  "Datos del usuario"
// @Success      200	{object}   DTOs.LoginResponseUser	"ok"
// @Failure		 401	{object}   errorHttp.HttpError		"Unauthorized"
// @Failure		 500	{object}   errorHttp.HttpError		"Internal server error"
// @router		 /auth/login [POST]
func Login(c *gin.Context){
	ctx := c.Request.Context()
	var userdata *DTOs.LoginUserEntrydata

	if err := c.ShouldBindJSON(&userdata); err != nil{
		c.Error(&errorHttp.HttpError{Status: http.StatusBadRequest, Detail: "Los datos enviados son invalidos", Codigo: "BAD_REQUEST"})
		return
	}
	
	reponse, cookie, err := services.ProcessLogin(ctx, userdata);

	if err != nil{
		c.Error(err)
		return
	}

	c.SetCookieData(cookie)

	c.JSON(http.StatusOK, reponse)

}

// @Summary      Logout user
// @Description  Logout of the application and erase the token JWT.
// @Tags         auth
// @Produce      json
// @Success      200	"ok"
// @Failure		 500	{object}   errorHttp.HttpError		"Internal server error"
// @router		 /auth/logout [POST]
func Logout(c *gin.Context){
	c.SetCookie("Authorization", "", -1, "/api/v1", "", false, true)

	c.JSON(http.StatusOK, gin.H{"message": "Session cerrada"})
}