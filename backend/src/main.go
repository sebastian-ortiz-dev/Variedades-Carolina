package main

import (
	"variedades_carolina/src/inventory/routes"
	"variedades_carolina/src/config"
)
// @BasePath /api/v1

func main(){
	// bring the gin engine and configuration
	r := config.Config_gin()

	// routes group
	v1 := r.Group("/api/v1")
	{
		// routes of inventory module
		routes.Registerinventory(v1)
	}

	// run application
	r.Run(":8082")
}
