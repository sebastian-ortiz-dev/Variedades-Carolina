package services

import (
	"context"
	"net/http"
	"variedades_carolina/src/errors"
	"variedades_carolina/src/inventory/DTOs"
	"variedades_carolina/src/inventory/repository"
)

func AllIva(ctx context.Context) (*[]DTOs.ListIva, error) {
	alicuotas, err := repository.ListIva(ctx)
	
	if err != nil {
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "Ocurrió un error al obtener las alícuotas de IVA.", Codigo: "INTERNAL_SERVER_ERROR"}
		return nil, error_http
	}

	listIva := make([]DTOs.ListIva, 0, len(*alicuotas))
	for _, alicuota := range *alicuotas {
		listIva = append(listIva, DTOs.ListIva{Id: alicuota.IdVista, Valor: alicuota.Valor})
	}

	return &listIva, nil
}
