package repository

import(
	"context"
	"variedades_carolina/src/inventory/models"
	"variedades_carolina/src/config"
)

func ListCategories(ctx context.Context) (*[]models.Categories, error){
	db := config.Poolglobal
	pool := db.Getpool()
	sql_query := `SELECT id_categoria_visual, nombre FROM inventario.categorias ORDER BY id_categoria ASC`

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