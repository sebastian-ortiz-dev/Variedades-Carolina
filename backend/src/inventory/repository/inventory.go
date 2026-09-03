package repository

import (
	"context"
	"fmt"
	"strings"
	"variedades_carolina/src/config"
	"variedades_carolina/src/inventory/DTOs"
	"variedades_carolina/src/inventory/models"
)

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
	amount := 1
	var values []string
	var dataDb []any
	sql := "UPDATE inventario.productos SET "

	if &data.CodeBearer != nil{
		cadena := fmt.Sprintf("product_codigo_barra = $%d", amount)
		values = append(values, cadena)
		dataDb = append(dataDb, *data.CodeBearer)
		amount += 1
	} else if &data.Nombre != nil{
		cadena := fmt.Sprintf("nombre = $%d", amount)
		values = append(values, cadena)
		dataDb = append(dataDb, *data.Nombre)
		amount += 1
	} else if &data.Imagen != nil{
		cadena := fmt.Sprintf("imagen = $%d", amount)
		values = append(values, cadena)
		dataDb = append(dataDb, *data.Imagen)
		amount += 1
	}  else if &data.Precio_Com != nil{
		cadena := fmt.Sprintf("precio_compra = $%d", amount)
		values = append(values, cadena)
		dataDb = append(dataDb, *data.Precio_Com)
		amount += 1
	} else if &data.Porcentaje_Gan != nil{
		cadena := fmt.Sprintf("porcentaje_ganancia = $%d", amount)
		values = append(values, cadena)
		dataDb = append(dataDb, *data.Porcentaje_Gan)
		amount += 1
	} else if &data.Descripcion != nil{
		cadena := fmt.Sprintf("descripcion = $%d", amount)
		values = append(values, cadena)
		dataDb = append(dataDb, *data.Descripcion)
		amount += 1
	} else if id_categoria != 0 {
		cadena := fmt.Sprintf("id_categoria = $%d", amount)
		values = append(values, cadena)
		dataDb = append(dataDb, id_categoria)
		amount += 1
	} else if id_medida != 0 {
		cadena := fmt.Sprintf("id_medida = $%d", amount)
		values = append(values, cadena)
		dataDb = append(dataDb, id_medida)
		amount += 1
	} else if &data.CantidadMinima != nil{
		cadena := fmt.Sprintf("cantidad_minima = $%d", amount)
		values = append(values, cadena)
		dataDb = append(dataDb, *data.CantidadMinima)
		amount += 1
	}

	cadena := fmt.Sprintf("WHERE id_product_visual=$%d", amount)
	values = append(values, cadena)

	build := strings.Join(values, ", ")
	query := sql + build

	update, err := pool.Exec(ctx, query, dataDb)

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
	WHERE p.id_product_visual ILIKE $1 OR p.nombre ILIKE $1 OR p.product_codigo_barra ILIKE $1 ORDER BY p.id_product ASC`

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