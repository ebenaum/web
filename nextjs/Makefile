BUILD_DIR ?= build
NEXT = next

export PATH := node_modules/.bin/:$(PATH)

BUILD_FILES = $(addprefix $(BUILD_DIR)/, character.html)

static: $(BUILD_DIR) $(BUILD_FILES)

$(BUILD_DIR)/%.html: pages/%.tsx $(wildcard components/*.tsx components/*.ts)
	$(NEXT) build && $(NEXT) export -o $(BUILD_DIR)

$(BUILD_DIR):
	mkdir $@
