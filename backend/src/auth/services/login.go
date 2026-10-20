package services

import (
	"context"
	"net/http"
	"os"
	"variedades_carolina/src/auth/DTOs"
	"variedades_carolina/src/auth/repository"
	"variedades_carolina/src/errors"
	"variedades_carolina/src/secure"
)

func ProcessLogin(ctx context.Context, userData *DTOs.LoginUserEntrydata) (*DTOs.LoginResponseUser, *http.Cookie, error){
	user, rol, err := repository.GetOneUser(ctx, userData.Email)
	
	if err != nil{
		error_http := &errorHttp.HttpError{Status: http.StatusUnauthorized, Detail: "Error, Email o contraseña invalidos.", Codigo:"UNAUTHORIZED"}
		return nil, nil, error_http
	}
	
	confirm := secure.Confirmpassword(user.Password, userData.Password + os.Getenv("SECRET_PEPPER"))

	if !confirm{
		error_http := &errorHttp.HttpError{Status: http.StatusUnauthorized, Detail: "Error, Email o contraseña invalidos.", Codigo:"UNAUTHORIZED"}
		return nil, nil, error_http
	} 

	token, expire, err := secure.Generatetoken(user.IDUsuarioVisual, user.Nombre, user.Correo, rol.NombreRol, user.Imagen)

	if err != nil{
		error_http := &errorHttp.HttpError{Status: http.StatusInternalServerError, Detail: "Something went wrong", Codigo:"INTERNAL_SERVER_ERROR"}
		return nil, nil, error_http
	}
	
	dto_user := &DTOs.Userdata{Id: user.IDUsuarioVisual, Name: user.Nombre, Email: user.Correo, Rol: rol.NombreRol}

	response := &DTOs.LoginResponseUser{Token: token, Type: "Bearer", ExpireIn: expire, User: dto_user}

	cookie := http.Cookie{
		Name: "Authorization",
		Value: token,
		Path: "/api/v1",
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
		Expires: expire.UTC(),
	}

	return response, &cookie, nil
}