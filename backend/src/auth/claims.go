package auth

import(
	"github.com/golang-jwt/jwt/v5" 
)

type ClaimsUser struct{
	UserId string `json:"-"`
	Nombre string `json:"nombre"`
	Correo string `json:"correo"`
	Rol string `json:"rol"`
	Imagen string `json:"imagen"`
	jwt.RegisteredClaims
}


