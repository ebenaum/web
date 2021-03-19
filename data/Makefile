BUILD_DIR ?= build

static: $(BUILD_DIR) $(COSMOS_DIR) $(BUILD_DIR)/journal-erenthyrm.json $(BUILD_DIR)/world.json $(BUILD_DIR)/copy.json $(BUILD_DIR)/faq.json $(BUILD_DIR)/characteristics.json

$(BUILD_DIR)/copy.json: $(COSMOS_DIR)/content/website/*.json
	jq -s 'map({ title: .title, body: .body, id: .id })' $(COSMOS_DIR)/content/website/*.json > $@

$(BUILD_DIR)/journal-erenthyrm.json: $(COSMOS_DIR)/content/journal-erenthyrm/*.json
	jq -s 'map({ title: .title, body: .body, date: .date }) | sort_by(.date) | reverse' $(COSMOS_DIR)/content/journal-erenthyrm/*.json > $@

$(BUILD_DIR)/world.json: $(COSMOS_DIR)/content/world/*.json
	jq -s 'map( { (.ref|tostring|ascii_downcase|gsub(" "; "-")): { ref: .ref, type: .type, name: .name, description: .description } } ) | add' $(COSMOS_DIR)/content/world/*.json > $@

$(BUILD_DIR)/characteristics.json: $(COSMOS_DIR)/content/world/characteristic.*.json
	jq -s 'map( { (.ref|tostring|ascii_downcase|gsub(" "; "-")): { ref: .ref, type: .type, branch: .branch, name: .name, description: .description, levels: .levels } } ) | add' $(COSMOS_DIR)/content/world/characteristic.*.json > $@

$(BUILD_DIR)/faq.json: $(COSMOS_DIR)/content/faq/*.json
	jq -s 'map({ title: .title, tldr: .tldr, body: .body, position: .position, slug: (.title|tostring|ascii_downcase|gsub("[· '\''’]"; "-"))|gsub("[?,]"; "")|gsub("-$$";"")|gsub("--";"-") }) | sort_by(.position)' $(COSMOS_DIR)/content/faq/*.json > $@

$(BUILD_DIR):
	mkdir $@
