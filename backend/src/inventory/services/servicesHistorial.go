package services

import (
	"context"
	"fmt"
	"net/http"
	"variedades_carolina/src/errors"
	"variedades_carolina/src/inventory/DTOs"
	"variedades_carolina/src/inventory/repository"
)

func GetHistorial(ctx context.Context, data *DTOs.HistoryQueryFilterDTO) (*DTOs.PaginatedHistoryResponseDTO, error){
	if data.Page <= 0{
		error_http := &errorHttp.HttpError{Status: http.StatusUnprocessableEntity, Detail: "No existen los registros.", Codigo:"UNPROCESSABLE_ENTITY"}
		return nil, error_http
	}

	total, err := repository.GetItemsHistorial(ctx, data)

	if err != nil{
		fmt.Println(err)
		return nil, fmt.Errorf("Error con calcular las paginas")
	}
	
	if total == 0{
		error_http := &errorHttp.HttpError{Status: http.StatusNotFound, Detail: "No hay registros.", Codigo:"NOT_FOUND"}
		return nil, error_http
	}

	totalPages := (total + data.Limit - 1) / data.Limit

	if data.Page > totalPages{
		error_http := &errorHttp.HttpError{Status: http.StatusNotFound, Detail: "No hay registros.", Codigo:"NOT_FOUND"}
		return nil, error_http
	}

	offset := (data.Page - 1) * data.Limit

	historial, err := repository.ListHistoryalMoviments(ctx, data, offset)

	if err != nil{
		fmt.Println(err)
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "No existen los registros.", Codigo:"INTERNAL_SERVER_ERROR"}
		return nil, error_http
	}

	dataPages := &DTOs.HistoryPaginationMeta{TotalItems: total, TotalPages: totalPages, CurrentPage: data.Page, Limit: data.Limit, PageItemsCount: total}

	list := DTOs.PaginatedHistoryResponseDTO{Data: *historial, Meta: *dataPages}

	return &list, nil
}