package repository

import (
	"context"
	"fmt"
	"strings"
	"time"
	"variedades_carolina/src/config"
	"variedades_carolina/src/inventory/DTOs"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

func InsertRecord(ctx context.Context, pool pgx.Tx, idMovimiento int, idProducto int, cantidad int, idUsuario int, descripcion *string) error{
	sql := `INSERT INTO inventario.historial(id_historial_visual, id_movimiento, id_producto, cantidad, id_usuario, descripcion, fecha_hora)
	VALUES ($1, $2, $3, $4, $5, $6, $7)`
	
	insert, err := pool.Exec(ctx, sql, uuid.New(), idMovimiento, idProducto, cantidad, idUsuario, descripcion, time.Now())

	if err != nil{
		return fmt.Errorf("Error al registrar el movimiento.")
	}

	if insert.RowsAffected() == 0{
		return fmt.Errorf("Error al registrar el movimiento.")
	}

	return nil
}

func GetItemsHistorial(ctx context.Context, data *DTOs.HistoryQueryFilterDTO) (int, error){
	db := config.Poolglobal
	pool := db.Getpool()
	sql := `SELECT COUNT(h.id_historial_visual) FROM inventario.historial h INNER JOIN inventario.movimientos m ON h.id_movimiento=m.id_movimiento INNER JOIN inventario.productos p ON h.id_producto=p.id_product INNER JOIN autenticacion.usuarios u ON h.id_usuario=u.id_usuario WHERE `
	amount := 1
	var queries []string
	var dataDb  []any

	if data.IDTipoMovimiento != ""{
		queries = append(queries, fmt.Sprintf("m.id_visual = $%d", amount))
		dataDb = append(dataDb, data.IDTipoMovimiento)
		amount += 1
	}
	queries = append(queries, fmt.Sprintf("h.fecha_hora BETWEEN $%d AND $%d ", amount, amount + 1))
	dataDb = append(dataDb, data.FechaInicio)
	dataDb = append(dataDb, data.FechaFin)
	amount += 1
	
	if data.Q != ""{
		q := data.Q + "%"
		queries = append(queries, fmt.Sprintf("(h.id_historial_visual ILIKE $%d OR p.nombre ILIKE $%d OR p.product_codigo_barra ILIKE $%d OR h.descripcion ILIKE $%d)", amount, amount, amount, amount))
		dataDb = append(dataDb, q)
		amount += 1
	}

	build := strings.Join(queries, " AND ")
	query := sql + build 

	var total int
	err := pool.QueryRow(ctx, query, dataDb...).Scan(&total)
	fmt.Println(total)
	if err != nil{
		return 0, err
	}

	return total, nil
}

func ListHistoryalMoviments(ctx context.Context, data *DTOs.HistoryQueryFilterDTO, pagina int) (*[]DTOs.HistoryItemDTO, error){
	db := config.Poolglobal
	pool := db.Getpool()
	sql := `SELECT h.id_historial_visual, h.fecha_hora, m.nombre, h.cantidad, h.descripcion, p.nombre, p.product_codigo_barra, p.imagen, u.nombre
	FROM inventario.historial h INNER JOIN inventario.movimientos m ON h.id_movimiento=m.id_movimiento INNER JOIN inventario.productos p ON h.id_producto=p.id_product INNER JOIN autenticacion.usuarios u ON 
	h.id_usuario=u.id_usuario WHERE `
	amount := 1
	var queries []string
	var dataDb  []any

	if data.IDTipoMovimiento != ""{
		queries = append(queries, fmt.Sprintf("m.id_visual = $%d", amount))
		dataDb = append(dataDb, data.IDTipoMovimiento)
		amount += 1
	}

	queries = append(queries, fmt.Sprintf("h.fecha_hora BETWEEN $%d AND $%d ", amount, amount + 1))
	dataDb = append(dataDb, data.FechaInicio)
	dataDb = append(dataDb, data.FechaFin)
	amount += 2

	if data.Q != ""{
		q := data.Q + "%"
		queries = append(queries, fmt.Sprintf("(h.id_historial_visual ILIKE $%d OR p.nombre ILIKE $%d OR p.product_codigo_barra ILIKE $%d OR h.descripcion ILIKE $%d)", amount, amount, amount, amount))
		dataDb = append(dataDb, q)
		amount += 1
	}

	build := strings.Join(queries, " AND ")
	offset := fmt.Sprintf(" ORDER BY id_historial DESC limit $%d OFFSET $%d", amount, amount + 1)
	dataDb = append(dataDb, data.Limit)
	dataDb = append(dataDb, pagina)
	query := sql + build + offset

	var records []DTOs.HistoryItemDTO
	rows, err := pool.Query(ctx, query, dataDb...)

	if err != nil{
		return nil, err
	}

	for rows.Next(){
		var record DTOs.HistoryItemDTO
		err := rows.Scan(
			&record.IDHistorialVisual,
			&record.FechaHora,
			&record.TipoMovimiento,
			&record.Cantidad,
			&record.Descripcion,
			&record.Producto.Nombre,
			&record.Producto.CodigoBarra,
			&record.Producto.Imagen,
			&record.Usuario.Nombre,
		)
		if err != nil{
			return nil, fmt.Errorf("Error al obtener los registros.")
		}
		records = append(records, record)
	}

	if err := rows.Err(); err != nil{
		return nil, err
	}

	defer rows.Close()

	return &records, nil
}