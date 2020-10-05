BUILD_DIR ?= build

BUILD_FILES = $(addprefix $(BUILD_DIR)/, index.html landing.css erenthyrm-2021.html)

static: $(BUILD_DIR) $(BUILD_FILES)

$(BUILD_DIR):
	mkdir $@

$(BUILD_DIR)/%: %
	cp $< $@
