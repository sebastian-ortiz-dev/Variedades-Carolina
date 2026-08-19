package secure

import (
	"golang.org/x/crypto/bcrypt"
)

func Hashpassword(password string) (string, error){
	hash, err := bcrypt.GenerateFromPassword([]byte(password), 14)

	return string(hash), err
}

func Confirmpassword(hashpassword string, password string) bool{
	err := bcrypt.CompareHashAndPassword([]byte(hashpassword), []byte(password))

	return err == nil
}