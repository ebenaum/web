BUILD_DIR ?= build

BUILD_FILES = $(addprefix $(BUILD_DIR)/, regles.html)

static: $(BUILD_DIR) $(BUILD_FILES)
ifndef COSMOS_DIR
	$(error Please provide cosmos directory: `make $@ COSMOS_DIR=XXX`)
endif

$(BUILD_DIR)/regles.html: $(COSMOS_DIR) rulebook
	cat $(COSMOS_DIR)/documents/regles.md | ./rulebook > $@

rulebook: main-packr.go
	go build -o rulebook .

main-packr.go: static/template.html static/style.css
	packr2

$(BUILD_DIR):
	mkdir $@

$(BUILD_DIR)/%: %
	cp $< $@

clean:
	rm rulebook
	packr2 clean
