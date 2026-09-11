package repository

import (
	"context"
	"fmt"
	"variedades_carolina/src/config"

	"github.com/jackc/pgx/v5"

	//"variedades_carolina/src/inventory/DTOs"
	"variedades_carolina/src/inventory/models"
)

func GetMoviments(ctx context.Context) (*[]models.Movimients, error){
	db := config.Poolglobal
	pool := db.Getpool()
	sql := "SELECT m.id_visual, m.nombre FROM inventario.movimientos m ORDER BY id_movimiento ASC"

	rows, err := pool.Query(ctx, sql)

	if err != nil{
		return nil, err
	}

	var moviments []models.Movimients
	for rows.Next(){
		var currentMoviment models.Movimients
		err := rows.Scan(
			&currentMoviment.IdVisual,
			&currentMoviment.Nombre,
		)

		if err != nil{
			return nil, fmt.Errorf("Error al obtener los movimientos")
		}

		moviments = append(moviments, currentMoviment)
	}

	if err := rows.Err(); err != nil{
		return nil, err
	}

	defer rows.Close()

	return &moviments, nil
}

func GetOneMoviment(ctx context.Context, id string, pool pgx.Tx) (*models.Movimients, error){
	sql := "SELECT m.id_movimiento FROM inventario.movimientos m WHERE m.id_visual = $1"
	
	var moviment models.Movimients
	err := pool.QueryRow(ctx, sql, id).Scan(&moviment.Id)

	if err != nil{
		return nil, fmt.Errorf("No existe el movimiento.")
	}

	return &moviment, nil
}

func GetOneUser(ctx context.Context, id string, pool pgx.Tx) (int, error){
	sql := "SELECT u.id_usuario FROM autenticacion.usuarios u WHERE u.id_usuario_visual = $1 AND u.borrado = false"

	var user int
	err := pool.QueryRow(ctx, sql, id).Scan(&user)

	if err != nil{
		return 0, err
	}

	return user, nil
}