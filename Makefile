# @file This Makefile installs virtual devices for WirenBoard
#       controllers into the system, convenient for testing

# DESTDIR is specified externally if needed, default is empty
DESTDIR ?= /
PREFIX ?= /etc

# Source JS files for installation
JS_FILES := $(wildcard src/*.js)

# Use the system path to user scripts - shown on "rule" WEBUI page:
#   - /etc/wb-rules/*
# You can also use the path for system scripts - hided on "rule" WEBUI page:
#   - /usr/share/wb-rules-system/rules
RULES_DEST := $(DESTDIR)$(PREFIX)/wb-rules

.PHONY: all install

# Set default target when run pure "$ make" command without parameter
all: install

install:
	@echo "Starting installation process..."
	@echo "  - Installing JS files to '$(RULES_DEST)' directory"
	@install -Dm644 $(JS_FILES) -t $(RULES_DEST);
