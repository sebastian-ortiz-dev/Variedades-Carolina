package repository

import (
	"context"
	"fmt"
	"variedades_carolina/src/config"
	"variedades_carolina/src/inventory/models"
)

func ListMinimumcash(ctx context.Context) (*models.Minimum_cash, error){
	db := config.Poolglobal
	pool := db.Getpool()
	sql_query := `SELECT id_billete_visual, billete FROM inventario.billete_minimo `

	var cash models.Minimum_cash
	err := pool.QueryRow(ctx, sql_query).Scan(&cash.IdBilleteVisual, &cash.Billete)

	if err != nil{
		return nil, err
	}

	return &cash, nil
}

func UpdateMinimumCah(ctx context.Context, cash float64, id string) error{
	db := config.Poolglobal
	pool := db.Getpool()
	sql_query := `UPDATE inventario.billete_minimo SET billete=$1 WHERE id_billete_visual=$2`

	row, err := pool.Exec(ctx, sql_query, cash, id)

	if err != nil{
		return err
	}

	if row.RowsAffected() == 0{
		return fmt.Errorf("El recurso no fue actualizado.")
	}

	return nil
}