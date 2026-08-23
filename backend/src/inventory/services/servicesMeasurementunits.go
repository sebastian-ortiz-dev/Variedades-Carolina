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

func AllMeasurementunits(ctx context.Context) (*[]DTOs.ListMeasurentUnit, error){
	measurements, err := repository.ListMeasurementunits(ctx)

	if err != nil {
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "No hay medidas existentes", Codigo:"INTERNAL_SERVER_ERROR"}
		return nil, error_http
	}

	var ListMeasurement []DTOs.ListMeasurentUnit
	for _, measurement := range *measurements{
		currentMeasurement := &DTOs.ListMeasurentUnit{Id: measurement.IdMedidaVisual, Nombre: measurement.Nombre}
		ListMeasurement = append(ListMeasurement, *currentMeasurement)
	}

	return &ListMeasurement, nil
}

func CreateMeasurementunits(ctx context.Context, data *DTOs.CreateMeasurentUnit) (*DTOs.ListMeasurentUnit, error){
	measurement, err := repository.CreateMeasurementunits(ctx, uuid.New().String(), data.Nombre, time.Now())

	if err != nil{
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "Ocurrio un error al crear la medida.", Codigo:"INTERNAL_SERVER_ERROR"}
		return nil, error_http
	}

	measurementUnit := &DTOs.ListMeasurentUnit{Id: measurement.IdMedidaVisual, Nombre: measurement.Nombre}

	return measurementUnit, nil
}

func UpdateMeasurementunit(ctx context.Context,id string, data *DTOs.UpdateMeasurentUnit) error{
	err := repository.UpdateMeasurentUnit(ctx, id, data.Nombre)

	if err != nil{
		error_http :=  &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "Ocurrio un error al actualizar la medida.", Codigo:"INTERNAL_SERVER_ERROR"}
		return error_http
	}

	return nil
}

func DeleteMeasurementunit(ctx context.Context, id string) error{
	err := repository.DeleteteMeasurentUnit(ctx, id)

	if err != nil{
		error_http :=  &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "Ocurrio un error al borrar la medida.", Codigo:"INTERNAL_SERVER_ERROR"}
		return error_http
	}

	return nil
}