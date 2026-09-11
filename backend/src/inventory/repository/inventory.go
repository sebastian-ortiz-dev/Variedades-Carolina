package repository

import (
	"context"
	"fmt"
	"time"
	"variedades_carolina/src/config"
	"variedades_carolina/src/inventory/DTOs"
	"variedades_carolina/src/inventory/models"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

func GetCatalogProduct(ctx context.Context, categoria string, LowStock bool, cursor int, limit string, q string) (*[]models.Inventory, int, bool, error){
	db := config.Poolglobal
	pool := db.Getpool()
	sql := "SELECT p.id_product, p.id_product_visual, p.product_codigo_barra, p.nombre, p.imagen, p.cantidad, p.precio_compra, p.porcentaje_ganancia, c.nombre, m.nombre FROM inventario.productos p LEFT JOIN inventario.categorias c ON p.id_categoria=c.id_categoria LEFT JOIN inventario.medidas m ON p.id_medida=m.id_medida WHERE "

	has := "SELECT p.id_product_visual FROM inventario.productos p LEFT JOIN inventario.categorias c ON p.id_categoria=c.id_categoria LEFT JOIN inventario.medidas m ON p.id_medida=m.id_medida WHERE "
	
	queryBuild, sqlRow, dataDb, dataRow := BuildCatalogQuery(sql, has, categoria, LowStock, cursor, limit, q)

	rows, err := pool.Query(ctx, queryBuild, dataDb...)

	if err != nil{
		return nil, 0, false, err
	}
	
	var catalog []models.Inventory
	for rows.Next(){
		var product models.Inventory
		err := rows.Scan(
			&product.Id,
			&product.IdVisual,
			&product.CodeBearer,
			&product.Nombre,
			&product.Imagen,
			&product.Cantidad,
			&product.Precio_Com,
			&product.Porcentaje_Gan,
			&product.Categoria,
			&product.Medida,
		)

		if err != nil{
			return nil,  0, false, err
		}

		catalog = append(catalog, product)
	}

	if err := rows.Err(); err != nil{
		return nil,  0, false, err
	}

	defer rows.Close()

	var product string

	pool.QueryRow(ctx, sqlRow, dataRow...).Scan(&product)

	var hasMore bool
	hasMore = false

	if len(catalog) == 0{
		return &catalog, 0, hasMore, nil
	}

	if catalog[len(catalog)-1].IdVisual != product{
		hasMore = true
	}

	return &catalog, catalog[len(catalog)-1].Id, hasMore, nil
}

func GetProductById(ctx context.Context, id string) (*models.Inventory, error){
	db := config.Poolglobal
	pool := db.Getpool()
	sql := `SELECT p.id_product_visual, p.product_codigo_barra,p.nombre, p.imagen, p.cantidad, p.precio_compra, p.porcentaje_ganancia, p.descripcion, c.nombre, m.nombre,
	p.ultimo_movimiento, p.cantidad_minima, p.fecha_creacion, p.borrado
	FROM inventario.productos p LEFT JOIN inventario.categorias c ON p.id_categoria=c.id_categoria 
	LEFT JOIN inventario.medidas m ON p.id_medida=m.id_medida
	WHERE p.id_product_visual = $1`

	var product models.Inventory
	err := pool.QueryRow(ctx, sql, id).Scan(&product.IdVisual, &product.CodeBearer, &product.Nombre, &product.Imagen, &product.Cantidad, &product.Precio_Com, &product.Porcentaje_Gan, &product.Descripcion, &product.Categoria, &product.Medida, &product.UltimoMovi, &product.CantidadMinima, &product.FechaCreacion, &product.Borrado)

	if err != nil{
		return nil, err
	}

	return &product, nil
}

func UpdateProduct(ctx context.Context, id string, data *DTOs.UpdateProduct, id_categoria int, id_medida int) error{
	db := config.Poolglobal
	pool := db.Getpool()
	sql := "UPDATE inventario.productos SET "

	query, dataDb := BuildUpdate(sql, id, data, id_categoria, id_medida)

	update, err := pool.Exec(ctx, query, dataDb...)

	if err != nil{
		return err
	}

	if update.RowsAffected() == 0{
		return fmt.Errorf("El recurso no fue Actualizado")
	}

	return nil
}

func DeleteProduct(ctx context.Context, id string)  error{
	db := config.Poolglobal
	pool := db.Getpool()
	sql := `UPDATE inventario.productos SET borrado=True WHERE p.id_product_visual = $1 AND p.borrado=False`

	delete, err := pool.Exec(ctx, sql, id)

	if err != nil{
		return err
	}

	if delete.RowsAffected() == 0{
		return fmt.Errorf("El recurso no fue borrado")
	}

	return nil
}

func PorductSearch(ctx context.Context, q string) (*[]models.Inventory, error){
	db := config.Poolglobal
	pool := db.Getpool()
	sql := `SELECT p.id_product_visual, p.nombre, p.imagen, p.cantidad, p.precio_compra, p.porcentaje_ganancia, c.nombre, m.nombre
	FROM inventario.productos p LEFT JOIN inventario.categorias c ON p.id_categoria=c.id_categoria LEFT JOIN inventario.medidas m ON p.id_medida=m.id_medida
	WHERE p.borrado = false AND p.id_product_visual ILIKE $1 OR p.nombre ILIKE $1 OR p.product_codigo_barra ILIKE $1 ORDER BY p.id_product ASC`

	rows, err := pool.Query(ctx, sql, q)

	if err != nil{
		return nil, err
	}

	var inventory []models.Inventory
	for rows.Next(){
		var product models.Inventory
		err := rows.Scan(
			&product.IdVisual,
			&product.Nombre,
			&product.Imagen,
			&product.Cantidad,
			&product.Precio_Com,
			&product.Porcentaje_Gan,
			&product.Categoria,
			&product.Medida,
		)
		if err != nil{
			return nil, err
		}
		inventory = append(inventory, product)
	}

	if err := rows.Err(); err != nil{
		return nil, err
	}

	defer rows.Close()

	return &inventory, nil
}

func GetProductMinum(ctx context.Context) (int, error){
	db := config.Poolglobal
	pool := db.Getpool()
	sql := `SELECT COUNT(p.id_product_visual)
	FROM inventario.productos p LEFT JOIN inventario.categorias c ON p.id_categoria=c.id_categoria 
	LEFT JOIN inventario.medidas m ON p.id_medida=m.id_medida WHERE p.cantidad <= p.cantidad_minima AND p.borrado=False`

	var cantidad int
	err := pool.QueryRow(ctx, sql).Scan(&cantidad)

	if err != nil{
		return 0, err
	}

	return cantidad, nil
}

func GetProductByIdTx(ctx context.Context, id string, pool pgx.Tx) (*models.Inventory, error){
	sql := `SELECT p.id_product, p.cantidad FROM inventario.productos p WHERE p.id_product_visual = $1 AND p.borrado = false FOR UPDATE`

	var product models.Inventory
	err := pool.QueryRow(ctx, sql, id).Scan(&product.Id, &product.Cantidad)

	if err != nil{
		return nil, fmt.Errorf("Error al obtener el producto.")
	}

	return &product, nil
}

func InsertProduct(ctx context.Context, data *DTOs.CreateMovementDTO, categoria int, medida int, pool pgx.Tx) (*models.Inventory, error){
	sql := `INSERT INTO inventario.productos(id_product_visual, product_codigo_barra, nombre, imagen, cantidad, precio_compra, porcentaje_ganancia, descripcion, id_categoria, id_medida, cantidad_minima, fecha_creacion, borrado)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) returning id_product`

	var product models.Inventory

	err := pool.QueryRow(ctx, sql, uuid.New(), data.ProductCodigoBarra, data.Nombre, data.Imagen, data.Quantity, data.PrecioCompra, data.PorcentajeGanancia, data.DescriptionPro, categoria, medida, data.CantidadMinima, time.Now(), false).Scan(&product.Id)

	if err != nil{
		return nil, err
	}

	return &product, nil
}

func UpdateQuantity(ctx context.Context, cantidad int, id int, pool pgx.Tx) error{
	sql := "UPDATE inventario.productos SET cantidad = $1 WHERE id_product = $2"

	update, err := pool.Exec(ctx, sql, cantidad, id)

	if err != nil{
		return err
	}

	if update.RowsAffected() == 0{
		return fmt.Errorf("El recurso no fue Actualizado")
	}

	return nil
}