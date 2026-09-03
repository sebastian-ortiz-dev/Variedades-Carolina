package services

import (
	"context"
	"fmt"
	"net/http"
	"variedades_carolina/src/errors"
	"variedades_carolina/src/inventory/DTOs"
	"variedades_carolina/src/inventory/repository"
	"variedades_carolina/src/secure"
)

func GetOneProduct(ctx context.Context, id string) (*DTOs.ListInventory, error){
	product, err := repository.GetProductById(ctx, id)

	if err != nil{
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "No existe el producto.", Codigo:"INTERNAL_SERVER_ERROR"}
		return nil, error_http
	}

	productDto := &DTOs.ListInventory{IdVisual: product.IdVisual, CodeBearer: product.CodeBearer, Nombre: product.Nombre, Cantidad: product.Cantidad, Precio_Com: product.Precio_Com, Porcentaje_Gan: product.Porcentaje_Gan, Descripcion: product.Descripcion, Categoria: product.Categoria, Medida: product.Medida, UltimoMovi: product.UltimoMovi, CantidadMinima: product.CantidadMinima, FechaCreacion: product.FechaCreacion, Borrado: product.Borrado,}

	return productDto, nil
}

func SearchProducts(ctx context.Context, q string) (*[]DTOs.ListInventory, error){
	products, err := repository.PorductSearch(ctx, q)

	if err != nil{
		fmt.Println(err)
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "No existe el producto.", Codigo:"INTERNAL_SERVER_ERROR"}
		return nil, error_http
	}

	var listProducts []DTOs.ListInventory
	for _, product := range *products{
		productCurrent := &DTOs.ListInventory{IdVisual: product.IdVisual, CodeBearer: product.CodeBearer, Nombre: product.Nombre, Cantidad: product.Cantidad, Precio_Com: product.Precio_Com, Porcentaje_Gan: product.Porcentaje_Gan, Categoria: product.Categoria, Medida: product.Medida,}
		listProducts = append(listProducts, *productCurrent)
	}

	return &listProducts, nil
}

func UpdateProductById(ctx context.Context, id string, data *DTOs.UpdateProduct) error{
	id_medida, err := secure.Desencrypt(*data.Medida)
	id_categoria, err := secure.Desencrypt(*data.Categoria)

	if err != nil{
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "No existe la categoria o medida.", Codigo:"INTERNAL_SERVER_ERROR"}
		return error_http
	}

	erro := repository.UpdateProduct(ctx, id, data, id_categoria, id_medida)

	if erro != nil{
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "No existe el producto.", Codigo:"INTERNAL_SERVER_ERROR"}
		return error_http
	}

	return nil

}

func DeleteProductById(ctx context.Context, id string) error{
	err := repository.DeleteProduct(ctx, id)

	if err != nil{
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "El producto no fue eliminado.", Codigo:"INTERNAL_SERVER_ERROR"}
		return error_http
	}

	return nil
}

func GetAlerMinumum(ctx context.Context) (*DTOs.AlertCount, error){
	amount, err := repository.GetProductMinum(ctx)

	if err != nil{
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "No se pudo obtener los productos minimos.", Codigo:"INTERNAL_SERVER_ERROR"}
		return nil, error_http
	}

	minimumDto := &DTOs.AlertCount{Alert: amount}

	return minimumDto, nil
}