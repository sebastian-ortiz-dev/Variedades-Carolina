package middlewares

import (
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
)

func Customrecoveryjson() gin.HandlerFunc{
	return func(c *gin.Context) {
		defer func ()  {
			err := recover(); 
			if err != nil{
				fmt.Printf("Panic: %v\n", err)

				c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
					"status": 500,
					"error": "Internal Server Error",
					"message": "Something went wrong",
				})
			}	
		}()
		
		c.Next()
	}
}