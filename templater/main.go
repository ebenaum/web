package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io"
	"os"
	"time"
)

func main() {
	if len(os.Args) != 3 {
		fmt.Printf("templater <template> <data.json>\n")
		os.Exit(1)
	}
	err := a(os.Args[1], os.Args[2], os.Stdout)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

var fns template.FuncMap = template.FuncMap{
	"formatDate": func(d string) (string, error) {
		months := []string{"janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"}
		date, err := time.Parse(time.RFC3339, d)
		if err != nil {
			return "", err
		}

		return fmt.Sprintf("Le %d %s %d à %d heures", date.Day(), months[date.Month()-1], date.Year(), date.Hour()), nil
	},
}

func a(templatePath string, dataPath string, output io.Writer) error {
	tmpl, err := template.New(templatePath).Funcs(fns).ParseFiles(templatePath)
	if err != nil {
		return err
	}

	dataFile, err := os.Open(dataPath)
	if err != nil {
		return err
	}

	dec := json.NewDecoder(dataFile)

	var data interface{}

	var dataMap map[string]interface{}
	var dataArray []interface{}
	if err := dec.Decode(&dataMap); err != nil {
		_, err = dataFile.Seek(0, io.SeekStart)
		if err != nil {
			return err
		}

		err = dec.Decode(&dataArray)
		if err != nil {
			return err
		}
		data = dataArray
	} else {
		data = dataMap
	}

	return tmpl.Execute(output, data)
}
