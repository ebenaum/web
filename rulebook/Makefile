BUILD_DIR ?= build

BUILD_FILES = $(addprefix $(BUILD_DIR)/, regles.html)

static: $(BUILD_DIR) $(BUILD_FILES)
ifndef COSMOS_DIR
	$(error Please provide cosmos directory: `make $@ COSMOS_DIR=XXX`)
endif

$(BUILD_DIR)/regles.html: $(COSMOS_DIR) rulebook
	cat $(COSMOS_DIR)/content/documents/regles.md | ./rulebook > $@

rulebook:
	go build -o rulebook .

packr: template.html style.css
	packr2

$(BUILD_DIR):
	mkdir $@

$(BUILD_DIR)/%: %
	cp $< $@

clean:
	rm rulebook
	packr2 clean
