BUILD_DIR ?= build

static: $(BUILD_DIR) $(COSMOS_DIR) $(BUILD_DIR)/journal-erenthyrm.json $(BUILD_DIR)/univers.json $(BUILD_DIR)/copy.json $(BUILD_DIR)/faq.json

$(BUILD_DIR)/copy.json: $(COSMOS_DIR)/content/website/*.json
	jq -s 'map({ title: .title, body: .body, id: .id })' $(COSMOS_DIR)/content/website/*.json > $@

$(BUILD_DIR)/journal-erenthyrm.json: $(COSMOS_DIR)/content/journal-erenthyrm/*.json
	jq -s 'map({ title: .title, body: .body, date: .date }) | sort_by(.date) | reverse' $(COSMOS_DIR)/content/journal-erenthyrm/*.json > $@

$(BUILD_DIR)/univers.json: $(COSMOS_DIR)/content/world/univers.json
	cat $(COSMOS_DIR)/content/world/univers.json > $@

$(BUILD_DIR)/faq.json: $(COSMOS_DIR)/content/faq/*.json
	jq -s 'map({ title: .title, tldr: .tldr, body: .body, position: .position, slug: (.title|tostring|ascii_downcase|gsub("[· '\''’]"; "-"))|gsub("[?,]"; "")|gsub("-$$";"")|gsub("--";"-") }) | sort_by(.position)' $(COSMOS_DIR)/content/faq/*.json > $@

$(BUILD_DIR):
	mkdir $@
