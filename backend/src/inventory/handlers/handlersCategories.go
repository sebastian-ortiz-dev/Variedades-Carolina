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
// @Summary      Categories
// @Description  List categories.
// @Tags         Inventory
// @Produce      json
// @Success      200	{object}   []DTOs.ListCategories	"ok"
// @Failure		 500	{object}   errorHttp.HttpError		"Internal server error"
// @router		 /inventory/categories  [get]
func ListCategories(c *gin.Context){
	ctx := c.Request.Context()

	categorie, err := services.AllCategories(ctx)

	if err != nil{
		c.Error(err)
		return
	}

	c.JSON(http.StatusOK, categorie)
}

// @Security 	 BearerAuth
// @Sumary	 	 Categories
// @Description  Create a new categorie.
// @Tags		 Inventory
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

// @Security	 BearerAuth
// @Sumary	 	 Categories
// @Description  Update a categorie.
// @Tags	 	 Inventory
// @Accept       json
// @Param		 id				path    string				   true	 "Id de la categoria"
// @Param        dataCategorie  body    DTOs.UpdateCategories  true  "Datos de la categoria"
// @Success      204	"no content"	
// @Failure		 500	{object}   errorHttp.HttpError		"Internal server error"
// @router		 /inventory/categories/{id}	 [PATCH]
func UpdateCategories(c *gin.Context){
	ctx := c.Request.Context()
	id := c.Param("id")

	if _, err := uuid.Parse(id); err != nil{
		c.Error(&errorHttp.HttpError{Status: http.StatusBadRequest, Detail: "El id enviado es invalido", Codigo: "BAD_REQUEST"})
		return
	}

	var dataCategorie *DTOs.UpdateCategories

	if err := c.ShouldBindJSON(&dataCategorie); err != nil{
		c.Error(&errorHttp.HttpError{Status: http.StatusBadRequest, Detail: "Los datos enviados son invalidos", Codigo: "BAD_REQUEST"})
		return
	}

	err := services.UpdateCategorie(ctx, id, dataCategorie)

	if err != nil{
		c.Error(err)
		return
	}
	
	c.Status(http.StatusNoContent)
}

// @Security 	 BearerAuth
// @Sumary	 	 Categories
// @Description  Delete a categorie.
// @Tags	 	 Inventory
// @Accept       json
// @Param		 id				path    string				   true	 "Id de la categoria"
// @Success      204	"no content"	
// @Failure		 500	{object}   errorHttp.HttpError		"Internal server error"
// @router		 /inventory/categories/{id}	 [DELETE]
func DeleteCategories(c *gin.Context){
	ctx := c.Request.Context()
	id := c.Param("id")

	if _, err := uuid.Parse(id); err != nil{
		c.Error(&errorHttp.HttpError{Status: http.StatusBadRequest, Detail: "El id enviado es invalido", Codigo: "BAD_REQUEST"})
		return
	}

	err := services.DeleteCategorie(ctx, id)

	if err != nil{
		c.Error(err)
		return
	}
	
	c.Status(http.StatusNoContent)
}