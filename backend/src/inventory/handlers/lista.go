package handlers

import  (
	"net/http"
	"variedades_carolina/src/inventory/services"
	"github.com/gin-gonic/gin"
)


// @Security BearerAuth
// @Summary      Categories
// @Description  List categories.
// @Tags         Test
// @Success      200               
// @router		 /inventory/categories  [get]     
func ListCategories(c *gin.Context ){
	ctx := c.Request.Context()
	categorie, _ := services.AllCategories(ctx)

	c.JSON(http.StatusOK, categorie)
}

// @Security BearerAuth
// @Summary      Test handler
// @Description  Probar handlers con grupos.
// @Tags         Test
// @Success      200              
// @router		 /inventory/modify  [get]
func Modificar(c *gin.Context){
	c.JSON(http.StatusOK, gin.H{
		"Producto": "Desodorante",
		"Precio": 10.00,
		"Stock": 15,
	})
}
