package services

import (
	"context"
	"net/http"
	"variedades_carolina/src/config"
	"variedades_carolina/src/errors"
	"variedades_carolina/src/inventory/DTOs"
	"variedades_carolina/src/inventory/repository"
	"variedades_carolina/src/secure"
)

func ProductCatalog(ctx context.Context, categoria string, cursorQ string, lowStock bool, limit string, q string) (*DTOs.ListCatalogComplete, error){
	cursor, _ := secure.Desencrypt(cursorQ)

	products, cursor, hasMore, err := repository.GetCatalogProduct(ctx, categoria, lowStock, cursor, limit, q)

	if err != nil{
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "No existen los productos.", Codigo:"INTERNAL_SERVER_ERROR"}
		return nil, error_http
	}
	
	var CatalogProducts []DTOs.GetInventoryCatalog

	for _, current := range *products{
		productCurrent := &DTOs.GetInventoryCatalog{IdVisual: current.IdVisual, CodeBearer: current.CodeBearer, Nombre: current.Nombre, Imagen: current.Imagen, Cantidad: current.Cantidad, Precio_Com: current.Precio_Com, Porcentaje_Gan: current.Porcentaje_Gan, Categoria: current.Categoria, Medida: current.Medida,}
		CatalogProducts = append(CatalogProducts, *productCurrent)
	}
	
	Newcursor, err := secure.Encrypt(cursor)

	if err != nil {
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "No existen los productos.", Codigo:"INTERNAL_SERVER_ERROR"}
		return nil, error_http
	}

	list := DTOs.ListCatalogComplete{Products: CatalogProducts, NextCursor: &Newcursor, HasMore: hasMore}

	return &list, nil
}

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

func CreateProdcut(ctx context.Context, data *DTOs.CreateMovementDTO) error{
	imagenAux := "product_defecto.jpg"
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

	categorie, err := repository.GetOneCategorie(ctx, *data.IDCategoria, tx)

	if err != nil {
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "No existe la categoria.", Codigo:"INTERNAL_SERVER_ERROR"}
		return error_http
	}

	unidad, err := repository.GetOneMeasurentUnit(ctx, *data.IDMedida, tx)

	if err != nil {
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "No existe la medida.", Codigo:"INTERNAL_SERVER_ERROR"}
		return error_http
	}

	if data.Imagen == "" || data.Imagen == "string"{
		data.Imagen = imagenAux
	}

	product, err := repository.InsertProduct(ctx, data, categorie.ID, unidad.ID, tx)

	if err != nil {
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "Fallo al crear el producto.", Codigo:"INTERNAL_SERVER_ERROR"}
		return error_http
	}

	usuario, err := repository.GetOneUser(ctx, data.UserID, tx)

	if err != nil{
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "No existe el usuario.", Codigo:"INTERNAL_SERVER_ERROR"}
		return error_http
	}

	accion := repository.InsertRecord(ctx, tx, moviment.Id, product.Id, data.Quantity, usuario, data.Description)

	if accion != nil{
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "No se registro la accion.", Codigo:"INTERNAL_SERVER_ERROR"}
		return error_http
	}

	if err := tx.Commit(ctx); err != nil{
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "No se ejecuto la accion.", Codigo:"INTERNAL_SERVER_ERROR"}
		return error_http
	}

	defer tx.Rollback(ctx)

	return nil
}