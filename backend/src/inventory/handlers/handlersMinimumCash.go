package handlers

import (
	"net/http"
	"variedades_carolina/src/errors"
	"variedades_carolina/src/inventory/DTOs"
	"variedades_carolina/src/inventory/services"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// @Security 	 BearerAuth
// @Summary      Minimum cash.
// @Description  List Minimum cash.
// @Tags         Inventory
// @Produce      json
// @Success      200	{object}   DTOs.ListMeasurentUnit	"ok"	
// @Failure		 500	{object}   errorHttp.HttpError		"Internal server error"              
// @router		 /inventory/settings/minimum-cash  [get]     
func GetMinimumCash(c *gin.Context){
	ctx := c.Request.Context()

	cash, err := services.ListMinimumCash(ctx)

	if err != nil{
		c.Error(err)
		return
	}

	c.JSON(http.StatusOK, cash)
}

// @Security 	 BearerAuth
// @Summary      Minimum cash.
// @Description  Update Minimum cash.
// @Tags         Inventory
// @Accept		 json
// @Produce      json
// @Param		 id				path   string				   true	 "Id del cash"
// @Param        dataCash  		body   DTOs.UpdateMinimum      true  "Datos del cash"
// @Success      204			"no content"	
// @Failure		 400			{object}	errorHttp.HttpError		 "bad request"
// @Failure		 500			{object}   	errorHttp.HttpError		 "Internal server error"              
// @router		 /inventory/settings/minimum-cash/{id}  [PATCH]  
func SetMinimumCash(c *gin.Context){
	ctx := c.Request.Context()
	id := c.Param("id")

	if _, err := uuid.Parse(id); err != nil{
		c.Error(&errorHttp.HttpError{Status: http.StatusBadRequest, Detail: "El id enviado es invalido", Codigo: "BAD_REQUEST"})
		return
	}

	var dataCash *DTOs.UpdateMinimum

	if err := c.ShouldBindJSON(&dataCash); err != nil{
		c.Error(&errorHttp.HttpError{Status: http.StatusBadRequest, Detail: "Los datos enviados son invalidos", Codigo: "BAD_REQUEST"})
		return
	}

	err := services.UpdateMinimum(ctx, dataCash, id)

	if err != nil{
		c.Error(err)
		return
	}

	c.Status(http.StatusNoContent)
}