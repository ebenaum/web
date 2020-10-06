BUILD_DIR ?= build

BUILD_FILES = $(addprefix $(BUILD_DIR)/, index.html landing.css erenthyrm-2021.html)

static: $(BUILD_DIR) $(BUILD_FILES)

$(BUILD_DIR):
	mkdir $@

get_template_data = $(shell cat $1 | head -n 1 | tr -d '<!> ' | cut -c 12- | rev | cut -c 3- | rev | head -n 1)

$(BUILD_DIR)/%.html: %.tmpl
	$(SCRIB) $< $(DATA_DIR)/$(call get_template_data,$<).json > $@

$(BUILD_DIR)/%: %
	cp $< $@
