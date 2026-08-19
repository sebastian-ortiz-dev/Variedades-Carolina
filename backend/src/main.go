package main

import (
	"variedades_carolina/src/auth/routes"
	"variedades_carolina/src/config"
	"variedades_carolina/src/inventory/routes"
	"github.com/joho/godotenv"
)

// @BasePath /api/v1

func main(){
	// bring the gin engine and configuration
	r := config.Config_gin()

	if err := godotenv.Load("../.env"); err != nil{
		panic("Error al cargar los archivos")
	}

	// Start the db connection pool
	config.Database_init()

	// routes group
	v1 := r.Group("/api/v1")
	{
		routesLogin.RegisterLogin(v1)
		// routes of inventory module
		routes.Registerinventory(v1)
	}

	// run application
	r.Run(":8082")
	defer config.Poolglobal.Getpool().Close()
}
