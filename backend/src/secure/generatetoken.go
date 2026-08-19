package secure

import (
	"os"
	"time"
	"github.com/golang-jwt/jwt/v5"
)

func Generatetoken(id string, nombre string, correo string, rol string, imagen string) (string, time.Time, error){

	claim := &ClaimsUser{UserId: id, Nombre: nombre, Correo: correo, Rol: rol, Imagen: imagen, RegisteredClaims: jwt.RegisteredClaims{
		Subject: id,
		Issuer: os.Getenv("JWT_ISSUER"),
		Audience: jwt.ClaimStrings{os.Getenv("JWT_AUDIENCE")},

		ExpiresAt: jwt.NewNumericDate(time.Now().Add(6 * time.Hour)),
		IssuedAt:  jwt.NewNumericDate(time.Now()),
	}}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claim)
	expire := claim.ExpiresAt.Time
	token_string, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))

	return token_string, expire, err
}