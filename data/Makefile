BUILD_DIR ?= build

static: $(BUILD_DIR) $(COSMOS_DIR) $(BUILD_DIR)/journal-erenthyrm.json $(BUILD_DIR)/world.json

$(BUILD_DIR)/journal-erenthyrm.json: $(COSMOS_DIR)/content/journal-erenthyrm/*.json
	jq -s 'map({ title: .title, body: .body, date: .date }) | sort_by(.date) | reverse' $(COSMOS_DIR)/content/journal-erenthyrm/*.json > $@

$(BUILD_DIR)/world.json: $(COSMOS_DIR)/content/world/*.json
	jq -s 'map( { (.ref|tostring|ascii_downcase|gsub(" "; "-")): { ref: .ref, type: .type, name: .name, description: .description } } ) | add' $(COSMOS_DIR)/content/world/*.json > $@

$(BUILD_DIR):
	mkdir $@
