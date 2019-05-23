package main

import(
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	//"github.com/gin-contrib/static"
	_ "github.com/go-sql-driver/mysql"
	"net/http"
	"encoding/json"
	"database/sql"
	"fmt"
	"os"
)

const searchQuery = "SELECT Username, Id FROM Users WHERE Username LIKE ? ORDER BY Username ASC LIMIT 8"

type User struct {
	Name string
	Id int64
}

type Message struct {
	Suggestions []User
}

func main(){
	dbusr := openUserDB()
	defer dbusr.Close()
	r := initRouter(dbusr)

	r.Run(":4000")
}

func openUserDB() *sql.DB {
	dbusr, dberr := sql.Open("mysql", getDatabaseAuth())

	if dberr != nil {
		fmt.Println("SQL INIT ERROR:", dberr)
		os.Exit(1)
		return dbusr
	} else {
		var version string
		dbusr.QueryRow("SELECT VERSION()").Scan(&version)
		fmt.Println("Connected to:", version)
		return dbusr
	}
}

func initRouter(dbusr *sql.DB) *gin.Engine {
	r := gin.New()

	gin.SetMode(gin.TestMode)

	r.Use(cors.Default())

	r.Static("/static", "./static")

	//r.Use(static.Serve("/static", "./static"))

	r.GET("/data/", func(c *gin.Context){

		msg := Message{
			Suggestions: []User{},
		}

		jsonMsg, err := json.Marshal(msg)

		if err != nil {
			fmt.Println(err)
		}

		c.String(http.StatusOK, string(jsonMsg))
	})

	r.GET("/data/:query", func(c *gin.Context){

		query := c.Param("query")

		usrs, err := getSuggestions(query, dbusr)

		if err != nil {
			fmt.Println(err)
		}

		msg := Message{
			Suggestions: usrs,
		}

		jsonMsg, err := json.Marshal(msg)

		if err != nil {
			fmt.Println(err)
		}

		c.String(http.StatusOK, string(jsonMsg))
	})

	return r
}

func getSuggestions(query string, dbusr *sql.DB) ([]User, error){
	newQuery := "%" + query +"%"
	rows, err := dbusr.Query(searchQuery, newQuery)

	if err != nil {
		return nil, err
	}

	users := []User{}

	for rows.Next() {
		user := User{}
		err = rows.Scan(&user.Name, &user.Id)
		if err != nil {
			panic(err)
		}
		users = append(users, user)
	}
	return users, nil
}