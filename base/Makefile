BUILD_DIR ?= build

BUILD_FILES = $(addprefix $(BUILD_DIR)/, _redirects favicon.ico css/woodcut1-webfont.woff css/woodcut1-webfont.woff2)

static: $(BUILD_DIR) $(BUILD_DIR)/css $(BUILD_FILES)

$(BUILD_DIR)/%:
	mkdir $@

$(BUILD_DIR)/%: %
	cp $< $@
