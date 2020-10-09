package main

import (
	"fmt"
	"io"
	"os"
	"strings"
	"text/template"

	rulebookMonk "github.com/ebenaum/rulebook-monk"
	"github.com/gobuffalo/packr"
)

func main() {
	err := Build(os.Stdin, os.Stdout, rulebookMonk.BuilderConfig{true})
	if err != nil {
		fmt.Println(err)
	}
}

func Build(input io.Reader, w io.Writer, config rulebookMonk.BuilderConfig) error {
	box := packr.NewBox("./")

	templateString, err := box.FindString("template.html")
	if err != nil {
		return err
	}

	tmplate := template.New("template.html")

	tmplate, err = tmplate.Parse(templateString)
	if err != nil {
		return err
	}

	css, err := box.FindString("style.css")
	if err != nil {
		return err
	}

	var body strings.Builder
	err = rulebookMonk.Build(input, &body, config)
	if err != nil {
		return err
	}

	args := make(map[string]interface{})
	args["title"] = "Règles Erenthyrm - I"
	args["body"] = body.String()
	args["css"] = string(css)

	err = tmplate.Execute(w, args)
	if err != nil {
		return err
	}

	return nil
}
