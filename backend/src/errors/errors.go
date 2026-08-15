package errorHttp

import "fmt"

type HttpError struct {
	Status int    `json:"-"`
	Detail string `json:"detail"`
	Codigo string `json:"codigo"`
}

func (e *HttpError) Error() string {
	return fmt.Sprintf("Http error %d  %s  %s", e.Status, e.Detail, e.Codigo)
}