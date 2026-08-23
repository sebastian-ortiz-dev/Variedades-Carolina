package repository

import (
	"context"
	"fmt"
	"time"
	"variedades_carolina/src/config"
	"variedades_carolina/src/inventory/models"
)

func ListCategories(ctx context.Context) (*[]models.Categories, error){
	db := config.Poolglobal
	pool := db.Getpool()
	sql_query := `SELECT id_categoria_visual, nombre FROM inventario.categorias WHERE borrado=False ORDER BY id_categoria ASC`

	rows, err := pool.Query(ctx, sql_query)

	if err != nil{
		return nil, err
	}
	
	var categories []models.Categories
	for rows.Next(){
		var catego models.Categories
		err := rows.Scan(
			&catego.IdCategoriesVisual,
			&catego.Nombre,
		)
		if err != nil{
			return nil, err
		}
		categories = append(categories, catego)
	}

	if err := rows.Err(); err != nil{
		return nil, err
	}

	defer rows.Close()
	
	return &categories, nil
}

func CreateCategorie(ctx context.Context, id string, name string, date time.Time) (*models.Categories, error){
	db := config.Poolglobal
	pool := db.Getpool()
	sql_query := `INSERT INTO inventario.categorias(id_categoria_visual, nombre, fecha_creacion) 
	VALUES ($1, $2, $3) RETURNING id_categoria_visual, nombre`
	
	var categorie models.Categories
	err := pool.QueryRow(ctx, sql_query, id, name, date).Scan(&categorie.IdCategoriesVisual, &categorie.Nombre)

	if err != nil{
		return nil, err
	}

	return &categorie, nil

}

func UpdateCategorie(ctx context.Context, id string, name string) error{
	db := config.Poolglobal
	pool := db.Getpool()
	sql_query := `UPDATE inventario.categorias SET nombre=$1 WHERE id_categoria_visual=$2`


	updated, err := pool.Exec(ctx, sql_query, name, id)

	if err != nil{
		return err
	}

	if updated.RowsAffected() == 0{
		return fmt.Errorf("El recurso no fue actualizado")
	}

	return nil
}

func DeleteCategorie(ctx context.Context, id string) error{
	db := config.Poolglobal
	pool := db.Getpool()
	sql_query := `UPDATE inventario.categorias SET borrado=True WHERE id_categoria_visual=$1`


	deleted, err := pool.Exec(ctx, sql_query, id)

	if err != nil{
		return err
	}

	if deleted.RowsAffected() == 0{
		return fmt.Errorf("El recurso no fue borrado")
	}

	return nil
}