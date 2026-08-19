package config

import (
	"context"
	"os"
	"time"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Db struct{
	poolDb *pgxpool.Pool
}

func (db *Db) Getpool() *pgxpool.Pool{
	return db.poolDb
}

var Poolglobal *Db

func Database_init(){
	c := context.Background()

	config, err := pgxpool.ParseConfig(os.Getenv("DATABASE_URL"))
	if err != nil{
		panic("Error al configurar la db")
	}

	config.MaxConns = 20
	config.MinConns = 3

	config.MaxConnLifetime = 30 * time.Minute
	config.MaxConnIdleTime = 5 * time.Minute
	config.HealthCheckPeriod = 1 * time.Minute

	pool, err := pgxpool.NewWithConfig(c, config)
	if err != nil{
		panic("Error al iniciar la db")
	}

	if err := pool.Ping(c); err != nil{
		pool.Close()
		panic("Error al tratar de conectar a la base de datos")
	}


	Poolglobal = &Db{poolDb: pool}
}