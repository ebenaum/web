package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io"
	"os"
	"strings"
	"time"

	"github.com/gomarkdown/markdown"
	"github.com/gomarkdown/markdown/html"
	"github.com/gomarkdown/markdown/parser"
)

func main() {
	if len(os.Args) < 3 {
		fmt.Printf("templater <template> <data.json>\n")
		os.Exit(1)
	}
	err := a(os.Args[1], os.Args[2], os.Stdout, os.Args[2:])
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
	"findEntry": func(entries []interface{}, name string) (map[string]interface{}, error) {
		for _, entryRaw := range entries {
			entry, ok := entryRaw.(map[string]interface{})
			if !ok {
				return nil, fmt.Errorf("wrong entry type '%v'", entryRaw)
			}

			if title, ok := entry["title"].(string); ok && title == name {
				return entry, nil
			}
		}

		return nil, fmt.Errorf("no entry '%s'", name)
	},
	"splitParagraphes": func(in string) []template.HTML {
		extensions := parser.CommonExtensions
		p := parser.NewWithExtensions(extensions)

		htmlFlags := html.CommonFlags | html.HrefTargetBlank
		opts := html.RendererOptions{Flags: htmlFlags}
		renderer := html.NewRenderer(opts)

		htmlInt := markdown.ToHTML([]byte(in), p, renderer)

		ps := strings.Split(string(htmlInt), "\n")
		output := make([]template.HTML, len(ps))
		for i, el := range ps {
			output[i] = template.HTML(el)
		}
		return output
	},
}

func a(templatePath string, dataPath string, output io.Writer, templates []string) error {
	tmpl, err := template.New(templatePath).Funcs(fns).ParseFiles(templatePath)
	if err != nil {
		return err
	}

	tmpl, err = tmpl.ParseFiles(templates...)
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
