# Использование Makefile вместо debian/install

[← Вернуться к основному руководству](../README.md)

Файл `debian/install` умеет только копировать файлы. Если при сборке\
нужно делать что-то сложнее - например, кросс-компиляцию или генерацию\
файлов - вместо него можно использовать `Makefile`.

Чтобы заменить `debian/install` на `Makefile`, выполните следующие шаги:

1. Удалите файл `debian/install`, иначе файлы будут установлены дважды.

2. **Определитесь с путем установки файлов на контроллере** - именно он\
   будет записан в переменную `RULES_DEST` на следующем шаге. Важно\
   хорошо понимать, куда и почему должны попасть ваши файлы - о разнице\
   между `/usr/share/wb-rules-system/rules` и `/etc/wb-rules` см. раздел\
   [Пути установки файлов](../README.md#пути-установки-файлов).\
   Если сомневаетесь - проконсультируйтесь с коллегами.

3. Создайте в корне проекта файл `Makefile` со следующим содержимым:

   ```makefile
   # @file This Makefile installs virtual devices for Wiren Board
   #       controllers into the system, convenient for testing

   # DESTDIR is specified externally if needed, default is empty
   DESTDIR ?=
   PREFIX ?= /usr

   # Source JS files for installation
   JS_FILES := $(wildcard src/*.js)

   # Use the path for system scripts - hidden on "rules" WEBUI page:
   #   - /usr/share/wb-rules-system/rules
   # You can also use the path for user scripts - shown on "rules" WEBUI
   # page, but suitable only for editable examples:
   #   - /etc/wb-rules
   RULES_DEST := $(DESTDIR)$(PREFIX)/share/wb-rules-system/rules

   .PHONY: all install

   # Set default target when run pure "$ make" command without parameter
   all: install

   install:
   	@echo "Starting installation process..."
   	@echo "  - Installing JS files to '$(RULES_DEST)' directory"
   	@install -Dm644 $(JS_FILES) -t $(RULES_DEST)
   ```

   Во время сборки `debhelper` сам вызовет цель `install`, передав в\
   `DESTDIR` временную директорию упаковки пакета.

4. Добавьте в файл `.gitattributes` строку для `Makefile`, чтобы он\
   гарантированно попал в репозиторий с окончаниями строк LF - с CRLF\
   `make` на контроллере не сможет его обработать:

   ```gitattributes
   Makefile text eol=lf
   ```

5. В файл `debian/rules` добавьте явное указание системы сборки,\
   чтобы `debhelper` не пытался определить ее автоматически:

   ```makefile
   # Force the makefile build system instead of auto-detection
   override_dh_auto_configure:
   	dh_auto_configure --buildsystem=makefile
   ```

6. Установите `make`, если он еще не установлен - его запустит\
   `debhelper` при сборке:

   ```terminal
   $ sudo apt install make
   ```
