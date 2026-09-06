package handlers

import (
	"fmt"
	"net/http"
	"variedades_carolina/src/errors"
	"variedades_carolina/src/inventory/DTOs"
	"variedades_carolina/src/inventory/services"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// @Security 	 BearerAuth
// @Summary      Get a products.
// @Description  Get a products.
// @Tags         Inventory
// @Accept		 json
// @Produce      json
// @Param		 Q				query	    string				     false	"Datos de listado"
// @Param		 parameters		query		DTOs.ListParameters		 true	"Datos de listado"
// @Success      200			{object}	DTOs.ListCatalogComplete "ok"
// @Failure		 400			{object}	errorHttp.HttpError		 "bad request"
// @Failure		 500			{object}   	errorHttp.HttpError		 "Internal server error"
// @router		 /inventory/products  [GET]
func ListInventory(c * gin.Context){
	ctx := c.Request.Context()
	q := c.Query("Q")
	if q != ""{
		q += "%"
	} 
	fmt.Println(q)
	cursor := c.Query("cursor")
	limit := c.DefaultQuery("limit", "20")
	categoriaUUID := c.Query("categoria")
	lowStock := c.Query("lowStock")
	fmt.Println(q, categoriaUUID)
	catalogInventory, err := services.ProductCatalog(ctx, categoriaUUID, lowStock, cursor, limit, q)
	
	if err != nil{
		c.Error(err)
		return
	}

	c.JSON(http.StatusOK, catalogInventory)
}

// @Security 	 BearerAuth
// @Summary      Get a product by ID.
// @Description  Get a product by ID.
// @Tags         Inventory
// @Produce      json
// @Param		 id				path   string				   true	 "Id del producto"
// @Success      200			{object}	DTOs.ListInventory 		 "ok"
// @Failure		 400			{object}	errorHttp.HttpError		 "bad request"
// @Failure		 500			{object}   	errorHttp.HttpError		 "Internal server error"
// @router		 /inventory/products/{id}  [GET]
func GetOneProduct(c *gin.Context){
	ctx := c.Request.Context()
	id := c.Param("id")

	if _, err := uuid.Parse(id); err != nil{
		c.Error(&errorHttp.HttpError{Status: http.StatusBadRequest, Detail: "El id enviado es invalido", Codigo: "BAD_REQUEST"})
		return
	}

	product, err := services.GetOneProduct(ctx, id)

	if err != nil{
		c.Error(err)
		return
	}

	c.JSON(http.StatusOK, product)
}

// @Security 	 BearerAuth
// @Summary      Search a product by ID.
// @Description  Search a product by ID.
// @Tags         Inventory
// @Produce      json
// @Param        q      		query     	string  		  false  "Término de búsqueda (código de barras, UUID o nombre)"
// @Success      200			{object}	[]DTOs.ListInventory 	 "ok"
// @Failure		 500			{object}   	errorHttp.HttpError		 "Internal server error"
// @router		 /inventory/products/search  [GET]
func SearchProductsByQ(c *gin.Context){
	ctx := c.Request.Context()
	q := c.Query("q") 
	q += "%"

	products, err := services.SearchProducts(ctx, q)

	if err != nil{
		c.Error(err)
		return
	}

	c.JSON(http.StatusOK, products)
}

// @Security 	 BearerAuth
// @Summary      Update a product by ID.
// @Description  Update a product by ID.
// @Tags         Inventory
// @Accept		 json
// @Produce      json
// @Param		 id				path   			string				true	 "Id del producto"
// @Param		 productData	body			DTOs.UpdateProduct	true	"datos del producto"
// @Success      204			"no content"
// @Failure		 400			{object}	errorHttp.HttpError		 "bad request"
// @Failure		 500			{object}   	errorHttp.HttpError		 "Internal server error"
// @router		 /inventory/products/{id}  [PATCH]
func UpdateProduct(c *gin.Context){
	ctx := c.Request.Context()
	id := c.Param("id")

	if _, err := uuid.Parse(id); err != nil{
		c.Error(&errorHttp.HttpError{Status: http.StatusBadRequest, Detail: "El id enviado es invalido", Codigo: "BAD_REQUEST"})
		return
	}

	var productData *DTOs.UpdateProduct

	if err := c.ShouldBindJSON(&productData); err != nil{
		c.Error(&errorHttp.HttpError{Status: http.StatusBadRequest, Detail: "Los datos enviados son invalidos", Codigo: "BAD_REQUEST"})
		return
	}

	err := services.UpdateProductById(ctx, id, productData)

	if err != nil{
		c.Error(err)
		return
	}

	c.Status(http.StatusNoContent)
}

// @Security 	 BearerAuth
// @Summary      Delete a product by ID.
// @Description  Delete a product by ID.
// @Tags         Inventory
// @Produce      json
// @Param		 id				path   			string		true	 "Id del producto"
// @Success      204			"no content"
// @Failure		 400			{object}	errorHttp.HttpError		 "bad request"
// @Failure		 500			{object}   	errorHttp.HttpError		 "Internal server error"
// @router		 /inventory/products/{id}  [DELETE]
func DeleteProduct(c *gin.Context){
	ctx := c.Request.Context()
	id := c.Param("id")

	if _, err := uuid.Parse(id); err != nil{
		c.Error(&errorHttp.HttpError{Status: http.StatusBadRequest, Detail: "El id enviado es invalido", Codigo: "BAD_REQUEST"})
		return
	}

	err := services.DeleteProductById(ctx, id)

	if err != nil{
		c.Error(err)
		return
	}

	c.Status(http.StatusNoContent)
}

// @Security	BearerAuth
// @Summary      Get products minimum.
// @Description  Get products with amount minimum or less.
// @Tags         Inventory
// @Produce      json
// @Success      200			{object}	DTOs.AlertCount 		 "ok"
// @Failure		 500			{object}   	errorHttp.HttpError		 "Internal server error"
// @router		 /inventory/products/alerts  [GET]
func GetProductAlert(c *gin.Context){
	ctx := c.Request.Context()

	minimum, err := services.GetAlerMinumum(ctx)

	if err != nil{
		c.Error(err)
		return
	}

	c.JSON(http.StatusOK, minimum)
}