package services

import (
	"context"
	"fmt"
	"net/http"
	"variedades_carolina/src/errors"
	"variedades_carolina/src/inventory/DTOs"
	"variedades_carolina/src/inventory/repository"
)

func AllCategories(ctx context.Context) (*[]dtos.ListCategories, error){
	categories, err := repository.ListCategories(ctx)
	
	fmt.Println(*categories, len(*categories))
	if err != nil{
		error_http := &errorHttp.HttpError{Status: http.StatusUnauthorized, Detail: "No hay categorias existentes", Codigo:"UNAUTHORIZED"}
		return nil, error_http
	}

	var allCategories []dtos.ListCategories
	
	for _, categorie := range *categories{
		current := &dtos.ListCategories{Id: categorie.IdCategoriesVisual, Nombre: categorie.Nombre}
		allCategories = append(allCategories, *current)
	}

	return &allCategories, nil
}