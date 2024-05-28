BUILD_DIR ?= build

BUILD_FILES = $(addprefix $(BUILD_DIR)/, $(wildcard *.woff))
BUILD_FILES += $(addprefix $(BUILD_DIR)/, $(wildcard *.woff2))
BUILD_FILES += $(addprefix $(BUILD_DIR)/, $(wildcard *.ttf))

static: $(BUILD_DIR) $(BUILD_FILES)

$(BUILD_DIR):
	mkdir $@

$(BUILD_DIR)/%: %
	cp $< $@
