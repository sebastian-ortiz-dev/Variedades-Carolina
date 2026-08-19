package repository

import (
	"context"
	"variedades_carolina/src/auth/models"
	"variedades_carolina/src/config"
)

func GetOneUser(ctx context.Context, email string) (*models.Usuario, *models.Rol, error){
	db := config.Poolglobal
	pool := db.Getpool()
	sql_query := `SELECT u.id_usuario_visual, u.nombre, u.password, u.correo, u.rol, r.nombre_rol, u.imagen  
	FROM autenticacion.usuarios u LEFT JOIN autenticacion.roles r ON u.rol = r.id_rol WHERE u.borrado = false AND u.correo = $1`
	
	user := &models.Usuario{}
	rol  := &models.Rol{}
	
	err := pool.QueryRow(ctx, sql_query, email).Scan(&user.IDUsuarioVisual, &user.Nombre, &user.Password, &user.Correo, 
		&user.Rol, &rol.NombreRol, &user.Imagen)

	if err != nil{
		return nil, nil, err
	}

	return user, rol, nil
}