BUILD_DIR ?= build

BUILD_FILES = $(addprefix $(BUILD_DIR)/, index.html landing.css erenthyrm-2022.html erenthyrm-2024.html precedents-gns.html inscription.html faq.html lvdm.html regles.html)

TMPL_DEP = logo.tmpl footer.tmpl lvdm-twstory.tmpl

static: $(BUILD_DIR) $(BUILD_FILES)

$(BUILD_DIR):
	mkdir $@

get_template_data = $(shell cat $1 | head -n 1 | tr -d '<!> ' | cut -c 12- | rev | cut -c 3- | rev | head -n 1)
get_tmpl = $(shell ls *.tmpl)

$(BUILD_DIR)/%.html: %.tmpl $(TMPL_DEP)
	$(SCRIB) $< $(DATA_DIR)/$(call get_template_data,$<).json $(call get_tmpl) > $@

$(BUILD_DIR)/%: %
	cp $< $@
