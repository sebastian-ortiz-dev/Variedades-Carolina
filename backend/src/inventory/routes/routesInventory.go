package routes

import(
	"github.com/gin-gonic/gin"
	"variedades_carolina/src/inventory/handlers"
)

func RegisterProducts(productsGroups *gin.RouterGroup){
	productsGroups.GET("/products/:id", handlers.GetOneProduct)
	productsGroups.GET("/products/alerts", handlers.GetProductAlert)
	productsGroups.GET("/products/search", handlers.SearchProductsByQ)
	productsGroups.PATCH("/products/:id", handlers.UpdateProduct)
	productsGroups.DELETE("/products/:id", handlers.DeleteProduct)
}