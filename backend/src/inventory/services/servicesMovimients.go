package services

import (
	"context"
	"fmt"
	"net/http"
	"variedades_carolina/src/config"
	"variedades_carolina/src/errors"
	"variedades_carolina/src/inventory/DTOs"
	"variedades_carolina/src/inventory/repository"
)

func GetAllMoviments(ctx context.Context) (*[]DTOs.AllMovimients, error){
	moviment, err := repository.GetMoviments(ctx)

	if err != nil{
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "No existen los movimientoss.", Codigo:"INTERNAL_SERVER_ERROR"}
		return nil, error_http
	}

	var movimentsList []DTOs.AllMovimients

	for _, currentMovimient := range *moviment{
		movimentGet := &DTOs.AllMovimients{Id: currentMovimient.IdVisual, Nombre: currentMovimient.Nombre}
		movimentsList = append(movimentsList, *movimentGet)
	}

	return &movimentsList, nil
}

func ExecMoviment(ctx context.Context, data *DTOs.CreateMovementDTO) error{
	db := config.Poolglobal
	pool := db.Getpool()

	tx, err := pool.Begin(ctx)

	if err != nil {
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "Error al conectar con el servicio.", Codigo:"INTERNAL_SERVER_ERROR"}
		return error_http
	}

	moviment, err := repository.GetOneMoviment(ctx, data.MovementTypeID, tx)

	if err != nil{
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "No existe el movimiento.", Codigo:"INTERNAL_SERVER_ERROR"}
		return error_http
	}

	producto, err := repository.GetProductByIdTx(ctx, data.ProductID, tx)
	
	if err != nil{
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "No existe el producto.", Codigo:"INTERNAL_SERVER_ERROR"}
		return error_http
	}

	usuario, err := repository.GetOneUser(ctx, data.UserID, tx)
	fmt.Println(err)

	if err != nil{
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "No existe el usuario.", Codigo:"INTERNAL_SERVER_ERROR"}
		return error_http
	}

	amount, erro := execadjust(moviment.Id, producto.Cantidad, data.Quantity)

	if erro != nil {
		return  erro
	}

	err = repository.UpdateQuantity(ctx, amount, producto.Id, tx)

	if err != nil{
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "No se ejecuto la accion.", Codigo:"INTERNAL_SERVER_ERROR"}
		return error_http
	}

	accion := repository.InsertRecord(ctx, tx, moviment.Id, producto.Id, data.Quantity, usuario, data.Description)

	if accion != nil{
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "No se registro la accion.", Codigo:"INTERNAL_SERVER_ERROR"}
		return error_http
	}

	if err_commit := tx.Commit(ctx); err_commit != nil{
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "No se ejecuto la accion.", Codigo:"INTERNAL_SERVER_ERROR"}
		return error_http
	}

	defer tx.Rollback(ctx)

	return nil
}

func execadjust(moviment int, producto int, cantidad int) (int, error){
	if moviment == 1 || moviment == 3 || moviment == 5{
		producto += cantidad
		return producto, nil
	} else if moviment == 2 || moviment == 4 || moviment == 6{

		if cantidad > producto{
			error_http := &errorHttp.HttpError{Status: http.StatusUnprocessableEntity, Detail: "No hay suficiente stock disponible para completar la orden.", Codigo:"UNPROCESSABLE_ENTITY"}
			return 0, error_http
		}

		producto -= cantidad
		return producto, nil
	} else{
			error_http := &errorHttp.HttpError{Status: http.StatusNotFound, Detail: "No existe el movimiento.", Codigo:"NOT_FOUND"}
			return 0, error_http
	}
}