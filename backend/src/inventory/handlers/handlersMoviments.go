package handlers

import (
	"net/http"
	"variedades_carolina/src/errors"
	"variedades_carolina/src/inventory/DTOs"
	"variedades_carolina/src/inventory/services"
	"github.com/gin-gonic/gin"
)

// @Security 	 BearerAuth
// @Summary      Get moviments.
// @Description  Get list moviments.
// @Tags         Inventory
// @Produce      json
// @Success      200			{object}	DTOs.AllMovimients 		 "ok"
// @Failure		 500			{object}   	errorHttp.HttpError		 "Internal server error"
// @router		 /inventory/moviments  [GET]
func GetListMoviments(c *gin.Context){
	ctx := c.Request.Context()
	moviments, err := services.GetAllMoviments(ctx)

	if err != nil{
		c.Error(err)
		return
	}

	c.JSON(http.StatusOK, moviments)
}

// @Security 	 BearerAuth
// @Summary      Execute moviments.
// @Description  Execute a moviment.
// @Tags         Inventory
// @Accept		 json
// @Produce      json
// @Param		 data			body		DTOs.CreateMovementDTO	true	"Datos del movimiento"
// @Success      204			"no content"
// @Failure		 400			{object}	errorHttp.HttpError		 "bad request"
// @Failure		 404			{object}	errorHttp.HttpError		 "not found"
// @Failure		 422			{object}	errorHttp.HttpError		 "Unprocessable Content"
// @Failure		 500			{object}   	errorHttp.HttpError		 "Internal server error"
// @router		 /inventory/moviments  [POST]
func MovimentExec(c *gin.Context){
	ctx := c.Request.Context()
	var err error
	var data *DTOs.CreateMovementDTO
	const MovementTypeNewProductUUID = "57a0aa74-c5d1-4039-9dcf-ed745c8b975a"

	if err := c.ShouldBindJSON(&data); err != nil{
		c.Error(&errorHttp.HttpError{Status: http.StatusBadRequest, Detail: "Los datos enviados son invalidos", Codigo: "BAD_REQUEST"})
		return
	}

	if data.MovementTypeID == MovementTypeNewProductUUID{
		err = services.CreateProdcut(ctx, data)
	}else{
		err = services.ExecMoviment(ctx, data)
	}

	if err != nil{
		c.Error(err)
		return
	}

	c.Status(http.StatusNoContent)
}