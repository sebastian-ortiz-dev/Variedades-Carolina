package handlers

import (
	"net/http"
	"variedades_carolina/src/errors"
	"variedades_carolina/src/inventory/DTOs"
	"variedades_carolina/src/inventory/services"

	"github.com/gin-gonic/gin"
)

// @Security 	 BearerAuth
// @Summary      Get historial records.
// @Description  Get a list of historial records.
// @Tags         Inventory
// @Accept		 json
// @Produce      json
// @Param		 data			query		DTOs.HistoryQueryFilterDTO		 true	"Datos del listado"
// @Success      200			{object}	DTOs.PaginatedHistoryResponseDTO 	"ok"
// @Failure		 400			{object}	errorHttp.HttpError		 			"bad request"
// @Failure		 422			{object}	errorHttp.HttpError		 			"Unprocessable Content"
// @Failure		 500			{object}   	errorHttp.HttpError		 			"Internal server error"
// @router		 /inventory/historial  [GET]
func GetListHistorial(c *gin.Context){
	ctx := c.Request.Context()

	var data DTOs.HistoryQueryFilterDTO
	if err := c.ShouldBindQuery(&data); err != nil{
		c.Error(&errorHttp.HttpError{Status: http.StatusBadRequest, Detail: "Los datos enviados son invalidos", Codigo: "BAD_REQUEST"})
		return
	}
	
	list, err := services.GetHistorial(ctx, &data)

	if err != nil{
		c.Error(err)
		return
	}

	c.JSON(http.StatusOK, list)
}