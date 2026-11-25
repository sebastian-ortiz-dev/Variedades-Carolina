package repository

import (
	"context"
	"variedades_carolina/src/config"
	"variedades_carolina/src/inventory/models"
)

func ListIva(ctx context.Context) (*[]models.Iva, error) {
	pool := config.Poolglobal.Getpool()
	sqlQuery := `SELECT id_vista, iva FROM inventario.alicuota ORDER BY id ASC`

	rows, err := pool.Query(ctx, sqlQuery)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var alicuotas []models.Iva
	for rows.Next() {
		var alicuota models.Iva
		if err := rows.Scan(&alicuota.IdVista, &alicuota.Valor); err != nil {
			return nil, err
		}
		alicuotas = append(alicuotas, alicuota)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return &alicuotas, nil
}
