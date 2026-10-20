package DTOs

import "time"

type LoginUserEntrydata struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type Userdata struct {
	Id    string    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
	Rol   string `json:"rol"`
}

type LoginResponseUser struct {
	Token    string     `json:"token"`
	Type     string     `json:"tokentype"`
	ExpireIn time.Time    `json:"expireIn"`
	User     *Userdata `json:"user"`
}