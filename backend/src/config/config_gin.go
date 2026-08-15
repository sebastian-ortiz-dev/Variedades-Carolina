package config

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"variedades_carolina/src/middlewares"
	"variedades_carolina/src/errors"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	docs "variedades_carolina/docs"
)

func Config_gin() *gin.Engine{
	// create a gin engine
	r := gin.New()

	// info of swagger
	docs.SwaggerInfo.BasePath = "/api/v1"

	// cors configuration
	cors_config := cors.New(cors.Config{
		AllowOrigins: []string{"https://mi-app-react"},
		AllowMethods: []string{"GET", "POST", "DELETE", "PUT", "PATCH", "HEAD", "OPTIONS"},
		AllowHeaders: []string{"content-type", "Authorization"},
		AllowPrivateNetwork: true,
		AllowCredentials: true,
		AllowBrowserExtensions: true,
	})
	
	// use cors
	r.Use(cors_config)

	// Use middlewares
	r.Use(gin.Logger())
	r.Use(middlewares.Customrecoveryjson())
	r.Use(middlewares.Errorhandler())

	// Handler route not exist. Return error 404
	r.NoRoute(func(c *gin.Context) {
		c.Error(&errorHttp.HttpError{Status: 404, Detail: "El recurso solicitado no existe o fue eliminado.", Codigo:"NOT_FOUND"})
	})

	r.HandleMethodNotAllowed = true
	// Handler no method. Return error 405
	r.NoMethod(func(c *gin.Context) {
		c.Error(&errorHttp.HttpError{Status: 405, Detail: "Metodo no permitido", Codigo:"NOT_ALLOWED"})
	})

	// swagger endpoint
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

	return r
}