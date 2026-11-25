package handlers

import (
	"net/http"
	"variedades_carolina/src/inventory/services"
	_ "variedades_carolina/src/inventory/DTOs"
	_ "variedades_carolina/src/errors"
	"github.com/gin-gonic/gin"
)

// @Security     BearerAuth
// @Summary      IVA rates
// @Description  List the IVA rates available for products.
// @Tags         Inventory
// @Produce      json
// @Success      200	{object}   []DTOs.ListIva		"ok"
// @Failure      500	{object}   errorHttp.HttpError	"Internal server error"
// @router       /inventory/iva  [get]
func ListIva(c *gin.Context) {
	ctx := c.Request.Context()

	alicuotas, err := services.AllIva(ctx)

	if err != nil {
		c.Error(err)
		return
	}

	c.JSON(http.StatusOK, alicuotas)
}
