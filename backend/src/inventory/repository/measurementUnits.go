package repository

import (
	"context"
	"fmt"
	"time"
	"variedades_carolina/src/config"
	"variedades_carolina/src/inventory/models"
)

func ListMeasurementunits(ctx context.Context) (*[]models.Measurementunits, error){
	db := config.Poolglobal
	pool := db.Getpool()
	sql_query := `SELECT id_medida_visual, nombre FROM inventario.medidas WHERE borrado=False ORDER BY id_medida ASC`

	rows, err := pool.Query(ctx, sql_query)

	if err != nil{
		return nil, err
	}

	var measurementsUnits []models.Measurementunits
	for rows.Next() {
		var measurement models.Measurementunits
		err := rows.Scan(
			&measurement.IdMedidaVisual,
			&measurement.Nombre,
		)

		if err != nil{
			return  nil, err
		}

		measurementsUnits = append(measurementsUnits, measurement)
	}

	if err := rows.Err(); err != nil{
		return nil, err
	}

	defer rows.Close()
	return &measurementsUnits, nil
}

func CreateMeasurementunits(ctx context.Context, id string, name string, date time.Time) (*models.Measurementunits, error){
	db := config.Poolglobal
	pool := db.Getpool()
	sql_query := `INSERT INTO inventario.medidas(id_medida_visual, nombre, fecha_creacion)
	VALUES ($1, $2, $3) RETURNING id_medida_visual, nombre`

	var measurementunit models.Measurementunits
	err := pool.QueryRow(ctx, sql_query, id, name, date).Scan(&measurementunit.IdMedidaVisual, &measurementunit.Nombre)

	if err != nil{
		return nil, err
	}

	return &measurementunit, nil
}

func UpdateMeasurentUnit(ctx context.Context, id string, name string) error{
	db := config.Poolglobal
	pool := db.Getpool()
	sql_query := `UPDATE inventario.medidas SET nombre=$1 WHERE id_medida_visual=$2`

	updated, err := pool.Exec(ctx, sql_query, name, id)

	if err != nil{
		return err
	}

	if updated.RowsAffected() == 0{
		return fmt.Errorf("El recurso no fue actualizado.")
	}

	return nil
}

func DeleteteMeasurentUnit(ctx context.Context, id string) error{
	db := config.Poolglobal
	pool := db.Getpool()
	sql_query := `UPDATE inventario.medidas SET borrado=True WHERE id_medida_visual=$2`

	updated, err := pool.Exec(ctx, sql_query, id)

	if err != nil{
		return err
	}

	if updated.RowsAffected() == 0{
		return fmt.Errorf("El recurso no fue borrado.")
	}

	return nil
}