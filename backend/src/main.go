package main

import (
	"variedades_carolina/src/auth/routes"
	"variedades_carolina/src/config"
	"variedades_carolina/src/inventory/routes"
	"variedades_carolina/src/middlewares"
	"github.com/joho/godotenv"
)

// @title           API de Variedades Carolina
// @version         1.0
// @description     Servicio backend de autenticación y gestión.
// @termsOfService  http://swagger.io/terms/

// @Basepath /api/v1

// @contact.name API Support
// @contact.url http://www.swagger.io/support
// @contact.email support@swagger.io

// @license.name  Apache 2.0
// @license.url   http://www.apache.org/licenses/LICENSE-2.0.html

// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
// @description Escribe 'Bearer ' seguido de tu token JWT Ejemplo: "Bearer tokenJWT"

func main(){
	// bring the gin engine and configuration
	r := config.Config_gin()

	if err := godotenv.Load("../.env"); err != nil{
		panic("Error al cargar los archivos")
	}

	// Start the db connection pool
	config.Database_init()

	VL := r.Group("/api/v1")
	routesLogin.RegisterLogin(VL)
	
	// routes group
	v1 := r.Group("/api/v1")
	v1.Use(middlewares.Validatejwt())
	{
		// routes of inventory module
		routes.Registerinventory(v1)
	}

	// run application
	r.Run(":8082")
	defer config.Poolglobal.Getpool().Close()
}
