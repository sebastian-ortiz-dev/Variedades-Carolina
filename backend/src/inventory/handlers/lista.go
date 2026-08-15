package handlers

import  (
	"net/http"
	"github.com/gin-gonic/gin"
)


// CreateUser godoc
// @Summary      Test handler
// @Description  Probar handlers con grupos.
// @Tags         Test
// @Success      200               
// @router		 /inventory/list  [get]     
func Listar(c *gin.Context ){
	c.JSON(http.StatusOK, gin.H{
		"Producto": "Desodorante",
		"Precio": 10.25,
		"Stock": 20,
	})
}

// CreateUser godoc
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
