package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

type Login struct {
	Password string `json:"password"`
}

func cookieCheckMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		cookie, err := c.Cookie("token-id")
		if err != nil {
			log.Printf("NO COOKIE HERE!")
			return err
		}
		if cookie.Value != "lol" {
			log.Printf("Actual cookie is: %s\n", cookie.String())
			return echo.NewHTTPError(http.StatusInternalServerError)
		}
		return next(c)
	}
}

func main() {
	e := echo.New()
	e.Use(middleware.StaticWithConfig(middleware.StaticConfig{
		Skipper: middleware.DefaultSkipper,
		Root:    "../client/build",
		Index:   "index.html",
		HTML5:   true,
		Browse:  false,
	}))
	e.Static("/", "../client/build")

	// Secret group
	e.Group("/secret", cookieCheckMiddleware)

	api := e.Group("/api")

	api.POST("/login", func(c echo.Context) error {
		loginData := Login{}

		defer c.Request().Body.Close()

		err := json.NewDecoder(c.Request().Body).Decode(&loginData)
		if err != nil {
			log.Printf("Failed processing login request: %s\n", err)
			return echo.NewHTTPError(http.StatusInternalServerError)
		}

		if loginData.Password == "abcd" {
			cookie := new(http.Cookie)
			cookie.Name = "token-id"
			cookie.Value = "lol"
			cookie.Path = "/"
			cookie.Expires = time.Now().Add(24 * time.Hour)
			c.SetCookie(cookie)
		}

		return c.String(http.StatusOK, "Login was probably processed!")
	})

	e.Logger.Fatal(e.Start(":1323"))
}
