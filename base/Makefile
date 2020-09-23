BUILD_DIR ?= build

BUILD_FILES = $(addprefix $(BUILD_DIR)/, _redirects favicon.ico)

static: $(BUILD_DIR) $(BUILD_FILES)

$(BUILD_DIR):
	mkdir $@

$(BUILD_DIR)/%: %
	cp $< $@
