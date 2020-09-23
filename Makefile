BUILD_DIR ?= $(PWD)/build
BUILD_PUBLIC_DIR = $(BUILD_DIR)/public
BUILD_COSMOS_DIR = $(BUILD_DIR)/cosmos

SUBPROJECTS = base@. landing@. admin@pc-orga rulebook@.
ifdef SUBPROJECT
BUILD_SUBPROJECTS = $(filter $(SUBPROJECT)@%,$(SUBPROJECTS))
else
BUILD_SUBPROJECTS = $(SUBPROJECTS)
endif

static: $(BUILD_SUBPROJECTS)

$(BUILD_SUBPROJECTS): $(BUILD_PUBLIC_DIR) $(BUILD_COSMOS_DIR)
	$(info build subproject '$(firstword $(subst @, ,$@))' -> $(BUILD_PUBLIC_DIR)/$(lastword $(subst @, ,$@)))
	@make -C $(firstword $(subst @, ,$@)) static BUILD_DIR=$(BUILD_PUBLIC_DIR)/$(lastword $(subst @, ,$@)) COSMOS_DIR=$(BUILD_COSMOS_DIR)

$(BUILD_PUBLIC_DIR):
	mkdir -p $@

dev: $(BUILD_SUBPROJECTS)
ifndef SUBPROJECT
	http-server -p 8080 $(BUILD_PUBLIC_DIR)
else
	http-server -p 8080 $(BUILD_PUBLIC_DIR)/$(lastword $(subst @, ,$<))
endif

$(BUILD_DIR)/cosmos: $(BUILD_DIR)
ifeq ($(INCOMING_HOOK_BODY),update-type=content)
	wget -O $(BUILD_DIR)/master.zip https://github.com/ebenaum/cosmos/archive/master.zip
	unzip -a $(BUILD_DIR)/master.zip -d $@
else
	cp -R cosmos $@
endif

$(BUILD_DIR):
	mkdir $@

clean:
	rm -rf build
