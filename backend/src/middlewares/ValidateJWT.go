package middlewares

import (
	"errors"
	"fmt"
	"os"
	"strings"
	"variedades_carolina/src/errors"
	"variedades_carolina/src/secure"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func Validatejwt() gin.HandlerFunc{
	return func(c *gin.Context) {
		authheader := c.GetHeader("Authorization")
		if !strings.HasPrefix(authheader, "Bearer") || authheader == "" {
			c.Error(&errorHttp.HttpError{Status: 401, Detail: "Not log in", Codigo:"UNAUTHORIZED"})
			c.Abort()
			return 
		}

		claim := &secure.ClaimsUser{}
		
		tokenheader := strings.TrimPrefix("Bearer", authheader)

		token, err := jwt.ParseWithClaims(tokenheader, claim, func(t *jwt.Token) (interface{}, error) {

			_, ok := t.Method.(*jwt.SigningMethodHMAC) 

			if !ok {
				return nil, fmt.Errorf("Unexpected signing method: %v", t.Header["arg"])
			}

			secret := []byte(os.Getenv("JWT_SECRET"))

			return secret, nil
		})

		if err != nil{
			c.Error(&errorHttp.HttpError{Status: 401, Detail: "Token malversado", Codigo:"UNAUTHORIZED"})
			c.Abort()
			return 
		}

		erro := Jwt_errors(err)

		if &erro != (&errorHttp.HttpError{}) {
			c.Error(&erro)
			c.Abort()
			return 
		}

		c.Set(claim, token)

		c.Next()
	}
}

func Jwt_errors(err error) (errorHttp.HttpError){
	if err != nil{
		switch {
		case errors.Is(err, jwt.ErrTokenExpired):
			return errorHttp.HttpError{Status: 401, Detail: "Token expirado", Codigo:"UNAUTHORIZED"}

		case errors.Is(err, jwt.ErrTokenSignatureInvalid):
			return errorHttp.HttpError{Status: 401, Detail: "Token malversado", Codigo:"UNAUTHORIZED"}

		case errors.Is(err, jwt.ErrTokenUnverifiable):
			return errorHttp.HttpError{Status: 401, Detail: "Token no verificado", Codigo:"UNAUTHORIZED"}
		
		case errors.Is(err, jwt.ErrTokenMalformed):
			return errorHttp.HttpError{Status: 401, Detail: "Token corrupto", Codigo:"UNAUTHORIZED"}

		default:
			return errorHttp.HttpError{Status: 500, Detail: "Something went wrong", Codigo:"Internal Server Error"}

		}
	}

	return errorHttp.HttpError{}
}