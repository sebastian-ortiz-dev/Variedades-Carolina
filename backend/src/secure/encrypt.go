package secure

import (
	"fmt"
	"os"
	"github.com/sqids/sqids-go"
)

func Encrypt(id int) (string, error){
	s, err := sqids.New(sqids.Options{
		Alphabet: os.Getenv("ENCRYPTION"),
	})

	if err != nil{
		return "", fmt.Errorf("Error al generar el Encrypt.")
	}
	
	idEn, err := s.Encode([]uint64{uint64(id)}) 

	if err != nil{
		return "", fmt.Errorf("Error al generar el Encrypt.")
	}


	return idEn, nil
}

func Desencrypt(texto string) (int, error){
	s, err := sqids.New()

	if err != nil{
		return 0, fmt.Errorf("Error al quitar el Encrypt.")
	}

	id := s.Decode(texto)

	numero := int(id[0])

	return numero, nil
}
