BUILD_DIR ?= build

export PATH := node_modules/.bin/:$(PATH)

BUILD_FILES = $(addprefix $(BUILD_DIR)/, personnage.html)

static: $(BUILD_DIR) $(BUILD_FILES)

$(BUILD_DIR)/%.html: pages/%.tsx $(wildcard components/*.tsx components/*.ts styles/*.css)
	npm run build
	cp -R out/* $(BUILD_DIR)

$(BUILD_DIR):
	mkdir $@
