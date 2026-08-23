package handlers

import (
	"net/http"
	"variedades_carolina/src/inventory/DTOs"
	"variedades_carolina/src/errors"
	"variedades_carolina/src/inventory/services"
	"github.com/gin-gonic/gin"
)

// @Security BearerAuth
// @Summary      Categories
// @Description  List categories.
// @Tags         Inventory
// @Produce      json
// @Success      200	{object}   []DTOs.ListCategories	"ok"	
// @Failure		 500	{object}   errorHttp.HttpError		"Internal server error"
// @router		 /inventory/categories  [get]
func ListCategories(c *gin.Context ){
	ctx := c.Request.Context()

	categorie, err := services.AllCategories(ctx)

	if err != nil{
		c.Error(err)
		return
	}

	c.JSON(http.StatusOK, categorie)
}

// @Security BearerAuth
// @Sumary	 Categories
// @Description Create a new categorie.
// @Tags	Inventory
// @Accept       json
// @Produce      json
// @Param        dataCategorie  body    DTOs.CreateCategories  true  "Datos de la categoria"
// @Success      201	{object}   DTOs.ListCategories		"created"	
// @Failure		 500	{object}   errorHttp.HttpError		"Internal server error"
// @router		 /inventory/categories	 [POST]
func CreateCategorie(c *gin.Context){
	ctx := c.Request.Context()
	var dataCategorie *DTOs.CreateCategories

	if err := c.ShouldBindJSON(&dataCategorie); err != nil{
		c.Error(&errorHttp.HttpError{Status: http.StatusBadRequest, Detail: "Los datos enviados son invalidos", Codigo: "BAD_REQUEST"})
		return
	}

	categorie, err := services.CreateCategorie(ctx, dataCategorie)

	if err != nil{
		c.Error(err)
		return
	}

	c.JSON(http.StatusCreated, categorie)
}

// @Security BearerAuth
// @Summary      Measurement units
// @Description  List Measurement units.
// @Tags         Inventory
// @Produce      json
// @Success      200	{object}   []DTOs.ListMeasurentUnit	"ok"	
// @Failure		 500	{object}   errorHttp.HttpError		"Internal server error"              
// @router		 /inventory/measurement-units  [get]     
func ListMeasurementunits(c *gin.Context){
	ctx := c.Request.Context()

	measurements, err := services.AllMeasurementunits(ctx)

	if err != nil{
		c.Error(err)
		return
	}

	c.JSON(http.StatusOK, measurements)
}

// @Security BearerAuth
// @Summary      Measurement units
// @Description  List Measurement units.
// @Tags         Inventory
// @Accept       json
// @Produce      json
// @Param		 dataMeasurent 	body    DTOs.CreateMeasurentUnit	 true	"Datos de la medida"
// @Success      201	{object}   DTOs.ListMeasurentUnit	"created"	
// @Failure		 500	{object}   errorHttp.HttpError		"Internal server error"
// @router		 /inventory/measurement-units	 [POST]
func CreateMeasurementunits(c *gin.Context){
	ctx := c.Request.Context()
	var dataMeasurent *DTOs.CreateMeasurentUnit

	if err := c.ShouldBindJSON(&dataMeasurent); err != nil{
		c.Error(&errorHttp.HttpError{Status: http.StatusBadRequest, Detail: "Los datos enviados son invalidos", Codigo: "BAD_REQUEST"})
		return
	}

	measurent, err := services.CreateMeasurementunits(ctx, dataMeasurent)

	if err != nil{
		c.Error(err)
		return
	}

	c.JSON(http.StatusCreated, measurent)
}