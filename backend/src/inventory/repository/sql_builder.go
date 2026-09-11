package repository

import(
	"strings"
	"fmt"
	"variedades_carolina/src/inventory/DTOs"
)

func BuildCatalogQuery(query string, queryHas string, categoria string, LowStock bool, cursor int, limit string, q string) (sqlBuild string, sqlRow string, sqlData []any, rowData []any){
	amount := 1
	amountH := 1
	var filtros []string
	var dataDb []any
	var filtrosHas []string
	var dataHas []any

	if cursor != 0{
		parameter := fmt.Sprintf("p.id_product > $%d", amount)
		filtros = append(filtros, parameter)
		dataDb = append(dataDb, cursor)
		amount += 1
	} 
	if categoria != ""{
		parameter := fmt.Sprintf("c.id_categoria_visual = $%d", amount)
		filtros = append(filtros, parameter)
		filtrosHas = append(filtrosHas, parameter)
		dataDb = append(dataDb, categoria)
		dataHas = append(dataHas, categoria)
		amount += 1
		amountH += 1
	} 
	if q != ""{
		fmt.Println("peru")
		parameter := fmt.Sprintf("p.id_product_visual ILIKE $%d OR p.nombre ILIKE $%d OR p.product_codigo_barra ILIKE $%d", amount, amount, amount)
		filtros = append(filtros, parameter)
		filtrosHas = append(filtrosHas, parameter)
		dataDb = append(dataDb, q)
		dataHas = append(dataHas, q)
		amount += 1
		amountH += 1
	}
	parameter := fmt.Sprintf("p.borrado = $%d", amount)
	filtros = append(filtros, parameter)
	filtrosHas = append(filtrosHas, parameter)
	dataDb = append(dataDb, LowStock)
	dataHas = append(dataHas, LowStock)
	amount += 1
	amountH += 1

	build := strings.Join(filtros, " AND ")
	buildH := strings.Join(filtrosHas, " AND ")
	part := fmt.Sprintf(" ORDER BY p.id_product LIMIT $%d", amount)
	dataDb = append(dataDb, limit)
	partHas := " ORDER BY p.id_product DESC LIMIT 1"
	queryNew := query + build + part
	has := queryHas + buildH + partHas

	return queryNew, has, dataDb, dataHas
}

func BuildUpdate(sql string, id string, data *DTOs.UpdateProduct, id_categoria int, id_medida int) (sqlBuild string, dataDbNew []any){
	amount := 1
	var values []string
	var dataDb []any

	if data.CodeBearer != nil{
		cadena := fmt.Sprintf("product_codigo_barra = $%d", amount)
		values = append(values, cadena)
		dataDb = append(dataDb, *data.CodeBearer)
		amount += 1
	} 
	if data.Nombre != nil{
		cadena := fmt.Sprintf("nombre = $%d", amount)
		values = append(values, cadena)
		dataDb = append(dataDb, *data.Nombre)
		amount += 1
	} 
	if data.Imagen != nil{
		cadena := fmt.Sprintf("imagen = $%d", amount)
		values = append(values, cadena)
		dataDb = append(dataDb, *data.Imagen)
		amount += 1
	}  
	if data.Precio_Com != nil{
		cadena := fmt.Sprintf("precio_compra = $%d", amount)
		values = append(values, cadena)
		dataDb = append(dataDb, *data.Precio_Com)
		amount += 1
	} 
	if data.Porcentaje_Gan != nil{
		cadena := fmt.Sprintf("porcentaje_ganancia = $%d", amount)
		values = append(values, cadena)
		dataDb = append(dataDb, *data.Porcentaje_Gan)
		amount += 1
	} 
	if data.Descripcion != nil{
		cadena := fmt.Sprintf("descripcion = $%d", amount)
		values = append(values, cadena)
		dataDb = append(dataDb, *data.Descripcion)
		amount += 1
	} 
	if id_categoria != 0 {
		cadena := fmt.Sprintf("id_categoria = $%d", amount)
		values = append(values, cadena)
		dataDb = append(dataDb, id_categoria)
		amount += 1
	} 
	if id_medida != 0 {
		cadena := fmt.Sprintf("id_medida = $%d", amount)
		values = append(values, cadena)
		dataDb = append(dataDb, id_medida)
		amount += 1
	} 
	if data.CantidadMinima != nil{
		cadena := fmt.Sprintf("cantidad_minima = $%d", amount)
		values = append(values, cadena)
		dataDb = append(dataDb, *data.CantidadMinima)
		amount += 1
	}

	cadena := fmt.Sprintf(" WHERE id_product_visual=$%d", amount)

	build := strings.Join(values, ", ")
	queryNew := sql + build + cadena


	return queryNew, dataDb
}