package services

import (
	"context"
	"net/http"
	"time"
	"variedades_carolina/src/errors"
	"variedades_carolina/src/inventory/DTOs"
	"variedades_carolina/src/inventory/repository"
	"github.com/google/uuid"
)

func AllCategories(ctx context.Context) (*[]DTOs.ListCategories, error){
	categories, err := repository.ListCategories(ctx)
	
	if err != nil{
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "No hay categorias existentes.", Codigo:"INTERNAL_SERVER_ERROR"}
		return nil, error_http
	}

	var allCategories []DTOs.ListCategories
	
	for _, categorie := range *categories{
		current := &DTOs.ListCategories{Id: categorie.IdCategoriesVisual, Nombre: categorie.Nombre}
		allCategories = append(allCategories, *current)
	}

	return &allCategories, nil
}

func CreateCategorie(ctx context.Context, data *DTOs.CreateCategories) (*DTOs.ListCategories, error){
	categorie, err := repository.CreateCategorie(ctx, uuid.New().String(), data.Nombre, time.Now())

	if err != nil{
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "Ocurrio un error al crear la categoria.", Codigo:"INTERNAL_SERVER_ERROR"}
		return nil, error_http
	}

	categorieCreated := &DTOs.ListCategories{Id: categorie.IdCategoriesVisual, Nombre: categorie.Nombre}

	return categorieCreated, nil
}