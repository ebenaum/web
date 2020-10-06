package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io"
	"os"
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

func a(templatePath string, dataPath string, output io.Writer) error {
	tmpl, err := template.ParseFiles(templatePath)
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
