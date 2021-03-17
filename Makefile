BUILD_DIR ?= $(PWD)/build
BUILD_PUBLIC_DIR = $(BUILD_DIR)/public
BUILD_PUBLIC_IMG_DIR = $(BUILD_DIR)/public/img
BUILD_COSMOS_DIR = $(PWD)/cosmos

SRC_IMAGES=$(wildcard $(BUILD_COSMOS_DIR)/uploads/*[.jpg|.png])
BUILD_IMAGES=$(foreach file,$(notdir $(SRC_IMAGES)),$(BUILD_PUBLIC_IMG_DIR)/$(file))

.PHONY: dev static clean

SUBPROJECTS = data@data base@. landing@. admin@pc-orga rulebook@. fonts@fonts nextjs@.
ifdef SUBPROJECT
BUILD_SUBPROJECTS = data $(filter $(SUBPROJECT)@%,$(SUBPROJECTS))
else
BUILD_SUBPROJECTS = $(SUBPROJECTS)
endif

static: $(BUILD_SUBPROJECTS) $(BUILD_IMAGES)

$(BUILD_SUBPROJECTS): $(BUILD_PUBLIC_DIR) fetch-cosmos $(BUILD_COSMOS_DIR) scrib
	$(info build subproject '$(firstword $(subst @, ,$@))' -> $(BUILD_PUBLIC_DIR)/$(lastword $(subst @, ,$@)))
	@make -C $(firstword $(subst @, ,$@)) static BUILD_DIR=$(BUILD_PUBLIC_DIR)/$(lastword $(subst @, ,$@)) COSMOS_DIR=$(BUILD_COSMOS_DIR) SCRIB=$(PWD)/scrib DATA_DIR=$(BUILD_PUBLIC_DIR)/data

dev: $(BUILD_SUBPROJECTS) $(BUILD_IMAGES)
ifndef SUBPROJECT
	http-server -p 8080 $(BUILD_PUBLIC_DIR)
else
	http-server -p 8080 $(BUILD_PUBLIC_DIR)/$(lastword $(subst @, ,$<))
endif

.PHONY: fetch-cosmos

fetch-cosmos:
ifeq ($(INCOMING_HOOK_BODY),update-type=content)
	rm -rf cosmos/*
	wget -O $(BUILD_DIR)/master.zip https://github.com/ebenaum/cosmos/archive/master.zip
	unzip -a $(BUILD_DIR)/master.zip 'cosmos-master/*' -d cosmos
	cp -R cosmos/cosmos-master/* cosmos/
	rm -rf cosmos/cosmos-master
endif

$(BUILD_PUBLIC_IMG_DIR)/%: $(BUILD_COSMOS_DIR)/uploads/% $(BUILD_PUBLIC_IMG_DIR)
	cp $< $@

$(BUILD_DIR):
	mkdir $@

$(BUILD_PUBLIC_DIR):
	mkdir -p $@

$(BUILD_PUBLIC_IMG_DIR):
	mkdir -p $@

scrib: templater/main.go
	go build -o scrib ./templater

clean:
	rm -rf build
