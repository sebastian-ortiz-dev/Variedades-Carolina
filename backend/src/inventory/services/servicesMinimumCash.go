package services

import(
	"context"
	"net/http"
	"variedades_carolina/src/errors"
	"variedades_carolina/src/inventory/DTOs"
	"variedades_carolina/src/inventory/repository"
)

func ListMinimumCash(ctx context.Context) (*DTOs.ListMinimumCash, error){
	cash, err := repository.ListMinimumcash(ctx)

	if err != nil{
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "No existe el billete minimo", Codigo:"INTERNAL_SERVER_ERROR"}
		return nil, error_http
	}

	cashJson := &DTOs.ListMinimumCash{IdBilleteVisual:cash.IdBilleteVisual, MinimumCash: cash.Billete}

	return cashJson, nil
}

func UpdateMinimum(ctx context.Context, data *DTOs.UpdateMinimum, id string) error{
	err := repository.UpdateMinimumCah(ctx, data.MinimumCash, id)

	if err != nil{
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "Ocurrio un error al actualizar la cantidad minima.", Codigo:"INTERNAL_SERVER_ERROR"}
		return error_http
	}

	return nil
}